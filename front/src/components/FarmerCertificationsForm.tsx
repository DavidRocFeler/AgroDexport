// // Instead of a handleOnChange function, react-hook-form allows you to use the watch hook to observe field values ​​in real time. A watch() can be added to see the status of all inputs in the console.

"use client";
import { ICertificationsProps, IPreviewState } from "@/interface/types";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { File } from "lucide-react";

interface FarmerCertificationsFormProps {
  onBack: () => void;
  productData?: any;
  onCertificationsSubmit?: (certifications: FormData) => void;
}

const FarmerCertificationsForm: React.FC<FarmerCertificationsFormProps> = ({
  onBack,
  productData,
  onCertificationsSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICertificationsProps>();

  const [previews, setPreviews] = useState<IPreviewState>({
    phytosanitary_certificate: null,
    agricultural_producer_cert: null,
    organic_certification: null,
    quality_certificate: null,
    certificate_of_origin: null,
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof ICertificationsProps
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviews((prev) => ({
        ...prev,
        [fieldName]: {
          name: file.name,
          size: formatFileSize(file.size),
        },
      }));
    }
  };

  const handleFormSubmit: SubmitHandler<ICertificationsProps> = (data) => {
    //Create FormData and add the files
    const formData = new FormData();

    //Add product data if it exists
    if (productData) {
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });
    }

    // Add certification files
    Object.keys(data).forEach((key) => {
      const file = data[key as keyof ICertificationsProps][0];
      if (file) {
        formData.append(key, file);
      }
    });

    // Call dispatch function if it exists
    if (onCertificationsSubmit) {
      onCertificationsSubmit(formData);
    } else {
      console.log("Form Data:", formData);
    }
  };

  // Component for the file field
  const FileInput = ({
    name,
    label,
    description,
  }: {
    name: keyof ICertificationsProps;
    label: string;
    description: string;
  }) => (
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <File className="text-gray-400" size={24} />
      </div>

      <div className="relative">
        <input
          type="file"
          accept=".pdf"
          {...register(name, {
            required: "This certificate is required",
            validate: {
              isPDF: (files) => {
                return (
                  !files?.[0] ||
                  files[0].type === "application/pdf" ||
                  "Only PDF files are allowed"
                );
              },
              maxSize: (files) => {
                return (
                  !files?.[0] ||
                  files[0].size <= 5000000 ||
                  "File size must be less than 5MB"
                );
              },
            },
          })}
          onChange={(e) => handleFileChange(e, name)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
          {previews[name] ? (
            <div className="flex items-center justify-center space-x-2">
              <File size={20} className="text-blue-500" />
              <span className="text-sm text-gray-600">
                {previews[name]?.name}
              </span>
              <span className="text-xs text-gray-400">
                ({previews[name]?.size})
              </span>
            </div>
          ) : (
            <div className="text-gray-500">
              <p className="font-medium">
                Drop your file here or click to browse
              </p>
              <p className="text-sm">Maximum file size: 5MB (PDF only)</p>
            </div>
          )}
        </div>
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 font-inter">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Upload Certifications
        </h2>
        <p className="text-gray-600 mt-2">
          Please upload all required certificates in PDF format. Each file
          should be less than 5MB.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FileInput
          name="phytosanitary_certificate"
          label="Phytosanitary Certificate"
          description="Official document certifying the phytosanitary condition of plants or plant products"
        />

        <FileInput
          name="agricultural_producer_cert"
          label="Agricultural Producer Certificate"
          description="Documentation proving your status as a certified agricultural producer"
        />

        <FileInput
          name="organic_certification"
          label="Organic Certification"
          description="Certification verifying organic farming practices and standards"
        />

        <FileInput
          name="quality_certificate"
          label="Quality Certificate"
          description="Documentation of product quality standards and testing"
        />

        <FileInput
          name="certificate_of_origin"
          label="Certificate of Origin"
          description="Official document declaring the origin of your agricultural products"
        />

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-black text-black hover:bg-gray-50 transition-colors"
          >
            Come back
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-black bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Upload Certificates
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerCertificationsForm;
