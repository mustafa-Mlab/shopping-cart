import React from 'react';
import './Header.scss';

function Header({ cart, user, currentRoute, navigate, searchProducts }) {
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="site-header glass-effect">
      <div className="container header-container">
        <div className="logo-section" onClick={() => navigate('home')}>
          <img src="/sc-logo.jpg" alt="Logo" className="logo-img" />
          <span className="logo-text">MegaShop</span>
        </div>

        <div className="search-section">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            onChange={(e) => searchProducts(e.target.value)}
          />
        </div>

        <nav className="nav-section">
          <ul className="nav-links">
            {user && (
              <li className={currentRoute === 'orders' ? 'active' : ''}>
                <a href="#/orders" onClick={(e) => { e.preventDefault(); navigate('orders'); }}>Orders</a>
              </li>
            )}
          </ul>

          <div className="actions-section">
            {user ? (
              <div className="user-nav" onClick={() => navigate('account')}>
                <svg className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="user-name">{user.name}</span>
              </div>
            ) : (
              <button className="btn-login" onClick={() => navigate('login')}>
                Sign In
              </button>
            )}

            <div className="cart-badge-container" onClick={() => navigate('cart')}>
              <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
