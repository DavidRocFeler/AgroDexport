"use client"
import React, { useEffect, useState } from "react";
import { ICompany } from "@/interface/types";
import 'react-datepicker/dist/react-datepicker.css';

const ProfileClientForm = () => {
  const [profileCompanyClient, setProfileCompanyClient] = useState<ICompany | null>(null);

  useEffect(() => {
    // Obtener el ítem de localStorage y parsearlo
    const storedProfile = localStorage.getItem("profileCompanyClient");
    if (storedProfile) {
      setProfileCompanyClient(JSON.parse(storedProfile));
    }
  }, []);

  if (!profileCompanyClient) {
    return <div>Loading...</div>; // Mostrar un mensaje mientras se carga
  }

  return (
    <div className="w-[100%] p-6 pt-[4rem] pb-[4rem] bg-white rounded-lg">
      <form className="space-y-4 flex flex-col">
        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Company Name
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="company_name"
            value={profileCompanyClient.company_name || ""}
            placeholder={profileCompanyClient.company_name || "Enter company name"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Tax Identification Number
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="tax_identification_number"
            value={profileCompanyClient.tax_identification_number || ""}
            placeholder={String(profileCompanyClient.tax_identification_number || "Enter tax ID")}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Address
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="address"
            value={profileCompanyClient.address || ""}
            placeholder={profileCompanyClient.address || "Enter address"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Postal Code
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="postal_code"
            value={profileCompanyClient.postal_code || ""}
            placeholder={profileCompanyClient.postal_code || "Enter postal code"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          City
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="city"
            value={profileCompanyClient.city || ""}
            placeholder={profileCompanyClient.city || "Enter city"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          State
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="state"
            value={profileCompanyClient.state || ""}
            placeholder={profileCompanyClient.state || "Enter state"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Country
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="country"
            value={profileCompanyClient.country || ""}
            placeholder={profileCompanyClient.country || "Enter country"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Industry
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="industry"
            value={profileCompanyClient.industry || ""}
            placeholder={profileCompanyClient.industry || "Enter industry"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Website
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="website"
            value={profileCompanyClient.website || ""}
            placeholder={profileCompanyClient.website || "Enter website URL"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          PayPal Account
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="account_paypal"
            value={profileCompanyClient.account_paypal || ""}
            placeholder={profileCompanyClient.account_paypal || "Enter PayPal account"}
            disabled
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Company Description
          <textarea
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            name="company_description"
            value={profileCompanyClient.company_description || ""}
            placeholder={profileCompanyClient.company_description || "Enter company description"}
            disabled
          />
        </label>
      </form>
    </div>
  );
};

export default ProfileClientForm;


