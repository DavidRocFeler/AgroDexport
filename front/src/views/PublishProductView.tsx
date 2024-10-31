"use client";
import React, { useState } from "react";
import FormPublishProduct from "@/components/FormPublishProduct";
import FarmerCertificationsForm from "@/components/FarmerCertificationsForm";

const PublishProductView: React.FC = () => {
  const [showCertifications, setShowCertifications] = useState(false);

  const handleUpdateClick = () => {
    setShowCertifications(true);
  };

  const handleCancel = () => {
    setShowCertifications(false);
  };

  return (
    <div className="container mx-auto py-8 font-inter">
      <h1 className="text-[48px] md:text-[96px] text-center mb-12 font-inter">
        Publish Products
      </h1>
      {!showCertifications ? (
        <div className="border border-black max-w-3xl mx-auto p-8">
          <FormPublishProduct onUpdateClick={handleUpdateClick} />
        </div>
      ) : (
        <div className="border border-black max-w-3xl mx-auto p-8">
          <FarmerCertificationsForm onCancel={handleCancel} />
        </div>
      )}
    </div>
  );
};

export default PublishProductView;
