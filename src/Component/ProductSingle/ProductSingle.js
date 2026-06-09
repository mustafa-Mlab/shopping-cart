import React, { useState } from 'react';
import './ProductSingle.scss';

function ProductSingle({ productId, products, onAddToCart, navigate }) {
  const product = products.find((p) => p.id === parseInt(productId));
  
  const [selectedSize, setSelectedSize] = useState(
    product ? product.available_sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState(
    product ? Object.keys(product.color)[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="container not-found-container text-center">
        <h2>Product not found</h2>
        <button className="btn-primary" onClick={() => navigate('home')}>
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const discountPercent = Math.round(((product.price - product.sell_price) / product.price) * 100);

  return (
    <div className="product-single-page container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <span onClick={() => navigate('home')}>Shop</span>
        <span className="separator">/</span>
        <span className="category-link" onClick={() => navigate('home')}>{product.category}</span>
        <span className="separator">/</span>
        <span className="active">{product.title}</span>
      </nav>

      <div className="product-details-grid">
        {/* Left Side: Image Placeholder */}
        <div className="product-media glass-effect">
          <div className="main-image-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="media-icon">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            <span className="media-label">{product.title}</span>
            <span className="media-src-placeholder">Image Source: #</span>
          </div>
        </div>

        {/* Right Side: Details Info */}
        <div className="product-info-panel glass-effect">
          <span className="info-category">{product.category.toUpperCase()}</span>
          <h1 className="info-title">{product.title}</h1>
          
          <div className="info-rating-row">
            <div className="stars">{"★".repeat(4)}{"☆".repeat(1)}</div>
            <span className="rating-text">4.0 rating (12 verified reviews)</span>
          </div>

          <div className="info-price-section">
            <span className="sell-price">${product.sell_price}</span>
            {product.price > product.sell_price && (
              <>
                <span className="regular-price">${product.price}</span>
                <span className="discount-tag">{discountPercent}% OFF</span>
              </>
            )}
          </div>

          <p className="info-short-desc">{product.description}</p>

          <div className="info-divider"></div>

          {/* Size Selectors */}
          {product.available_sizes && product.available_sizes.length > 0 && (
            <div className="option-group">
              <span className="option-label">Select Size</span>
              <div className="size-selector-row">
                {product.available_sizes.map((sz) => (
                  <button
                    key={sz}
                    className={`size-pill ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selectors */}
          {product.color && Object.keys(product.color).length > 0 && (
            <div className="option-group">
              <span className="option-label">Select Color</span>
              <div className="color-selector-row">
                {Object.keys(product.color).map((col) => (
                  <button
                    key={col}
                    className={`color-dot ${selectedColor === col ? 'active' : ''}`}
                    style={{ backgroundColor: col.includes('-') ? '#3b82f6' : col }}
                    title={col}
                    onClick={() => setSelectedColor(col)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="actions-group-row">
            <div className="qty-selector">
              <button className="qty-btn" onClick={decreaseQty}>-</button>
              <span className="qty-val">{quantity}</span>
              <button className="qty-btn" onClick={increaseQty}>+</button>
            </div>
            
            <button className="btn-add-cart btn-primary" onClick={handleAddToCart}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cart-svg">
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Cart
            </button>
          </div>

          <div className="info-meta">
            <div><span>SKU:</span> {product.sku}</div>
            <div><span>Availability:</span> {product.in_stock ? 'In Stock (Ready to Ship)' : 'Out of Stock'}</div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs glass-effect">
        <div className="tab-headers">
          <button
            className={`tab-header-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-header-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews (12)
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' ? (
            <div className="tab-desc">
              <p>{product.description}</p>
              <br />
              <p>Designed with meticulous attention to detail and high-grade stitching. Engineered for daily wear, combining maximum breathability with modern urban aesthetics. Features reinforced seams and comfort-stretch attributes.</p>
            </div>
          ) : (
            <div className="tab-reviews">
              <div className="review-item">
                <div className="review-meta">
                  <span className="reviewer-name">Mustafa Kamal</span>
                  <span className="review-stars">★★★★★</span>
                </div>
                <p className="review-body">Absolutely beautiful quality. Fits perfectly and very comfortable to wear. I highly recommend this product to everyone!</p>
              </div>
              <div className="review-item">
                <div className="review-meta">
                  <span className="reviewer-name">Alex M.</span>
                  <span className="review-stars">★★★★☆</span>
                </div>
                <p className="review-body">Good fit and nice quality. Will definitely purchase again. The fabric feels very soft and premium.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductSingle;
