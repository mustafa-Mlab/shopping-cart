import React, { useState } from 'react';
import './ProductList.scss';

function ProductList({ products, searchQuery, onAddToCart, navigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(3000); // Max price in products.json is 3000

  // Categories extraction
  const categories = ['all', 'jeans', 't-shirts', 'traditional'];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.sell_price <= priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="product-list-page container">
      <div className="shop-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar glass-effect">
          <h3 className="filter-title">Filters</h3>
          
          <div className="filter-group">
            <h4>Category</h4>
            <ul className="category-list">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h4>Max Price</h4>
            <div className="price-slider-container">
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="price-slider"
              />
              <div className="price-values">
                <span>$50</span>
                <span className="current-price">${priceRange}</span>
                <span>$3000</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="products-container">
          <div className="results-header">
            <h2>Showing {filteredProducts.length} products</h2>
            {searchQuery && <p className="search-term">Search results for "{searchQuery}"</p>}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products glass-effect">
              <h3>No products found</h3>
              <p>Try clearing your filters or search terms.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const discountPercent = Math.round(((product.price - product.sell_price) / product.price) * 100);

                return (
                  <div key={product.id} className="product-card glass-effect hover-lift">
                    <div className="product-card-image" onClick={() => navigate(`product/${product.id}`)}>
                      {/* Placeholder Image container since user requested no images */}
                      <div className="image-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="placeholder-icon">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        <span className="placeholder-label">{product.title}</span>
                      </div>
                      
                      {discountPercent > 0 && (
                        <span className="badge-discount">-{discountPercent}%</span>
                      )}
                    </div>

                    <div className="product-card-content">
                      <span className="product-category">{product.category.toUpperCase()}</span>
                      <h3 className="product-title" onClick={() => navigate(`product/${product.id}`)}>
                        {product.title}
                      </h3>
                      
                      <div className="product-rating">
                        {"★".repeat(4)}{"☆".repeat(1)} 
                        <span className="rating-count">(12)</span>
                      </div>

                      <div className="product-price-row">
                        <div className="prices">
                          <span className="sell-price">${product.sell_price}</span>
                          {product.price > product.sell_price && (
                            <span className="regular-price">${product.price}</span>
                          )}
                        </div>
                      </div>

                      <div className="product-card-actions">
                        <button
                          className="btn-details btn-secondary"
                          onClick={() => navigate(`product/${product.id}`)}
                        >
                          Details
                        </button>
                        <button
                          className="btn-add-to-cart btn-primary"
                          onClick={() => onAddToCart(product, 1, product.available_sizes[0], Object.keys(product.color)[0])}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductList;
