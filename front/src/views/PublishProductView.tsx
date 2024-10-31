"use client";
import React from "react";
import FormPublishProduct from "../components/FormPublishProduct";
// import FarmerCertificationsForm from "@/components/FarmerCertificationsForm";

const PublishProductView: React.FC = () => {
  return (
    <div className="container mx-auto py-8 font-inter">
      <h1 className="text-[48px] md:text-[96px] text-center mb-12 font-inter">
        Publish Products
      </h1>
      <div className="border border-black max-w-3xl mx-auto p-8 ">
        <FormPublishProduct />
      </div>
    </div>
  );
};

export default PublishProductView;
