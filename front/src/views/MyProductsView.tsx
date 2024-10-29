"use client";
import React, { useEffect, useState } from "react";
import MyProductList from "../components/MyProductsList";
import { IAgriProduct } from "@/interface/types";
import { getProductDB } from "@/server/getProduct";

const MyProductsView: React.FC = () => {
  const [productsArray, setProductsArray] = useState<IAgriProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductDB();
        setProductsArray(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (name: string) => {
    console.log(`Deleting product with id: ${name}`);
    // ??
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 font-inter">
        <h1 className="text-[96px] text-center mb-12 font-inter">
          My Products
        </h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 font-inter">
        <h1 className="text-[96px] text-center mb-12 font-inter">
          My Products
        </h1>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 font-inter">
      <h1 className="text-[96px] text-center mb-12 font-inter">My Products</h1>

      <div
        className={`${
          productsArray.length === 0 ? "border border-black w-full h-64" : ""
        }`}
      >
        {productsArray.map((product) => (
          <MyProductList
            key={product.company_product_id}
            {...product}
            onDelete={handleDelete}
          />
        ))}
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
