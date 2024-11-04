import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { File } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FormPublishProductProps, IAgriProductFormValues } from "@/interface/types";
import { createCompanyProduct, updateCompanyProduct, getProductById } from "@/server/getProduct";
import { uploadImageToCloudinary } from "@/server/cloudinarySetting";
import { useUserStore } from "@/store/useUserStore";

const MySwal = withReactContent(Swal);

const FormPublishProduct: React.FC<FormPublishProductProps> = ({
  onUpdateClick,
  categories,
  selectedCompany
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAgriProductFormValues>();
  const { token, user_id } = useUserStore();

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [createdProductId, setCreatedProductId] = useState<string | null>(null);
  const [isReadyForCertifications, setIsReadyForCertifications] = useState(false);

  // Check if there's a company_product_id in the URL
  const companyProductId = searchParams.get("company_product_id");

  useEffect(() => {
    const loadProductData = async () => {
      if (companyProductId && selectedCompany) {
        try {
          const productData = await getProductById(selectedCompany, companyProductId);
          if (productData) {
            setValue("company_product_name", productData.company_product_name);
            setValue("company_product_description", productData.company_product_description);
            setValue("category_id", productData.category_id || "");
            setValue("stock", productData.stock.toString());
            setValue("minimum_order", productData.minimum_order.toString());
            setValue("origin", productData.origin);
            setValue("discount", productData.discount.toString());
            setValue("company_price_x_kg", productData.company_price_x_kg.toString());
            setValue("harvest_date", new Date(productData.harvest_date).toISOString().substring(0, 10));
            setFilePreview(productData.company_product_img || null);
            setCreatedProductId(companyProductId);
            setIsProductCreated(true);
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };

    if (companyProductId) {
      loadProductData();
    }
  }, [companyProductId, selectedCompany, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && createdProductId) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
      uploadImageAfterProductCreation(file);
    }
  };

  const handleComeBack = () => {
    router.push("/myproducts");
  };

  const handleCreateOrUpdateProduct: SubmitHandler<IAgriProductFormValues> = async (data) => {
    if (!token) return;

    // Convert text values to numbers before sending the data
    const productData = {
      ...data,
      company_id: selectedCompany,
      stock: Number(data.stock),
      minimum_order: Number(data.minimum_order),
      discount: data.discount ? Number(data.discount) : 0,
      company_price_x_kg: Number(data.company_price_x_kg),
    };

    try {
      if (isProductCreated && createdProductId) {
        await updateCompanyProduct(createdProductId, productData, token);
        MySwal.fire({
          icon: 'success',
          title: 'Product Updated',
          text: 'Your product has been updated successfully!',
        });
      } else {
        const response = await createCompanyProduct(productData, token);
        setIsProductCreated(true);
        setCreatedProductId(response.company_product_id);
        MySwal.fire({
          icon: 'success',
          title: 'Product Created',
          text: 'Your product has been created successfully!',
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred";
      MySwal.fire({
        icon: 'error',
        title: isProductCreated ? 'Update Failed' : 'Creation Failed',
        text: `There was an error ${isProductCreated ? 'updating' : 'creating'} your product`,
      });
      console.error("Error creating or updating product:", error);
    }
  };

  const uploadImageAfterProductCreation = async (file: File) => {
    if (!token || !user_id || !createdProductId) {
      console.error("Token, user ID, or Product ID not found");
      return;
    }

    try {
      const response = await uploadImageToCloudinary(file, "companyProduct", createdProductId, token);
      if (response.secure_url) {
        setFilePreview(response.secure_url);
        setIsReadyForCertifications(true);
        MySwal.fire({
          icon: 'success',
          title: 'Image Uploaded',
          text: 'Your image has been uploaded successfully!',
        });
      } else {
        console.error("No secure URL in response:", response);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      MySwal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: errorMessage,
      });
    }
  };

  const handleAddCertificationsClick = () => {
    if (onUpdateClick && createdProductId && selectedCompany) {
      onUpdateClick(createdProductId, selectedCompany);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-inter">
      <h2 className="text-2xl font-bold mb-6">{companyProductId ? "Update Product" : "Add Product"}</h2>
      <form className="space-y-6" onSubmit={handleSubmit(handleCreateOrUpdateProduct)}>
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
            <p className="text-red-500 text-sm mt-1">{errors.company_product_name.message}</p>
          )}
        </div>

         {/* Description */}
        <div className="form-group">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            {...register("company_product_description", { required: "Description is required" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
          {errors.company_product_description && (
            <p className="text-red-500 text-sm mt-1">{errors.company_product_description.message}</p>
          )}
        </div>

        {/* Category Select */}
        <div className="form-group">
          <label className="block mb-2 font-semibold">Category</label>
          <select
            {...register("category_id", { required: "Please select a category" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name_category}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
          )}
        </div>

        {/* Stock and Minimum Order in Tons */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-2 font-semibold">Stock (tons)</label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock cannot be negative" } })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">Minimum Order (5 tons)</label>
            <input
              type="number"
              {...register("minimum_order", { required: "Minimum order is required", min: { value: 5, message: "Minimum order must be at least 5 tons" } })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.minimum_order && <p className="text-red-500 text-sm mt-1">{errors.minimum_order.message}</p>}
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
            {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin.message}</p>}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">Discount (%)</label>
            <input
              type="number"
              placeholder="Optional"
              {...register("discount", { required: false, min: { value: 0, message: "Discount cannot be negative" }, max: { value: 100, message: "Discount cannot exceed 100%" } })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>}
          </div>
        </div>

        {/* Price and Harvest Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-2 font-semibold">Price per Kg ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("company_price_x_kg", { required: "Price is required", min: { value: 0, message: "Price cannot be negative" } })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.company_price_x_kg && <p className="text-red-500 text-sm mt-1">{errors.company_price_x_kg.message}</p>}
          </div>

          <div className="form-group">
            <label className="block mb-2 font-semibold">Harvest Date</label>
            <input
              type="date"
              {...register("harvest_date", { required: "Harvest date is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.harvest_date && <p className="text-red-500 text-sm mt-1">{errors.harvest_date.message}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={handleComeBack} className="px-6 py-2 border border-black text-black hover:bg-gray-50 transition-colors">
            Come back
          </button>
          <button type="submit" className="bg-white border border-black text-black px-6 py-2 hover:bg-gray-50 transition-colors">
            {isProductCreated ? "Update Product" : "Create Product"}
          </button>
        </div>

        {/* Product Image Upload */}
        <div className="form-group space-y-4 mt-6">
          <label className="block mb-2 font-semibold">Product Image</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              disabled={!isProductCreated}
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors ${!isProductCreated ? "bg-gray-100" : "hover:border-blue-500"}`}>
              {filePreview ? (
                <div className="flex items-center justify-center">
                  <img src={filePreview} alt="Preview" className="max-h-40 object-contain" />
                </div>
              ) : (
                <div className="text-gray-500">
                  <File className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1">Drop your image here or click to browse</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Button to Go to Next Step */}
        {isReadyForCertifications && (
          <div className="flex justify-end mt-4">
            <button onClick={handleAddCertificationsClick} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
              Add Farmer Certifications
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormPublishProduct;
