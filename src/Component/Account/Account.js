import React from 'react';
import './Account.scss';

function Account({ user, orders, onLogout, navigate }) {
  if (!user) {
    return (
      <div className="container not-logged-in-container text-center">
        <h2>You are not signed in</h2>
        <p>Please sign in to view your account details.</p>
        <button className="btn-primary" onClick={() => navigate('login')}>
          Sign In
        </button>
      </div>
    );
  }

  // Filter orders placed by this specific user email
  const userOrders = orders.filter((o) => o.shippingAddress.email === user.email);

  return (
    <div className="account-page container">
      <h1 className="section-title">My Account</h1>

      <div className="account-layout">
        {/* Left column: Profile card */}
        <aside className="profile-sidebar glass-effect">
          <div className="avatar-container">
            <div className="avatar-initials">
              {user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
          </div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          
          <div className="profile-divider"></div>

          <div className="profile-details">
            <div className="detail-row">
              <span className="label">Account Status</span>
              <span className="value active">Verified</span>
            </div>
            <div className="detail-row">
              <span className="label">Orders Placed</span>
              <span className="value">{userOrders.length}</span>
            </div>
          </div>

          <button className="btn-logout btn-secondary" onClick={() => { onLogout(); navigate('home'); }}>
            Log Out
          </button>
        </aside>

        {/* Right column: Order List History */}
        <main className="orders-history-section glass-effect">
          <h3>Order History</h3>

          {userOrders.length === 0 ? (
            <div className="no-orders text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="no-orders-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <h4>No orders found</h4>
              <p>You haven't placed any orders yet.</p>
              <button className="btn-secondary" onClick={() => navigate('home')}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map((order) => {
                    const statusColors = {
                      ordered: 'status-ordered',
                      processing: 'status-processing',
                      shipped: 'status-shipped',
                      delivered: 'status-delivered',
                    };

                    return (
                      <tr key={order.id}>
                        <td className="order-id-cell">{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.paymentMethod === 'cod' ? 'COD' : 'Card'}</td>
                        <td className="order-total-cell">${Number(order.totals.total).toFixed(2)}</td>
                        <td>
                          <span className={`status-badge ${statusColors[order.status || 'ordered']}`}>
                            {(order.status || 'ordered').toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-track btn-secondary"
                            onClick={() => navigate(`track/${order.id}`)}
                          >
                            Track
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Account;
