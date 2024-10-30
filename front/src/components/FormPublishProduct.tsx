// // Instead of a handleOnChange function, react-hook-form allows you to use the watch hook to observe field values ​​in real time. A watch() can be added to see the status of all inputs in the console.

"use client";
import { IPublishProductProps } from "@/interface/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormPublishProductProps {
  onSubmit: (data: IPublishProductProps) => void;
}

const FormPublishProduct: React.FC<FormPublishProductProps> = ({
  onSubmit,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPublishProductProps>();

  const handleFormSubmit: SubmitHandler<IPublishProductProps> = (data) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    router.push("/userpanel");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-inter">
      <h2 className="text-2xl font-bold mb-6">Publish New Product</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="form-group">
          <label className="block mb-2 font-semibold">Product Name</label>
          <input
            {...register("company_product_name", {
              required: "Product name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.company_product_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company_product_name.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            {...register("company_product_description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
          {errors.company_product_description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company_product_description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-2 font-semibold">Stock (ton)</label>
            <input
              type="number"
              {...register("stock", {
                required: "Stock is required",
                min: {
                  value: 0,
                  message: "Stock cannot be negative",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">
              Minimum Order 5 ton
            </label>
            <input
              type="number"
              {...register("minimum_order", {
                required: "Minimum order is required",
                min: {
                  value: 5,
                  message: "Minimum order must be at least 5",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.minimum_order && (
              <p className="text-red-500 text-sm mt-1">
                {errors.minimum_order.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-2 font-semibold">Origin</label>
            <input
              {...register("origin", { required: "Origin is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.origin && (
              <p className="text-red-500 text-sm mt-1">
                {errors.origin.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">
              Discount (%) Optional
            </label>
            <input
              type="number"
              {...register("discount", {
                min: {
                  value: 0,
                  message: "Discount cannot be negative",
                },
                max: {
                  value: 100,
                  message: "Discount cannot exceed 100%",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-2 font-semibold">
              Price per ton ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("company_price_x_kg", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.company_price_x_kg && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company_price_x_kg.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">Harvest Date</label>
            <input
              type="date"
              {...register("harvest_date", {
                required: "Harvest date is required",
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.harvest_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.harvest_date.message}
              </p>
            )}
          </div>
        </div>

        <div className="form-group font-inter">
          <label className="block mb-2 font-semibold">
            Product Image jpg or png
          </label>
          <input
            type="file"
            accept=".jpg,.png"
            {...register("company_product_img", {
              required: "Product image jpg or png is required",
              validate: {
                fileType: (value) => {
                  if (!value[0]) return true; // Si no hay archivo, retorna true
                  const types = ["image/jpeg", "image/png"]; // Ajuste aquí para incluir 'image/jpeg'
                  return (
                    types.includes(value[0].type) ||
                    "File must be in JPG or PNG format"
                  );
                },
                fileSize: (value) => {
                  if (!value[0]) return true; // Si no hay archivo, retorna true
                  const fileSize = value[0].size / 1024 / 1024; // Convertir a MB
                  return fileSize <= 5 || "File size must be less than 5MB";
                },
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.company_product_img && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company_product_img.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-2 font-semibold">Calories (kcal)</label>
            <input
              type="number"
              {...register("calories", {
                required: "Calories value is required",
                min: {
                  value: 0,
                  message: "Calories cannot be negative",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.calories && (
              <p className="text-red-500 text-sm mt-1">
                {errors.calories.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">Fat (g)</label>
            <input
              type="number"
              step="0.1"
              {...register("fat", {
                required: "Fat value is required",
                min: {
                  value: 0,
                  message: "Fat cannot be negative",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fat && (
              <p className="text-red-500 text-sm mt-1">{errors.fat.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">Protein (g)</label>
            <input
              type="number"
              step="0.1"
              {...register("protein", {
                required: "Protein value is required",
                min: {
                  value: 0,
                  message: "Protein cannot be negative",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.protein && (
              <p className="text-red-500 text-sm mt-1">
                {errors.protein.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">Carbs (g)</label>
            <input
              type="number"
              step="0.1"
              {...register("carbs", {
                required: "Carbs value is required",
                min: {
                  value: 0,
                  message: "Carbs cannot be negative",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.carbs && (
              <p className="text-red-500 text-sm mt-1">
                {errors.carbs.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="font-inter border border-black px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="font-inter border border-black px-4 py-2 bg-black text-white hover:bg-gray-800"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPublishProduct;
