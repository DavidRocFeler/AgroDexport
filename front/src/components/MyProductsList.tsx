// MyProductList.tsx
"use client";
import React from "react";
import { Trash2 } from "lucide-react"; // Importando el ícono de trash
import { IAgroProduct } from "@/interface/types";

interface MyProductListProps extends IAgroProduct {
  onDelete: (name: string) => void;
}

const MyProductList: React.FC<MyProductListProps> = ({
  name,
  variety,
  origin,
  harvestDate,
  images,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300 mx-4">
      <div className="flex items-center gap-4">
        {/* Imagen del producto */}
        <div className="flex-shrink-0">
          <img
            src={images?.[0] || "/api/placeholder/120/120"}
            alt={`${name} product`}
            className="w-24 h-24 rounded-lg object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="flex-grow">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h3 className="font-semibold text-gray-700">Name:</h3>
              <p className="text-gray-600">{name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Variety:</h3>
              <p className="text-gray-600">{variety}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Origin:</h3>
              <p className="text-gray-600">{origin}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Harvest Date:</h3>
              <p className="text-gray-600">{harvestDate}</p>
            </div>
          </div>
        </div>

        {/* Botón de eliminar */}
        <button
          onClick={() => onDelete(name)}
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
