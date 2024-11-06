// import React, { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useRouter, useSearchParams } from "next/navigation";
// import { File } from "lucide-react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import {
//   FormPublishProductProps,
//   IAgriProductFormValues,
// } from "@/interface/types";
// import {
//   createCompanyProduct,
//   updateCompanyProduct,
//   getProductById,
// } from "@/server/getProduct";
// import { uploadImageToCloudinary } from "@/server/cloudinarySetting";
// import { useUserStore } from "@/store/useUserStore";

// const MySwal = withReactContent(Swal);

// const FormPublishProduct: React.FC<FormPublishProductProps> = ({
//   onUpdateClick,
//   categories,
//   selectedCompany,
// }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<IAgriProductFormValues>();
//   const { token, user_id } = useUserStore();

//   const [filePreview, setFilePreview] = useState<string | null>(null);
//   const [isProductCreated, setIsProductCreated] = useState(false);
//   const [createdProductId, setCreatedProductId] = useState<string | null>(null);
//   const [isReadyForCertifications, setIsReadyForCertifications] =
//     useState(false);

//   // Check if there's a company_product_id in the URL
//   const companyProductId = searchParams.get("company_product_id");

//   useEffect(() => {
//     const loadProductData = async () => {
//       if (companyProductId && selectedCompany) {
//         try {
//           const productData = await getProductById(
//             selectedCompany,
//             companyProductId
//           );
//           if (productData) {
//             setValue("company_product_name", productData.company_product_name);
//             setValue(
//               "company_product_description",
//               productData.company_product_description
//             );
//             setValue("category_id", productData.category_id || "");
//             setValue("stock", productData.stock.toString());
//             setValue("minimum_order", productData.minimum_order.toString());
//             setValue("origin", productData.origin);
//             setValue("discount", productData.discount.toString());
//             setValue(
//               "company_price_x_kg",
//               productData.company_price_x_kg.toString()
//             );
//             setValue(
//               "harvest_date",
//               new Date(productData.harvest_date).toISOString().substring(0, 10)
//             );
//             setFilePreview(productData.company_product_img || null);
//             setCreatedProductId(companyProductId);
//             setIsProductCreated(true);
//           }
//         } catch (error) {
//           console.error("Error fetching product data:", error);
//         }
//       }
//     };

//     if (companyProductId) {
//       loadProductData();
//     }
//   }, [companyProductId, selectedCompany, setValue]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && createdProductId) {
//       const reader = new FileReader();
//       reader.onloadend = () => setFilePreview(reader.result as string);
//       reader.readAsDataURL(file);
//       uploadImageAfterProductCreation(file);
//     }
//   };

//   const handleComeBack = () => {
//     router.push("/myproducts");
//   };

//   const handleCreateOrUpdateProduct: SubmitHandler<
//     IAgriProductFormValues
//   > = async (data) => {
//     if (!token) return;

//     // Convert text values to numbers before sending the data
//     const productData = {
//       ...data,
//       company_id: selectedCompany,
//       stock: Number(data.stock),
//       minimum_order: Number(data.minimum_order),
//       discount: data.discount ? Number(data.discount) : 0,
//       company_price_x_kg: Number(data.company_price_x_kg),
//     };

//     try {
//       if (isProductCreated && createdProductId) {
//         await updateCompanyProduct(createdProductId, productData, token);
//         MySwal.fire({
//           icon: "success",
//           title: "Product Updated",
//           text: "Your product has been updated successfully!",
//         });
//       } else {
//         const response = await createCompanyProduct(productData, token);
//         setIsProductCreated(true);
//         setCreatedProductId(response.company_product_id);
//         MySwal.fire({
//           icon: "success",
//           title: "Product Created",
//           text: "Your product has been created successfully!",
//         });
//       }
//     } catch (error: any) {
//       const errorMessage = error.message || "An unexpected error occurred";
//       MySwal.fire({
//         icon: "error",
//         title: isProductCreated ? "Update Failed" : "Creation Failed",
//         text: `There was an error ${
//           isProductCreated ? "updating" : "creating"
//         } your product`,
//       });
//       console.error("Error creating or updating product:", error);
//     }
//   };

//   const uploadImageAfterProductCreation = async (file: File) => {
//     if (!token || !user_id || !createdProductId) {
//       console.error("Token, user ID, or Product ID not found");
//       return;
//     }

