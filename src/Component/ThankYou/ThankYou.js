import React from 'react';
import './ThankYou.scss';

function ThankYou({ orderId, orders, navigate }) {
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="thank-you-page container text-center">
        <h2>Order not found</h2>
        <button className="btn-primary" onClick={() => navigate('home')}>
          Back to Shop
        </button>
      </div>
    );
  }

  // Generate estimated delivery date (7 days from now)
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 7);
  const formattedEstDate = estDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="thank-you-page container">
      <div className="thank-you-card glass-effect">
        <div className="success-icon-container">
          <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-msg">Thank you for your purchase. We are preparing your order for shipment.</p>
        
        <div className="order-number-badge">
          Order ID: <span>{order.id}</span>
        </div>

        <div className="details-container">
          <div className="detail-item">
            <span className="label">Estimated Delivery</span>
            <span className="value">{formattedEstDate}</span>
          </div>
          <div className="detail-item">
            <span className="label">Shipping To</span>
            <span className="value">{order.shippingAddress.name}</span>
          </div>
          <div className="detail-item">
            <span className="label">Payment Method</span>
            <span className="value">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Total Amount</span>
            <span className="value price">${Number(order.totals.total).toFixed(2)}</span>
          </div>
        </div>

        <div className="thank-you-actions">
          <button className="btn-track-order btn-primary" onClick={() => navigate(`track/${order.id}`)}>
            Track Your Order
          </button>
          
          <button className="btn-home btn-secondary" onClick={() => navigate('home')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
