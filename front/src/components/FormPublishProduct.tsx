// Instead of a handleOnChange function, react-hook-form allows you to use the watch hook to observe field values ​​in real time. A watch() can be added to see the status of all inputs in the console.

"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { File } from "lucide-react";
import {
  FormPublishProductProps,
  IPublishProductProps,
} from "@/interface/types";

const FormPublishProduct: React.FC<FormPublishProductProps> = ({
  onUpdateClick,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPublishProductProps>();

  const [filePreview, setFilePreview] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<IPublishProductProps> = (data) => {
    // Aquí puedes manejar el envío del formulario
    console.log(data);
    // Después de procesar el formulario, llamamos a onUpdateClick para mostrar el siguiente formulario
    onUpdateClick();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-inter">
      <h2 className="text-2xl font-bold mb-6">Publish Product</h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
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

        {/* Description */}
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

        {/* Stock and Minimum Order in Tons */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-2 font-semibold">Stock (tons)</label>
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
              Minimum Order (5 tons)
            </label>
            <input
              type="number"
              {...register("minimum_order", {
                required: "Minimum order is required",
                min: {
                  value: 5,
                  message: "Minimum order must be at least 5 tons",
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

        {/* Origin and Optional Discount */}
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
              placeholder="Optional"
              {...register("discount", {
                required: false,
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

        {/* Price and Harvest Date */}
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

        {/* Product Image File Upload */}
        <div className="form-group space-y-4">
          <label className="block mb-2 font-semibold">Product Image</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              {...register("company_product_img", {
                required: "Product image is required",
                validate: {
                  isImage: (files) => {
                    return (
                      !files?.[0] ||
                      files[0].type.startsWith("image/") ||
                      "File must be an image"
                    );
                  },
                  maxSize: (files) => {
                    return (
                      !files?.[0] ||
                      files[0].size <= 5000000 ||
                      "Image size must be less than 5MB"
                    );
                  },
                },
              })}
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
              {filePreview ? (
                <div className="flex items-center justify-center">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="max-h-40 object-contain"
                  />
                </div>
              ) : (
                <div className="text-gray-500">
                  <File className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1">
                    Drop your image here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
          {errors.company_product_img && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company_product_img.message}
            </p>
          )}
        </div>

        {/* Nutritional Information */}
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

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-black text-black hover:bg-gray-50 transition-colors"
          >
            Come back
          </button>
          <button
            type="submit"
            className="bg-white border border-black text-black px-6 py-2 hover:bg-gray-50 transition-colors"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPublishProduct;
