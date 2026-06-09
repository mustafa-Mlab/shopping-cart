import React, { useState } from 'react';
import './CartComponent.scss';

function CartComponent({ cart, onUpdateCartQty, onRemoveFromCart, navigate }) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.sell_price || item.product.sell_price) * item.quantity, 0);
  
  // Shipping rule: Free shipping on orders over $1500, otherwise $15
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 15;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal + shipping + tax - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscountPercent(10);
      setPromoSuccess('Promo code SAVE10 applied! 10% discount.');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "SAVE10".');
      setPromoSuccess('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page container text-center empty-cart">
        <div className="empty-cart-card glass-effect">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-cart-icon">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your shopping cart is empty</h2>
          <p>Browse our collection to add items to your cart.</p>
          <button className="btn-primary" onClick={() => navigate('home')}>
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="section-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        {/* Left Side: Items List */}
        <div className="cart-items-section glass-effect">
          {cart.map((item, idx) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`} className="cart-item">
              <div className="cart-item-image">
                <div className="thumbnail-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="thumb-icon">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  </svg>
                </div>
              </div>

              <div className="cart-item-details">
                <h3 onClick={() => navigate(`product/${item.product.id}`)}>{item.product.title}</h3>
                <span className="item-category">{(item.product.subcategory || item.product.main_category).toUpperCase()}</span>
                
                <div className="item-specifications">
                  <span className="spec-badge">Size: {item.selectedSize.toUpperCase()}</span>
                  <span className="spec-badge">Color: {item.selectedColor}</span>
                </div>
              </div>

              <div className="cart-item-qty-price">
                <div className="cart-qty-selector">
                  <button onClick={() => onUpdateCartQty(idx, item.quantity - 1)}>-</button>
                  <span className="qty-val">{item.quantity}</span>
                  <button onClick={() => onUpdateCartQty(idx, item.quantity + 1)}>+</button>
                </div>
                
                <div className="price-info">
                  <span className="total-price">${(item.sell_price || item.product.sell_price) * item.quantity}</span>
                  <span className="unit-price">${item.sell_price || item.product.sell_price} each</span>
                </div>

                <button className="btn-remove-item" onClick={() => onRemoveFromCart(idx)} title="Remove item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <aside className="cart-summary-section glass-effect">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax (5%)</span>
            <span>${tax}</span>
          </div>

          {discountPercent > 0 && (
            <div className="summary-row discount-row">
              <span>Promo Discount ({discountPercent}%)</span>
              <span>-${discountAmount}</span>
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Order Total</span>
            <span>${total}</span>
          </div>

          {/* Promo form */}
          <form className="promo-form" onSubmit={handleApplyPromo}>
            <input
              type="text"
              placeholder="Promo code (e.g. SAVE10)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="promo-input"
            />
            <button type="submit" className="btn-promo btn-secondary">Apply</button>
          </form>
          {promoError && <p className="promo-error">{promoError}</p>}
          {promoSuccess && <p className="promo-success">{promoSuccess}</p>}

          <button className="btn-checkout btn-primary" onClick={() => navigate('checkout')}>
            Proceed to Checkout
          </button>

          <button className="btn-continue btn-secondary" onClick={() => navigate('home')}>
            Continue Shopping
          </button>
        </aside>
      </div>
    </div>
  );
}

export default CartComponent;