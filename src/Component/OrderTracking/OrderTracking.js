import React, { useState } from 'react';
import './OrderTracking.scss';

function OrderTracking({ orderId, orders, onSimulateDelivery, navigate }) {
  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');

  const currentOrder = orders.find((o) => o.id === orderId);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const exists = orders.some((o) => o.id === searchId.trim());
    if (exists) {
      setSearchError('');
      navigate(`track/${searchId.trim()}`);
    } else {
      setSearchError('Order ID not found. Use ORD-XXXXXX format.');
    }
  };

  // Tracking steps configuration
  const steps = [
    { key: 'ordered', label: 'Ordered', desc: 'Order placed & confirmed' },
    { key: 'processing', label: 'Processing', desc: 'Preparing packages' },
    { key: 'shipped', label: 'Shipped', desc: 'In transit with courier' },
    { key: 'delivered', label: 'Delivered', desc: 'Package arrived at destination' },
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    const statusOrder = ['ordered', 'processing', 'shipped', 'delivered'];
    const currentIdx = statusOrder.indexOf(currentStatus || 'ordered');
    const stepIdx = statusOrder.indexOf(stepKey);

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'active';
    return 'pending';
  };

  return (
    <div className="tracking-page container">
      <h1 className="section-title">Track Order</h1>

      {/* Lookup Bar */}
      <div className="tracking-lookup-section glass-effect">
        <form className="lookup-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Order ID (e.g., ORD-123456)"
            className="lookup-input"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit" className="btn-lookup btn-primary">Track</button>
        </form>
        {searchError && <p className="lookup-error">{searchError}</p>}
      </div>

      {currentOrder ? (
        <div className="tracking-details-card glass-effect">
          <div className="tracking-header">
            <div>
              <h3>Order <span>{currentOrder.id}</span></h3>
              <p className="order-date">Placed on {currentOrder.date}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {currentOrder.status !== 'delivered' && (
                <button
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem', height: '32px' }}
                  onClick={() => onSimulateDelivery(currentOrder.id)}
                >
                  Deliver Now (Testing)
                </button>
              )}
              <div className="tracking-badge">
                Status: {(currentOrder.status || 'ordered').toUpperCase()}
              </div>
            </div>
          </div>

          <div className="tracking-divider"></div>

          {/* Visual Progress Steps */}
          <div className="progress-steps-container">
            {steps.map((step, idx) => {
              const status = getStepStatus(step.key, currentOrder.status);
              
              return (
                <div key={step.key} className={`step-item ${status}`}>
                  <div className="step-bullet-wrapper">
                    <div className="step-bullet">
                      {status === 'completed' ? (
                        <svg className="bullet-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        idx + 1
                      )}
                    </div>
                    {idx < steps.length - 1 && <div className="step-line"></div>}
                  </div>
                  <div className="step-content">
                    <h4 className="step-label">{step.label}</h4>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tracking-divider"></div>

          {/* Logistics Details */}
          <div className="logistics-grid">
            <div className="logistics-column">
              <h4>Shipping Destination</h4>
              <p className="address-name">{currentOrder.shippingAddress.name}</p>
              <p className="address-body">
                {currentOrder.shippingAddress.address}<br />
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.zip}
              </p>
            </div>

            <div className="logistics-column">
              <h4>Items in Shipment</h4>
              <div className="tracking-items-list">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="tracking-item-row">
                    <span>{item.product.title} (x{item.quantity})</span>
                    <span>${item.product.sell_price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tracking-empty-state glass-effect text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-state-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <h3>No Order Selected</h3>
          <p>Please enter a valid Order ID above to see real-time tracking updates.</p>
        </div>
      )}
    </div>
  );
}

export default OrderTracking;
