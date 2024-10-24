import React from 'react';
import { productsToPreLoad } from '@/helpers/preLoadProducts'; 


const ProductCard: React.FC = () => {
  return (
    <div className="grid grid-cols-2 mx-12 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsToPreLoad.map((product, index) => (
        <div key={index} className="border p-4 rounded shadow-lg">
          <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
          <h2 className="text-lg text-black font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-500 font-semibold">${product.pricePerUnit}</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1.68 9.74a2 2 0 01-1.98 1.76H6.66a2 2 0 01-1.98-1.76L3 3zm0 0l2 16h14l2-16m-5 8h.01m-2.01 0h.01M7 11h.01m-2 0h.01" />
            </svg>
            Add to cart shoop
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;

