import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts } from '../data/mockData';
import ApiService from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [categories, setCategories] = useState([]);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    // Try to load from API first, fallback to mock data
    const loadProducts = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          ApiService.getProducts(),
          ApiService.getCategories()
        ]);
        
        // Transform API data to match frontend format
        const transformedProducts = (productsData.results || productsData).map(product => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: parseFloat(product.price),
          originalPrice: product.original_price ? parseFloat(product.original_price) : null,
          category: product.category_name,
          image: product.primary_image || product.image,
          description: product.description,
          inStock: product.is_in_stock,
          featured: product.is_featured,
          rating: parseFloat(product.rating || 0),
          reviewCount: product.reviews_count || 0,
          brand: product.brand,
          onSale: product.is_on_sale,
          discount: product.discount_percentage
        }));
        
        setProducts(transformedProducts);
        setCategories(categoriesData.results || categoriesData);
        setApiConnected(true);
      } catch (error) {
        console.warn('API connection failed, using mock data:', error);
        setProducts(mockProducts);
        setApiConnected(false);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  const getProductById = async (id) => {
    // First try local products
    const localProduct = products.find(product => product.id === parseInt(id));
    if (localProduct) return localProduct;
    
    // If API is connected, try fetching from API
    if (apiConnected) {
      try {
        const apiProduct = await ApiService.getProduct(id);
        return {
          id: apiProduct.id,
          name: apiProduct.name,
          slug: apiProduct.slug,
          price: parseFloat(apiProduct.price),
          originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : null,
          category: apiProduct.category_name,
          image: apiProduct.image,
          images: apiProduct.images?.map(img => img.image) || [apiProduct.image],
          description: apiProduct.description,
          specifications: apiProduct.attributes?.reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {}) || {},
          inStock: apiProduct.is_in_stock,
          featured: apiProduct.is_featured,
          rating: parseFloat(apiProduct.rating || 0),
          reviewCount: apiProduct.reviews_count || 0,
          brand: apiProduct.brand
        };
      } catch (error) {
        console.error('Failed to fetch product from API:', error);
      }
    }
    
    return null;
  };

  const getProductBySlug = async (slug) => {
    // First try local products
    const localProduct = products.find(product => product.slug === slug);
    if (localProduct) return localProduct;
    
    // If API is connected, try fetching from API
    if (apiConnected) {
      try {
        const apiProduct = await ApiService.getProduct(slug);
        return {
          id: apiProduct.id,
          name: apiProduct.name,
          slug: apiProduct.slug,
          price: parseFloat(apiProduct.price),
          originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : null,
          category: apiProduct.category_name,
          image: apiProduct.image,
          images: apiProduct.images?.map(img => img.image) || [apiProduct.image],
          description: apiProduct.description,
          specifications: apiProduct.attributes?.reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {}) || {},
          inStock: apiProduct.is_in_stock,
          featured: apiProduct.is_featured,
          rating: parseFloat(apiProduct.rating || 0),
          reviewCount: apiProduct.reviews_count || 0,
          brand: apiProduct.brand
        };
      } catch (error) {
        console.error('Failed to fetch product from API:', error);
      }
    }
    
    return null;
  };

  const getCategories = () => {
    if (apiConnected && categories.length > 0) {
      return categories.map(cat => cat.name);
    }
    return [...new Set(products.map(product => product.category))];
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured).slice(0, 6);
  };

  const value = {
    products,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    getFilteredProducts,
    getProductById,
    getProductBySlug,
    getCategories,
    getFeaturedProducts,
    apiConnected
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
