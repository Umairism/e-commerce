import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Products.css';

function Products() {
  const {
    loading,
    searchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    getFilteredProducts,
    getCategories
  } = useProducts();

  const [viewMode, setViewMode] = useState('grid');
  const filteredProducts = getFilteredProducts();
  const categories = getCategories();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>Our Products</h1>
          <p>Discover our amazing collection of high-quality products</p>
          
          {searchTerm && (
            <div className="search-results">
              <p>Showing results for: <strong>"{searchTerm}"</strong></p>
              <span className="results-count">({filteredProducts.length} products found)</span>
            </div>
          )}
        </div>

        <div className="products-controls">
          <div className="filters">
            {/* Category Filter */}
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="filter-group">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating (Highest)</option>
              </select>
            </div>
          </div>

          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              ⊞
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              ≡
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-content">
              <span className="no-products-icon">📦</span>
              <h3>No Products Found</h3>
              <p>We couldn't find any products matching your search criteria.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  // Reset search if needed
                }}
                className="btn btn-primary"
              >
                Show All Products
              </button>
            </div>
          </div>
        ) : (
          <div className={`products-grid ${viewMode}`}>
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        <div className="results-info">
          <p>Showing {filteredProducts.length} of {filteredProducts.length} products</p>
        </div>
      </div>
    </div>
  );
}

export default Products;
