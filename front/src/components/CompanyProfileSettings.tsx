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
    tax_identification_number: null,
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
  const { token } = useUserStore();
  const [companyId, setCompanyId] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchCompanySettings = async () => {
      const currentCompanyId = localStorage.getItem("company_id");
      if (currentCompanyId && token) {
        if (currentCompanyId !== companyId) {
          setCompanyId(currentCompanyId);
          try {
            const data = await getCompanySettings(currentCompanyId, token);
            setCompanyData(data);
            setOriginalData(data);
          } catch (error) {
            console.error('Error fetching company settings:', error);
          }
        }
      }
    };
  
    const interval = setInterval(fetchCompanySettings, 1000); // Comprueba cada segundo
    fetchCompanySettings(); // Ejecuta inmediatamente al montar
  
    return () => clearInterval(interval);
  }, [token, companyId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const company_id = localStorage.getItem("company_id");
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

    // const errors = validateCompanySettings(companyData);
    // if (Object.keys(errors).length > 0) {
    //   const firstErrorField = Object.keys(errors)[0];
    //   const firstErrorMessage = errors[firstErrorField as keyof typeof errors];

    //   if (firstErrorMessage) {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'Validation Error',
    //       text: `${firstErrorMessage}`,
    //     });
    //   }
    //   return;
    // }

    // const updatedFields: Partial<ICompany> = {};
    // Object.keys(companyData).forEach((key) => {
    //   if (companyData[key as keyof ICompany] !== originalData[key as keyof ICompany]) {
    //     updatedFields[key as keyof ICompany] = companyData[key as keyof ICompany];
    //   }
    // });

    const updatedFields: Partial<ICompany> = {};
    Object.keys(companyData).forEach((key) => {
      if (companyData[key as keyof ICompany] !== originalData[key as keyof ICompany]) {
        // Convertir tax_identification_number a número si es necesario
        if (key === 'tax_identification_number' && typeof companyData[key] === 'string') {
          updatedFields[key as keyof ICompany] = Number(companyData[key]);
        } else {
          updatedFields[key as keyof ICompany] = companyData[key as keyof ICompany];
        }
      }
    });

    try {
      if (company_id) {
        
        // console.log("Datos a enviar al backend:", {
        //   company_id,
        //   companyData,
        // });
        await updateCompanySettings(company_id, updatedFields, token);
      
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
        text: error.message || 'An unexpected error occurred.',
      });
      console.error(error);
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
                className="ml-auto bg-[#5c8b1b] text-white py-2 px-4 rounded hover:bg-[#6ea520]"
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
              className="ml-auto bg-[#5c8b1b] text-white py-2 px-4 rounded hover:bg-[#6ea520]"
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
