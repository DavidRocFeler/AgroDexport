"use client";
import React from "react";
import MyProductList from "../components/MyProductsList";
import { exampleMyProducts } from "@/helpers/myproductsHelpers";
import { IAgroProduct } from "@/interface/types";

const MyProductsView: React.FC = () => {
  //  const [products, setProducts] = useState<IAgroProduct[]>();

  //  const handleDelete = (product.id: string) => {
  //    setProducts(products.filter((product) => product.id !== product.id));
  //  };

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
        {exampleMyProducts.map((product: IAgroProduct) => (
          <MyProductList
            key={product.id}
            {...product}
            // onDelete={handleDelete}
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

//--------------------------------------------------------------------
