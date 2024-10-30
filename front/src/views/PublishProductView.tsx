"use client";
import React, { useState } from "react";
import FormPublishProduct from "../components/FormPublishProduct";
import FarmerCertificationsForm from "@/components/FarmerCertificationsForm";

const PublishProductView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<"product" | "certifications">(
    "product"
  );
  const [productData, setProductData] = useState<any>(null);

  const handleProductSubmit = (data: any) => {
    setProductData(data);
    setCurrentStep("certifications");
  };

  const handleBack = () => {
    setCurrentStep("product");
  };

  const handleCertificationsSubmit = async (formData: FormData) => {
    try {
      console.log("Enviando datos completos:", formData);
      //  redirect user
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 font-inter">
      <h1 className="text-[48px] md:text-[80px] text-center mb-12 font-inter">
        Publish New Products
      </h1>
      <div className="border border-black max-w-3xl mx-auto p-8">
        {currentStep === "product" ? (
          <FormPublishProduct onSubmit={handleProductSubmit} />
        ) : (
          <>
            <h1 className="text-[48px] md:text-[80px] text-center mb-12 font-inter">
              Certifications Form
            </h1>
            <div className="border border-black max-w-3xl mx-auto p-8">
              <FarmerCertificationsForm
                onBack={handleBack}
                productData={productData}
                onCertificationsSubmit={handleCertificationsSubmit}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PublishProductView;
