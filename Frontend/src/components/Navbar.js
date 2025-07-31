import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import '../styles/Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { searchTerm, setSearchTerm } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemsCount = getCartItemsCount();

  const isActive = (path) => location.pathname === path;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/products') {
      navigate('/products');
    }
    setIsSearchOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">ModernShop</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>
        </div>

        {/* Search Bar */}
        <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
        </div>

        {/* Right Side Icons */}
        <div className="nav-icons">
          <button 
            className="search-toggle"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            🔍
          </button>
          
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link 
          to="/" 
          className={`mobile-link ${isActive('/') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/products" 
          className={`mobile-link ${isActive('/products') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Products
        </Link>
        <Link 
          to="/about" 
          className={`mobile-link ${isActive('/about') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className={`mobile-link ${isActive('/contact') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