//     try {
//       const response = await uploadImageToCloudinary(
//         file,
//         "companyProduct",
//         createdProductId,
//         token
//       );
//       if (response.secure_url) {
//         setFilePreview(response.secure_url);
//         setIsReadyForCertifications(true);
//         MySwal.fire({
//           icon: "success",
//           title: "Image Uploaded",
//           text: "Your image has been uploaded successfully!",
//         });
//       } else {
//         console.error("No secure URL in response:", response);
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || error.message || "An error occurred";
//       MySwal.fire({
//         icon: "error",
//         title: "Upload Failed",
//         text: errorMessage,
//       });
//     }
//   };

//   const handleAddCertificationsClick = () => {
//     if (onUpdateClick && createdProductId && selectedCompany) {
//       onUpdateClick(createdProductId, selectedCompany);
//     }
//   };

//   return (
//     <div className="max-w-2xl p-6 mx-auto font-inter">
//       <h2 className="mb-6 text-2xl font-bold">
//         {companyProductId ? "Update Product" : "Add Product"}
//       </h2>
//       <form
//         className="space-y-6"
//         onSubmit={handleSubmit(handleCreateOrUpdateProduct)}
//       >
//         {/* Product Name */}
//         <div className="form-group">
//           <label className="block mb-2 font-semibold">Product Name</label>
//           <input
//             {...register("company_product_name", {
//               required: "Product name is required",
//               minLength: {
//                 value: 3,
//                 message: "Name must be at least 3 characters long",
//               },
//             })}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.company_product_name && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.company_product_name.message}
//             </p>
//           )}
//         </div>

//         {/* Description */}
//         <div className="form-group">
//           <label className="block mb-2 font-semibold">Description</label>
//           <textarea
//             {...register("company_product_description", {
//               required: "Description is required",
//             })}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             rows={4}
//           />
//           {errors.company_product_description && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.company_product_description.message}
//             </p>
//           )}
//         </div>

//         {/* Category Select */}
//         <div className="form-group">
//           <label className="block mb-2 font-semibold">Category</label>
//           <select
//             {...register("category_id", {
//               required: "Please select a category",
//             })}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category.category_id} value={category.category_id}>
//                 {category.name_category}
//               </option>
//             ))}
//           </select>
//           {errors.category_id && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.category_id.message}
//             </p>
//           )}
//         </div>

//         {/* Stock and Minimum Order in Tons */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="form-group">
//             <label className="block mb-2 font-semibold">Stock (tons)</label>
//             <input
//               type="number"
//               {...register("stock", {
//                 required: "Stock is required",
//                 min: { value: 0, message: "Stock cannot be negative" },
//               })}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.stock && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.stock.message}
//               </p>
//             )}
//           </div>

//           <div className="form-group">
//             <label className="block mb-2 font-semibold">
//               Minimum Order (5 tons)
//             </label>
//             <input
//               type="number"
//               {...register("minimum_order", {
//                 required: "Minimum order is required",
//                 min: {
//                   value: 5,
//                   message: "Minimum order must be at least 5 tons",
//                 },
//               })}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.minimum_order && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.minimum_order.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Origin and Optional Discount */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="form-group">
//             <label className="block mb-2 font-semibold">Origin</label>
//             <input
//               {...register("origin", { required: "Origin is required" })}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.origin && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.origin.message}
//               </p>
//             )}
//           </div>

//           <div className="form-group">
//             <label className="block mb-2 font-semibold">Discount (%)</label>
//             <input
//               type="number"
//               placeholder="Optional"
//               {...register("discount", {
//                 required: false,
//                 min: { value: 0, message: "Discount cannot be negative" },
//                 max: { value: 100, message: "Discount cannot exceed 100%" },
//               })}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.discount && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.discount.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Price and Harvest Date */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="form-group">
//             <label className="block mb-2 font-semibold">Price per Kg ($)</label>
//             <input
//               type="number"
//               step="0.01"
//               {...register("company_price_x_kg", {
//                 required: "Price is required",
//                 min: { value: 0, message: "Price cannot be negative" },
//               })}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.company_price_x_kg && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.company_price_x_kg.message}
//               </p>
//             )}
//           </div>

