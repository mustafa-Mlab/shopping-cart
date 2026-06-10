import React, { useState } from 'react';
import './Header.scss';

function Header({ cart, user, navigate, searchProducts, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleDropdownNav = (route) => {
    setDropdownOpen(false);
    navigate(route);
  };

  const handleSignOut = () => {
    setDropdownOpen(false);
    onLogout();
    navigate('home');
  };

  return (
    <header className="site-header glass-effect">
      <div className="container header-container">
        <div className="logo-section" onClick={() => navigate('home')}>
          <img src="/sc-logo.jpg" alt="Logo" className="logo-img" width="44" height="44" />
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

          <div className="actions-section">
            {user ? (
              <div className="user-dropdown-container">
                <div className="user-nav" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <svg className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="user-name">{user.name}</span>
                  <svg className={`caret-icon ${dropdownOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                {dropdownOpen && (
                  <>
                    <div className="dropdown-backdrop" onClick={() => setDropdownOpen(false)}></div>
                    <ul className="user-dropdown-menu glass-effect">
                      <li onClick={() => handleDropdownNav('account')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="menu-svg-icon">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        My Profile
                      </li>
                      <li onClick={() => handleDropdownNav('orders')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="menu-svg-icon">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        My Orders
                      </li>
                      <li onClick={() => handleDropdownNav('reviews')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="menu-svg-icon">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        Your Ratings
                      </li>
                      <li onClick={() => handleDropdownNav('track')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="menu-svg-icon">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        Track Order
                      </li>
                      <li className="menu-divider"></li>
                      <li className="logout-item" onClick={handleSignOut}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="menu-svg-icon">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Sign Out
                      </li>
                    </ul>
                  </>
                )}
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
