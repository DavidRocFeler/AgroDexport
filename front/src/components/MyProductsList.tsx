"use client";
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { IAgriProduct } from "@/interface/types";

interface MyProductListProps extends IAgriProduct {
  onDelete: (company_product_id: string) => void;
}

const MyProductList: React.FC<IAgriProduct> = ({
  company_product_id,
  company_product_name,
  company_product_description,
  origin,
  harvest_date,
  company_product_img,
}) => {
  useEffect(() => {
    console.log("Image received:", company_product_img);
  }, [company_product_img]);

  // ------------------------------------------
  const renderImage = () => {
    if (company_product_img) {
      console.log("Image content:", company_product_img);
      return (
        <img
          src={company_product_img}
          alt={company_product_name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      );
    }

    return (
      <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No image</span>
      </div>
    );
  };

  function onDelete(company_product_id: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300 mx-4">
      <div className="flex items-center gap-4">
        {/*-----------------------*/}
        <div className="flex-shrink-0 overflow-hidden">{renderImage()}</div>

        {/* ---------------------- */}
        <div className="flex-grow">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h3 className="font-semibold text-gray-700">Name:</h3>
              <p className="text-gray-600">{company_product_name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Description:</h3>
              <p className="text-gray-600">{company_product_description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Origin:</h3>
              <p className="text-gray-600">{origin}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Harvest Date:</h3>
              <p className="text-gray-600">{harvest_date}</p>
            </div>
          </div>
        </div>

        {/* -------------------------*/}
        <button
          onClick={() => onDelete(company_product_id)}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
          aria-label="Delete product"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default MyProductList;