//           <div className="form-group">
//             <label className="block mb-2 font-semibold">Harvest Date</label>
//             <input
//               type="date"
//               {...register("harvest_date", {
//                 required: "Harvest date is required",
//               })}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.harvest_date && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.harvest_date.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={handleComeBack}
//             className="px-6 py-2 text-black transition-colors border border-black hover:bg-gray-50"
//           >
//             Come back
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 text-black transition-colors bg-white border border-black hover:bg-gray-50"
//           >
//             {isProductCreated ? "Update Product" : "Create Product"}
//           </button>
//         </div>

//         {/* Product Image Upload */}
//         <div className="mt-6 space-y-4 form-group">
//           <label className="block mb-2 font-semibold">Product Image</label>
//           <div className="relative">
//             <input
//               type="file"
//               accept="image/*"
//               disabled={!isProductCreated}
//               onChange={handleFileChange}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//             <div
//               className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors ${
//                 !isProductCreated ? "bg-gray-100" : "hover:border-blue-500"
//               }`}
//             >
//               {filePreview ? (
//                 <div className="flex items-center justify-center">
//                   <img
//                     src={filePreview}
//                     alt="Preview"
//                     className="object-contain max-h-40"
//                   />
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   <File className="w-12 h-12 mx-auto text-gray-400" />
//                   <p className="mt-1">
//                     Drop your image here or click to browse
//                   </p>
//                   <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Button to Go to Next Step */}
//         {isReadyForCertifications && (
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={handleAddCertificationsClick}
//               className="px-6 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600"
//             >
//               Add Farmer Certifications
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default FormPublishProduct;

//-----------------------------------------------------------------------------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { File } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  FormPublishProductProps,
  IAgriProductFormValues,
} from "@/interface/types";
import {
  createCompanyProduct,
  updateCompanyProduct,
  getProductById,
} from "@/server/getProduct";
import { uploadImageToCloudinary } from "@/server/cloudinarySetting";
import { useUserStore } from "@/store/useUserStore";

const MySwal = withReactContent(Swal);

