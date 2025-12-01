import React, { useState } from 'react';
import { products as allProducts } from './data/products';
import { getRecommendations } from './services/aiService';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      //  Get matching IDs AI
      const matchingIds = await getRecommendations(query, allProducts);
      
      // Filter local data on IDs
      const results = allProducts.filter(p => matchingIds.includes(p.id));
      
      setFilteredProducts(results);
      setIsFiltered(true);
    } catch (error) {
      alert("Something went wrong with the AI service.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilteredProducts(allProducts);
    setIsFiltered(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            AI Recommendation Store
          </h1>
          <p className="text-lg text-gray-600">
            Powered by OpenAI to help you find exactly what you need.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {isFiltered && !loading && (
          <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
            <p className="text-gray-600">
              Found <span className="font-bold text-black">{filteredProducts.length}</span> recommendations for you.
            </p>
            <button 
              onClick={handleReset}
              className="text-sm text-red-500 font-medium hover:text-red-700 underline"
            >
              Clear Filters & Show All
            </button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No products match your description.</p>
            <button onClick={handleReset} className="mt-4 text-blue-600 font-medium">View all products</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;