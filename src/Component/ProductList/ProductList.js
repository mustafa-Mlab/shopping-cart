import React, { useState } from 'react';
import './ProductList.scss';

function ProductList({ products, searchQuery, selectedCategory, onAddToCart, navigate }) {
  // Filters state (Main Category is now driven by url routing prop)
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState(3000);

  const selectedMainCat = selectedCategory || 'all';

  // Main Categories List
  const mainCategories = ['all', 'man', 'women', 'children', 'infant', 'others'];

  // Extract subcategories dynamically based on the active main category
  const subcategories = Array.from(
    new Set(
      products
        .filter((p) => selectedMainCat === 'all' || p.main_category === selectedMainCat)
        .map((p) => p.subcategory)
    )
  );

  // Extract unique brands, colors, tags dynamically from all products for complete filters
  const allBrands = Array.from(new Set(products.map((p) => p.brand)));
  const allColors = Array.from(new Set(products.flatMap((p) => Object.keys(p.color))));
  const allSizes = Array.from(new Set(products.flatMap((p) => p.available_sizes || [])));
  const allTags = Array.from(new Set(products.flatMap((p) => p.tags || [])));

  // Toggle Selection Helper functions
  const toggleFilter = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleClearFilters = () => {
    setSelectedSubs([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedTags([]);
    setPriceRange(3000);
  };

  // Filtration logic
  const filteredProducts = products.filter((product) => {
    // 1. Search Query
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Main Category (URL driven)
    const matchesMainCat = selectedMainCat === 'all' || product.main_category === selectedMainCat;

    // 3. Subcategories
    const matchesSub = selectedSubs.length === 0 || selectedSubs.includes(product.subcategory);

    // 4. Brands
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    // 5. Sizes
    const matchesSize =
      selectedSizes.length === 0 ||
      (product.available_sizes && product.available_sizes.some((sz) => selectedSizes.includes(sz)));

    // 6. Colors
    const matchesColor =
      selectedColors.length === 0 ||
      (product.color && Object.keys(product.color).some((col) => selectedColors.includes(col)));

    // 7. Tags
    const matchesTag =
      selectedTags.length === 0 ||
      (product.tags && product.tags.some((tag) => selectedTags.includes(tag)));

    // 8. Price
    const matchesPrice = product.sell_price <= priceRange;

    return (
      matchesSearch &&
      matchesMainCat &&
      matchesSub &&
      matchesBrand &&
      matchesSize &&
      matchesColor &&
      matchesTag &&
      matchesPrice
    );
  });

  return (
    <div className="product-list-page container">
      {/* Top Main Category Tabs */}
      <nav className="main-cat-nav glass-effect">
        {mainCategories.map((cat) => (
          <button
            key={cat}
            className={`main-cat-btn ${selectedMainCat === cat ? 'active' : ''}`}
            onClick={() => {
              // Reset subcategory selections on main category redirect
              setSelectedSubs([]);
              if (cat === 'all') {
                navigate('home');
              } else {
                navigate('category/' + cat);
              }
            }}
          >
            {cat === 'all' ? 'All Collection' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </nav>

      <div className="shop-layout">
        {/* Advanced Filters Sidebar */}
        <aside className="filters-sidebar glass-effect">
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="btn-clear-filters" onClick={handleClearFilters}>
              Clear All
            </button>
          </div>

          <div className="filter-divider"></div>

          {/* Subcategories checklist */}
          {subcategories.length > 0 && (
            <div className="filter-group">
              <h4>Subcategories</h4>
              <div className="checkbox-list">
                {subcategories.map((sub) => (
                  <label key={sub} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSubs.includes(sub)}
                      onChange={() => toggleFilter(selectedSubs, setSelectedSubs, sub)}
                    />
                    <span>{sub.charAt(0).toUpperCase() + sub.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Brand Checklist */}
          <div className="filter-group">
            <h4>Brands</h4>
            <div className="checkbox-list">
              {allBrands.map((brand) => (
                <label key={brand} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter Pills */}
          <div className="filter-group">
            <h4>Sizes</h4>
            <div className="size-filter-row">
              {allSizes.map((sz) => (
                <button
                  key={sz}
                  className={`size-filter-btn ${selectedSizes.includes(sz) ? 'active' : ''}`}
                  onClick={() => toggleFilter(selectedSizes, setSelectedSizes, sz)}
                >
                  {sz.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Color Circle Filters */}
          <div className="filter-group">
            <h4>Colors</h4>
            <div className="color-filter-row">
              {allColors.map((col) => (
                <button
                  key={col}
                  className={`color-filter-btn ${selectedColors.includes(col) ? 'active' : ''}`}
                  style={{ backgroundColor: col.includes('-') ? '#3b82f6' : col }}
                  title={col}
                  onClick={() => toggleFilter(selectedColors, setSelectedColors, col)}
                />
              ))}
            </div>
          </div>

          {/* Tag Pills */}
          <div className="filter-group">
            <h4>Tags</h4>
            <div className="tag-filter-row">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-filter-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleFilter(selectedTags, setSelectedTags, tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <h4>Max Price</h4>
            <div className="price-slider-container">
              <input
                type="range"
                min="40"
                max="3000"
                step="20"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="price-slider"
              />
              <div className="price-values">
                <span>$40</span>
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
              <p>Try clearing some filters or tags to find items.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const discountPercent = Math.round(
                  ((product.price - product.sell_price) / product.price) * 100
                );

                return (
                  <div key={product.id} className="product-card glass-effect hover-lift">
                    <div className="product-card-image" onClick={() => navigate(`product/${product.id}`)}>
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
                      <span className="product-category">{product.subcategory.toUpperCase()}</span>
                      <h3 className="product-title" onClick={() => navigate(`product/${product.id}`)}>
                        {product.title}
                      </h3>

                      <div className="product-rating">
                        {"★".repeat(4)}{"☆".repeat(1)}
                        <span className="rating-count">(15)</span>
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
                          onClick={() =>
                            onAddToCart(
                              product,
                              1,
                              product.available_sizes[0],
                              Object.keys(product.color)[0]
                            )
                          }
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
