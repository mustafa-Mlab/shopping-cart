import React, { useState } from 'react';
import './Checkout.scss';

function Checkout({ cart, user, onPlaceOrder, navigate }) {
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + (item.sell_price || item.product.sell_price) * item.quantity, 0);
  const shipping = subtotal > 1500 ? 0 : 15;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) tempErrors.address = 'Shipping Address is required';
    if (!formData.city.trim()) tempErrors.city = 'City is required';
    if (!formData.zip.trim()) tempErrors.zip = 'Postal/Zip Code is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) tempErrors.cardNumber = 'Card Number is required';
      if (!formData.cardExpiry.trim()) tempErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvc.trim()) tempErrors.cardCvc = 'CVC is required';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Place the order
    const orderDetails = {
      items: cart,
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      },
      paymentMethod: formData.paymentMethod,
      totals: { subtotal, shipping, tax, total },
    };

    onPlaceOrder(orderDetails);
  };

  return (
    <div className="checkout-page container">
      <h1 className="section-title">Checkout</h1>

      <div className="checkout-layout">
        {/* Left: Checkout Form */}
        <form className="checkout-form-section glass-effect" onSubmit={handleSubmit}>
          <h3 className="form-section-title">Shipping Details</h3>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="zip">Zip / Postal Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                className="form-control"
                value={formData.zip}
                onChange={handleInputChange}
              />
              {errors.zip && <span className="field-error">{errors.zip}</span>}
            </div>
          </div>

          <div className="info-divider"></div>

          <h3 className="form-section-title">Payment Method</h3>
          <div className="payment-options">
            <label className={`payment-option-card ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleInputChange}
              />
              <span className="option-title">Cash on Delivery</span>
              <span className="option-desc">Pay with cash upon package arrival.</span>
            </label>

            <label className={`payment-option-card ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleInputChange}
              />
              <span className="option-title">Credit Card</span>
              <span className="option-desc">Pay instantly with Visa or Mastercard.</span>
            </label>
          </div>

          {formData.paymentMethod === 'card' && (
            <div className="card-fields-container">
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  className="form-control"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                />
                {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="cardExpiry">Expiration Date</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    className="form-control"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                  />
                  {errors.cardExpiry && <span className="field-error">{errors.cardExpiry}</span>}
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="cardCvc">CVC Code</label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    placeholder="123"
                    className="form-control"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                  />
                  {errors.cardCvc && <span className="field-error">{errors.cardCvc}</span>}
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="btn-place-order btn-primary">
            Place Order (${total})
          </button>
        </form>

        {/* Right: Order Summary */}
        <aside className="checkout-summary-section glass-effect">
          <h3>Items in Order</h3>
          
          <div className="checkout-items-list">
            {cart.map((item, index) => (
              <div key={index} className="checkout-item-row">
                <div className="item-name-qty">
                  <span className="item-title">{item.product.title}</span>
                  <span className="item-specs">
                    {item.selectedSize.toUpperCase()} | {item.selectedColor} (x{item.quantity})
                  </span>
                </div>
                <span className="item-price">${(item.sell_price || item.product.sell_price) * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
          </div>

          <div className="summary-row">
            <span>Tax (5%)</span>
            <span>${tax}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Total to Pay</span>
            <span>${total}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
