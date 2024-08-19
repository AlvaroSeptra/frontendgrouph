"use client"

import React, { useState } from 'react';
import { FiSearch, FiDollarSign } from 'react-icons/fi'; // Import ikon dolar

const ProductsPage: React.FC = () => {
  const defaultMinPrice = 0;
  const defaultMaxPrice = 120;
  const [minPrice, setMinPrice] = useState(defaultMinPrice);
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');

  // Daftar produk dengan lokasi
  const products = [
    { id: 1, name: 'Peterseli', price: 25.00, image: '/peterseli.png', category: 'Organic Vegetable', location: 'New York' },
    { id: 2, name: 'Organic Peas', price: 30.00, image: '/peas.png', category: 'Organic Vegetable', location: 'Los Angeles' },
    { id: 3, name: 'Pistachio Nuts', price: 40.00, image: '/pistachio.png', category: 'Nuts & Dried Foods', location: 'San Francisco' },
    { id: 4, name: 'Tomato', price: 15.00, image: '/tomato.png', category: 'Organic Vegetable', location: 'New York' },
    { id: 5, name: 'Apple', price: 30.00, image: '/apples.png', category: 'Fruits', location: 'Los Angeles' },
    { id: 6, name: 'Avocado', price: 25.00, image: '/avocado.png', category: 'Fruits', location: 'San Francisco' },
    { id: 7, name: 'Chicken Breast', price: 70.00, image: '/chicken.png', category: 'Meat', location: 'Chicago' },
    { id: 8, name: 'Beef Steak', price: 120.00, image: '/beef.png', category: 'Meat', location: 'Chicago' },
    { id: 9, name: 'Fresh Milk', price: 25.00, image: '/milks.png', category: 'Milk & Dairy', location: 'New York' },
    { id: 10, name: 'Jasmine Rice', price: 40.00, image: '/rice.png', category: 'Rice', location: 'San Francisco' },
  ];

  const categories = [
    { name: 'All Categories', count: products.length },
    { name: 'Organic Vegetable', count: 3 },
    { name: 'Fruits', count: 2 },
    { name: 'Meat', count: 2 },
    { name: 'Milk & Dairy', count: 1 },
    { name: 'Rice', count: 1 },
    { name: 'Nuts & Dried Foods', count: 1 }
  ];

  const filteredProducts = products.filter(product => {
    const isInPriceRange = product.price >= minPrice && product.price <= maxPrice;
    const isInCategory = selectedCategory ? product.category === selectedCategory : true;
    const isInLocation = location ? product.location.toLowerCase().includes(location.toLowerCase()) : true;
    return isInPriceRange && isInCategory && isInLocation;
  });

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const resetPriceFilter = () => {
    setMinPrice(defaultMinPrice);
    setMaxPrice(defaultMaxPrice);
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col md:flex-row mt-12"> 
      <div className="w-full md:w-1/4 p-6"> 
        {/* Sidebar Categories */}
        <div className="bg-white py-6 px-5 widget_block mb-6 rounded-lg shadow-lg"> 
          <h6 className="mb-4 font-bold text-lg text-gray-800">Categories</h6>
          <ul className="space-y-3"> 
            {categories.map((category) => (
              <li key={category.name}>
                <button 
                  onClick={() => handleCategoryClick(category.name === 'All Categories' ? null : category.name)} 
                  className={`flex justify-between items-center text-gray-700 hover:text-gray-900 ${selectedCategory === category.name ? 'font-bold' : ''}`}
                >
                  <span>{category.name}</span>
                  <span className="text-gray-500">({category.count})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter by Price */}
        <div className="bg-white py-6 px-5 widget_block mb-6 rounded-lg shadow-lg"> 
          <h6 className="font-bold mb-4 text-lg text-gray-800">Filter by Price</h6>
          <div className="flex flex-col gap-4">
            <label className="flex items-center relative">
              <FiDollarSign className="absolute left-3 text-gray-500" size={20} /> {/* Ikon dolar */}
              <input 
                type="number" 
                placeholder="Min Price"
                value={minPrice} 
                onChange={handleMinPriceChange} 
                className="pl-10 border border-gray-300 p-2 rounded-lg w-24"
              />
            </label>
            <label className="flex items-center relative">
              <FiDollarSign className="absolute left-3 text-gray-500" size={20} /> {/* Ikon dolar */}
              <input 
                type="number" 
                placeholder="Max Price"
                value={maxPrice} 
                onChange={handleMaxPriceChange} 
                className="pl-10 border border-gray-300 p-2 rounded-lg w-24"
              />
            </label>
          </div>
          <button 
            className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 w-full" 
            onClick={resetPriceFilter}
          >
            Reset Filter
          </button>
        </div>
      </div>

      <div className="w-full md:w-3/4 p-6">
        {/* Menampilkan jumlah produk yang ditampilkan dan total produk */}
        <div className="mb-4 flex items-center justify-between"> 
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex items-center gap-4"> 
            <div className="relative">
              <input 
                type="text" 
                value={location} 
                onChange={handleLocationChange} 
                placeholder="Enter city" 
                className="border border-gray-300 p-2 pl-10 rounded-lg w-64"
              />
              <FiSearch className="absolute top-2 left-3 text-gray-500" size={20} /> 
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="border border-gray-300 p-4 rounded-lg shadow-md flex flex-col items-center">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
                <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
                <div className="text-sm text-gray-500 mb-2">
                  Rated 5.00 out of 5 (1 review)
                </div>
                <span className="text-sm text-gray-600 mb-2">Category: {product.category}</span>
                <span className="text-sm text-gray-600 mb-2">Location: {product.location}</span>
                <span className="text-lg font-bold mb-4">${product.price.toFixed(2)}</span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found in this price range.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
