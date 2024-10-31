"use client"
import { IAgriProduct } from '@/interface/types';
import React from 'react';
import { useRouter } from 'next/navigation';

const ProductCard: React.FC<IAgriProduct> = ({company_id, carbs, fat, calories, protein, category_id, stock, minimum_order, harvest_date, company_product_name, company_product_img, company_product_description, company_price_x_kg}) => {
  
  const router = useRouter();
    const handleButtonProduct = () => {
        
        const product = { 
          company_id,
          company_product_img,
          company_product_name,
          category_id,
          origin,
          harvest_date,
          company_price_x_kg,
          minimum_order,
          stock,
          company_product_description,
          calories,
          fat,
          protein,
          carbs,
        };
        localStorage.setItem("selectedProduct", JSON.stringify(product));

        //guardar category por separado
        localStorage.setItem("categoryId", category_id);

        // Redirigir a la página del producto con el id
        router.push(`/detailproduct/${company_id}`);
    }
  
  return (
        <div className="relative border h-[28rem] p-[2rem] rounded shadow-lg w-[100%] ">
          <img src={company_product_img} alt={company_product_name} className="w-full h-48 object-content mb-4 rounded" />
          <h2 className="text-lg text-black font-bold">{company_product_name}</h2>
          <p className="text-gray-600">{company_product_description}</p>
          <p className="text-green-500 font-semibold">${company_price_x_kg}</p>
          <button onClick={handleButtonProduct} className="absolute bottom-5 bg-[#034B35] text-white px-4 py-2 rounded-lg flex items-center m-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1.68 9.74a2 2 0 01-1.98 1.76H6.66a2 2 0 01-1.98-1.76L3 3zm0 0l2 16h14l2-16m-5 8h.01m-2.01 0h.01M7 11h.01m-2 0h.01" />
            </svg>
            Add to cart shoop
          </button>
        </div>
  );
}

export default ProductCard;

