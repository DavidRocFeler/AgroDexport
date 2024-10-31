"use client";
import React from "react";
import MyProductList from "../components/MyProductsList";
import { exampleMyProducts } from "@/helpers/myproductsHelpers";
import { IAgroProduct } from "@/interface/types";

const MyProductsView: React.FC = () => {
  
  const productsArray = exampleMyProducts;
  
  const handleDelete = (name: string) => {
    console.log(`Deleting product with id: ${name}`);
    // Lógica adicional para eliminar el producto
  };
  
  return (
    <div className="container mx-auto py-8 font-inter">
      <h1 className="text-[96px] text-center mb-12 font-inter">My Products</h1>

      <div
        className={`${
          exampleMyProducts.length === 0
            ? "border border-black w-full h-64"
            : ""
        }`}
      >
        {
          productsArray && productsArray?.map((product) => {
            return(
              <MyProductList
              key={product.id}
              {...product}
              onDelete={handleDelete}
              />
            )
          })
        }
      </div>

      <div className="mt-8 flex justify-center">
        <button className="font-inter border border-black px-4 py-2">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default MyProductsView;
