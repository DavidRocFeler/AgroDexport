"use client";
import React, { useEffect } from "react";
import { Trash2, RefreshCw, Ban, EyeOff } from "lucide-react";
import { IAgriProduct } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";
import { deleteCompanyProduct, updateCompanyProduct } from "@/server/getProduct";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

interface MyProductListProps extends IAgriProduct {
  onDeleteSuccess: (productId: string, newActiveStatus: boolean) => void;
  onClick: () => void;
}

const MyProductList: React.FC<MyProductListProps> = ({
  company_product_id,
  company_product_name,
  company_product_description,
  origin,
  harvest_date,
  company_product_img,
  isActive,
  stock,
  company_price_x_kg,
  minimum_order,
  category,
  onDeleteSuccess,
  onClick,
}) => {
  const { token } = useUserStore();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // console.log("Image received:", company_product_img);
  }, [company_product_img]);

  const renderImage = () => {
    if (company_product_img) {
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

  const handleDeleteOrReactivate = async () => {
    if (!token) return;

    const confirmResult = await MySwal.fire({
      title: isActive ? "Confirm Deactivate" : "Confirm Reactivation",
      text: isActive
        ? "Are you sure you want to deactivate this product?"
        : "Do you want to reactivate this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isActive ? "Yes, deactivate it!" : "Yes, reactivate it!",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        if (isActive) {
          await deleteCompanyProduct(company_product_id, token);
          onDeleteSuccess(company_product_id, false);
          MySwal.fire("Deactivated!", "The product has been deactivate.", "success");
        } else {
          await updateCompanyProduct(company_product_id, { isActive: true }, token);
          onDeleteSuccess(company_product_id, true);
          MySwal.fire("Reactivated!", "The product is now active.", "success");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        MySwal.fire("Error", "An error occurred while updating the product.", "error");
      }
    }
  };

  const formattedStock = `${stock} Tons`;
  const formattedHarvestDate = new Date(harvest_date).toLocaleDateString("en-GB");

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300 mx-2 max-w-xl cursor-pointer ${
        !isActive ? "opacity-50" : ""
      }`}
      onClick={onClick} // Activar la redirección en click
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 overflow-hidden">{renderImage()}</div>

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
              <h3 className="font-semibold text-gray-700">Category:</h3>
              <p className="text-gray-600">{category?.name_category}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Origin:</h3>
              <p className="text-gray-600">{origin}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Harvest Date:</h3>
              <p className="text-gray-600">{formattedHarvestDate}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Stock:</h3>
              <p className="text-gray-600">{formattedStock}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Price per Kg:</h3>
              <p className="text-gray-600">${company_price_x_kg}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Minimum Order:</h3>
              <p className="text-gray-600">{minimum_order} kg</p>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic en el botón active la redirección
            handleDeleteOrReactivate();
          }}
          className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors duration-200"
          aria-label={isActive ? "Delete product" : "Reactivate product"}
        >
          {isActive ? <Ban size={24} /> : <RefreshCw size={24} />}
        </button>
      </div>
    </div>
  );
};

export default MyProductList;