const FormPublishProduct: React.FC<FormPublishProductProps> = ({
  onUpdateClick,
  categories,
  selectedCompany,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAgriProductFormValues>();
  const { token, user_id } = useUserStore();

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [createdProductId, setCreatedProductId] = useState<string | null>(null);
  const [isReadyForCertifications, setIsReadyForCertifications] =
    useState(false);

  // Check if there's a company_product_id in the URL
  const companyProductId = searchParams.get("company_product_id");

  useEffect(() => {
    const loadProductData = async () => {
      if (companyProductId && selectedCompany) {
        try {
          const productData = await getProductById(
            selectedCompany,
            companyProductId
          );
          if (productData) {
            setValue("company_product_name", productData.company_product_name);
            setValue(
              "company_product_description",
              productData.company_product_description
            );
            setValue("category_id", productData.category_id || "");
            setValue("stock", productData.stock.toString());
            setValue("minimum_order", productData.minimum_order.toString());
            setValue("origin", productData.origin);
            setValue("discount", productData.discount.toString());
            setValue(
              "company_price_x_kg",
              productData.company_price_x_kg.toString()
            );
            setValue(
              "harvest_date",
              new Date(productData.harvest_date).toISOString().substring(0, 10)
            );
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

  const handleCreateOrUpdateProduct: SubmitHandler<
    IAgriProductFormValues
  > = async (data) => {
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
          icon: "success",
          title: "Product Updated",
          text: "Your product has been updated successfully!",
        });
      } else {
        const response = await createCompanyProduct(productData, token);
        setIsProductCreated(true);
        setCreatedProductId(response.company_product_id);
        MySwal.fire({
          icon: "success",
          title: "Product Created",
          text: "Your product has been created successfully!",
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred";
      MySwal.fire({
        icon: "error",
        title: isProductCreated ? "Update Failed" : "Creation Failed",
        text: `There was an error ${
          isProductCreated ? "updating" : "creating"
        } your product`,
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
      const response = await uploadImageToCloudinary(
        file,
        "companyProduct",
        createdProductId,
        token
      );
      if (response.secure_url) {
        setFilePreview(response.secure_url);
        setIsReadyForCertifications(true);
        MySwal.fire({
          icon: "success",
          title: "Image Uploaded",
          text: "Your image has been uploaded successfully!",
        });
      } else {
        console.error("No secure URL in response:", response);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      MySwal.fire({
        icon: "error",
        title: "Upload Failed",
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
    <div className="max-w-2xl p-6 mx-auto bg-white font-inter">
      <h2 className="mb-2 text-xl font-bold">
        {companyProductId ? "Update Product" : "Add Product"}
      </h2>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleCreateOrUpdateProduct)}
      >
        {/* Product Name */}
        <div className="form-group">
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            {...register("company_product_name", {
              required: "Product name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
            className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.company_product_name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.company_product_name.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("company_product_description", {
              required: "Description is required",
            })}
            className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
          {errors.company_product_description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.company_product_description.message}
            </p>
          )}
        </div>

        {/* Category Select */}
        <div className="form-group">
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("category_id", {
              required: "Please select a category",
            })}
            className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name_category}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="mt-1 text-xs text-red-500">
              {errors.category_id.message}
            </p>
          )}
        </div>

        {/* Stock and Minimum Order in Tons */}
        <div className="grid grid-cols-2 gap-2">
          <div className="form-group">
            <label className="block mb-1 font-medium">Stock (tons)</label>
            <input
              type="number"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock cannot be negative" },
              })}
              className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.stock && (
              <p className="mt-1 text-xs text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-1 font-medium">
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
              className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.minimum_order && (
              <p className="mt-1 text-xs text-red-500">
                {errors.minimum_order.message}
              </p>
            )}
          </div>
        </div>

        {/* Origin and Optional Discount */}
        <div className="grid grid-cols-2 gap-2">
          <div className="form-group">
            <label className="block mb-1 font-medium">Origin</label>
            <input
              {...register("origin", { required: "Origin is required" })}
              className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.origin && (
              <p className="mt-1 text-xs text-red-500">
                {errors.origin.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-1 font-medium">Discount (%)</label>
            <input
              type="number"
              placeholder="Optional"
              {...register("discount", {
                required: false,
                min: { value: 0, message: "Discount cannot be negative" },
                max: { value: 100, message: "Discount cannot exceed 100%" },
              })}
              className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.discount && (
              <p className="mt-1 text-xs text-red-500">
                {errors.discount.message}
              </p>
            )}
          </div>
        </div>

        {/* Price and Harvest Date */}
        <div className="grid grid-cols-2 gap-2">
          <div className="form-group">
            <label className="block mb-1 font-medium">Price per Kg ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("company_price_x_kg", {
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" },
              })}
              className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.company_price_x_kg && (
              <p className="mt-1 text-xs text-red-500">
                {errors.company_price_x_kg.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="block mb-1 font-medium">Harvest Date</label>
            <input
              type="date"
              {...register("harvest_date", {
                required: "Harvest date is required",
              })}
              className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.harvest_date && (
              <p className="mt-1 text-xs text-red-500">
                {errors.harvest_date.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleComeBack}
            className="px-3 py-1 text-gray-700 transition duration-200 ease-in-out border border-gray-400 rounded-md hover:bg-gray-100 hover:border-gray-500 hover:text-gray-800"
          >
            Come back
          </button>
          <button
            type="submit"
            className="px-3 py-1 font-semibold text-white transition duration-200 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 hover:border-blue-700"
          >
            {isProductCreated ? "Update Product" : "Create Product"}
          </button>
        </div>

        {/* Product Image Upload */}
        <div className="mt-4 space-y-2 form-group">
          <label className="block mb-1 font-medium">Product Image</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              disabled={!isProductCreated}
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className={`border-2 border-dashed border-gray-300 rounded-lg p-2 text-center transition-colors ${
                !isProductCreated ? "bg-gray-100" : "hover:border-blue-500"
              }`}
            >
              {filePreview ? (
                <div className="flex items-center justify-center">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="object-contain max-h-30"
                  />
                </div>
              ) : (
                <div className="text-gray-500">
                  <File className="w-10 h-10 mx-auto text-gray-400" />
                  <p className="mt-1">
                    Drop your image here or click to browse
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Button to Go to Next Step */}
        {isReadyForCertifications && (
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddCertificationsClick}
              className="px-4 py-1 text-white transition-colors bg-green-500 rounded hover:bg-green-600"
            >
              Add Farmer Certifications
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormPublishProduct;
