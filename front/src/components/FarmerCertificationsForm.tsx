"use client";
import Swal from "sweetalert2";
import {
  FarmerCertificationsFormProps,
  FileInputProps,
  ICertificationsProps,
  IPreviewState,
} from "@/interface/types";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { File as FileIcon } from "lucide-react"; // Renombra el ícono importado
import { uploadDocumentsToCloudinary } from "@/server/cloudinarySetting";
import { getProductById } from "@/server/getProduct"; // Importa el servicio getProductById
import { useUserStore } from "@/store/useUserStore";

const FarmerCertificationsForm: React.FC<FarmerCertificationsFormProps> = ({
  onCancel,
  companyId,
  productId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICertificationsProps>();

  const { token } = useUserStore();
  const [previews, setPreviews] = useState<IPreviewState>({
    phytosanitary_certificate: null,
    agricultural_producer_cert: null,
    organic_certification: null,
    quality_certificate: null,
    certificate_of_origin: null,
  });
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Función para convertir una URL a un archivo tipo File
  const urlToFile = async (url: string, fileName: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };


  useEffect(() => {
    const fetchProductCertification = async () => {
      try {
        const product = await getProductById(companyId, productId);
        if (product && product.farmerCertification) {
          const certification = product.farmerCertification;

          // Convierte cada URL de certificado en un File y establece los valores en el formulario
          if (certification.phytosanitary_certificate) {
            const file = await urlToFile(certification.phytosanitary_certificate, "phytosanitary_certificate.pdf");
            setValue("phytosanitary_certificate", createFileList(file));
          }
          if (certification.agricultural_producer_cert) {
            const file = await urlToFile(certification.agricultural_producer_cert, "agricultural_producer_cert.pdf");
            setValue("agricultural_producer_cert", createFileList(file));
          }
          if (certification.organic_certification) {
            const file = await urlToFile(certification.organic_certification, "organic_certification.pdf");
            setValue("organic_certification", createFileList(file));
          }
          if (certification.quality_certificate) {
            const file = await urlToFile(certification.quality_certificate, "quality_certificate.pdf");
            setValue("quality_certificate", createFileList(file));
          }
          if (certification.certificate_of_origin) {
            const file = await urlToFile(certification.certificate_of_origin, "certificate_of_origin.pdf");
            setValue("certificate_of_origin", createFileList(file));
          }

          // Configura las previsualizaciones
          setPreviews({
            phytosanitary_certificate: { name: "Current file", size: "Existing" },
            agricultural_producer_cert: { name: "Current file", size: "Existing" },
            organic_certification: { name: "Current file", size: "Existing" },
            quality_certificate: { name: "Current file", size: "Existing" },
            certificate_of_origin: { name: "Current file", size: "Existing" },
          });
        }
      } catch (error) {
        console.error("Error fetching product certification:", error);
        Swal.fire({
          icon: "error",
          title: "Error loading certification",
          text: "Unable to load existing certification data.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductCertification();
  }, [companyId, productId, setValue]);

  // Crear un FileList desde un solo archivo
  const createFileList = (file: File): FileList => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
  };

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
      setSelectedFiles((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    }
  };

  const FileInput: React.FC<FileInputProps> = ({
    name,
    label,
    description,
    register,
    errors,
    handleFileChange,
    previews,
  }) => (
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <FileIcon className="text-gray-400" size={24} /> {/* Usa FileIcon aquí */}
      </div>

      <div className="relative">
        <input
          type="file"
          accept=".pdf"
          {...register(name, {
            validate: {
              isPDF: (files: FileList) =>
                !files?.[0] ||
                files[0].type === "application/pdf" ||
                "Only PDF files are allowed",
              maxSize: (files: FileList) =>
                !files?.[0] ||
                files[0].size <= 5000000 ||
                "File size must be less than 5MB",
            },
          })}
          onChange={(e) => handleFileChange(e, name)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
          {previews[name] ? (
            <div className="flex items-center justify-center space-x-2">
              <FileIcon size={20} className="text-blue-500" /> {/* Usa FileIcon aquí */}
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

  const onSubmit: SubmitHandler<ICertificationsProps> = async () => {
    if (!token) return;
    try {
      console.log("Files to upload:", selectedFiles);

      if (Object.keys(selectedFiles).length === 0) {
        console.error("No files selected for upload.");
        Swal.fire({
          icon: "warning",
          title: "No Files Selected",
          text: "Please select files to upload.",
        });
        return;
      }

      await uploadDocumentsToCloudinary(selectedFiles, companyId, productId, token);

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "Certificates have been uploaded successfully!",
      }).then(() => {
        onCancel();
      });
    } catch (error) {
      console.error("Error uploading certificates:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error uploading the certificates. Please try again.",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FileInput
          name="phytosanitary_certificate"
          label="Phytosanitary Certificate"
          description="Official document certifying the phytosanitary condition of plants or plant products"
          register={register}
          errors={errors}
          handleFileChange={handleFileChange}
          previews={previews}
        />
        <FileInput
          name="agricultural_producer_cert"
          label="Agricultural Producer Certificate"
          description="Documentation proving your status as a certified agricultural producer"
          register={register}
          errors={errors}
          handleFileChange={handleFileChange}
          previews={previews}
        />
        <FileInput
          name="organic_certification"
          label="Organic Certification"
          description="Certification verifying organic farming practices and standards"
          register={register}
          errors={errors}
          handleFileChange={handleFileChange}
          previews={previews}
        />
        <FileInput
          name="quality_certificate"
          label="Quality Certificate"
          description="Documentation of product quality standards and testing"
          register={register}
          errors={errors}
          handleFileChange={handleFileChange}
          previews={previews}
        />
        <FileInput
          name="certificate_of_origin"
          label="Certificate of Origin"
          description="Official document declaring the origin of your agricultural products"
          register={register}
          errors={errors}
          handleFileChange={handleFileChange}
          previews={previews}
        />

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-black text-black hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-black text-black hover:bg-gray-50 transition-colors"
          >
            Upload Certificates
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerCertificationsForm;
