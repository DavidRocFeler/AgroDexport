"use client";
import React, { useState, useEffect } from "react";
import { ICompany } from "@/interface/types"; // Asegúrate de importar la interfaz correcta
import { getCompanySettings } from "@/server/getCompanyById";
import { updateCompanySettings } from "@/server/updateCompanySettings";
import { useUserStore } from "@/store/useUserStore";
import Swal from "sweetalert2";
import { validateCompanySettings } from "@/helpers/validateCompanySettings";

const CompanyForms = () => {
  const initialState: ICompany = {
    company_id: "",
    company_name: "",
    tax_identification_number: undefined,
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
    industry: "",
    website: "",
    account_paypal: "",
    company_description: "",
    company_logo: "",
    isActive: true,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState<ICompany>(initialState);
  const [originalData, setOriginalData] = useState<ICompany>(companyData);
  const { user_id, token } = useUserStore();
  const company_id = localStorage.getItem("company_id");

  useEffect(() => {
    const fetchCompanySettings = async () => {
      if (company_id && token) {
        try {
          const data = await getCompanySettings(company_id, token);
          setCompanyData(data);
          setOriginalData(data);
        } catch (error) {
          console.error('Error fetching company settings:', error);
        }
      }
    };

    fetchCompanySettings();
  }, [user_id, token]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (JSON.stringify(companyData) === JSON.stringify(originalData)) {
      Swal.fire({
        title: 'No changes to save',
        text: 'There are no changes to save.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      setIsEditing(false);
      return;
    }

    if (!token) {
      return;
    }

    const errors = validateCompanySettings(companyData);
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const firstErrorMessage = errors[firstErrorField as keyof typeof errors];

      if (firstErrorMessage) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: `${firstErrorMessage}`,
        });
      }
      return;
    }

    try {
      if (company_id) {
        await updateCompanySettings(company_id, companyData, token);
        setOriginalData(companyData);
        setIsEditing(false);
        await Swal.fire({
          title: 'Success!',
          text: 'Your company settings have been updated successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      } else {
        alert("The company's ID could not be obtained.");
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: error,
      });
      console.error("Error saving:", error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setCompanyData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="w-[100%] p-6 bg-white rounded-lg max-h-[20rem] overflow-y-auto">
      <form className="space-y-4 flex flex-col">
        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Company Name
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="company_name"
            value={isEditing ? companyData.company_name : ""}
            placeholder={isEditing ? "" : companyData.company_name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Tax Identification Number
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="tax_identification_number"
            value={isEditing ? companyData.tax_identification_number || "" : ""}
            placeholder={!isEditing ? String(companyData.tax_identification_number || "") : ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Address
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="address"
            value={isEditing ? companyData.address : ""}
            placeholder={isEditing ? "" : companyData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Postal Code
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="postal_code"
            value={isEditing ? companyData.postal_code : ""}
            placeholder={isEditing ? "" : companyData.postal_code}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          City
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="city"
            value={isEditing ? companyData.city : ""}
            placeholder={isEditing ? "" : companyData.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          State
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="state"
            value={isEditing ? companyData.state : ""}
            placeholder={isEditing ? "" : companyData.state}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Country
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="country"
            value={isEditing ? companyData.country : ""}
            placeholder={isEditing ? "" : companyData.country}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Industry
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="industry"
            value={isEditing ? companyData.industry : ""}
            placeholder={isEditing ? "" : companyData.industry}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Website
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="website"
            value={isEditing ? companyData.website : ""}
            placeholder={isEditing ? "" : companyData.website}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          PayPal Account
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="account_paypal"
            value={isEditing ? companyData.account_paypal : ""}
            placeholder={isEditing ? "" : companyData.account_paypal}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Company Description
          <textarea
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            name="company_description"
            value={isEditing ? companyData.company_description : ""}
            placeholder={isEditing ? "" : companyData.company_description}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <div className="flex justify-between mt-4">
          {isEditing ? (
            <>
              <button
                type="button"
                className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="ml-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
</form>
    </div>
  );  
};

export default CompanyForms;
