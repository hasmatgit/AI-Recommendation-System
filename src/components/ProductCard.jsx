import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-gray-800 mt-2">{product.name}</h3>
          </div>
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
        </div>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {product.description}
        </p>
        
        <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;