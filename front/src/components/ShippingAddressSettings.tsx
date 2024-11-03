"use client";
import React, { useState, useEffect } from "react";
import { IShippingAddress } from "@/interface/types"; // Asegúrate de que esta ruta sea correcta
import { getShippingAddressByCompany } from "@/server/getShippingAddressByCompany";
import { updateShippingAddress } from "@/server/updateShippingAddress";
import { useUserStore } from "@/store/useUserStore";
import Swal from "sweetalert2";
import { validateShippingAddress } from "@/helpers/validateShippingAddress";
import { getCompanyByUser } from "@/server/getCompanyByUser";
import { getCompanySettings } from "@/server/getCompanyById";
import { getShippingAddressSettings } from "@/server/getShippingAddress";

const ShippingAddressForm = () => {
  const initialState: IShippingAddress = {
    contact_name: "",
    contact_lastname: "",
    contact_email: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [shippingData, setShippingData] = useState<IShippingAddress>(initialState);
  const [originalData, setOriginalData] = useState<IShippingAddress>(shippingData);
  const { user_id, token } = useUserStore();
  const company_id = localStorage.getItem("company_id");
  const [shippingAddressId, setShippingAddressId] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchShippingAddressByCompanyId = async () => {
      if (company_id && token) {
        try {
          const data = await getShippingAddressSettings(company_id, token);

          // Actualiza el estado local en lugar de `localStorage`
          if (data.shipping_address_id) {
            setShippingAddressId(data.shipping_address_id);
          }
          setShippingData(data);
          setOriginalData(data);
          // Para debug
          console.log('Data structure:', JSON.stringify(data, null, 1));
        } catch (error) {
          console.error("Failed fetching shipping address", error);
        }
      }
    };

    fetchShippingAddressByCompanyId();
  }, [company_id, token]);

  useEffect(() => {
    if (shippingAddressId) {
      console.log("Shipping Address ID updated to:", shippingAddressId);
    }
  }, [shippingAddressId]);

 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShippingData({
      ...shippingData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (JSON.stringify(shippingData) === JSON.stringify(originalData)) {
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

    // const errors = validateShippingAddress(shippingData);
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

    try {
      if (shippingAddressId) {
        await updateShippingAddress(shippingAddressId, shippingData, token);
        setOriginalData(shippingData);
        setIsEditing(false);
        await Swal.fire({
          title: 'Success!',
          text: 'Your shipping address settings have been updated successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      } else {
        alert("The address ID could not be obtained.");
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: error.message,
      });
      console.error("Error saving:", error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setShippingData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="w-[100%] p-6 bg-white rounded-lg max-h-[20rem] overflow-y-auto">
      <form className="space-y-4 flex flex-col">
        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Contact Name
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="contact_name"
            value={isEditing ? shippingData.contact_name : ""}
            placeholder={isEditing ? "" : shippingData.contact_name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Contact Last Name
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="text"
            name="contact_lastname"
            value={isEditing ? shippingData.contact_lastname : ""}
            placeholder={isEditing ? "" : shippingData.contact_lastname}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Contact Email
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
            type="email"
            name="contact_email"
            value={isEditing ? shippingData.contact_email : ""}
            placeholder={isEditing ? "" : shippingData.contact_email}
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
            value={isEditing ? shippingData.address : ""}
            placeholder={isEditing ? "" : shippingData.address}
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
            value={isEditing ? shippingData.postal_code : ""}
            placeholder={isEditing ? "" : shippingData.postal_code}
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
            value={isEditing ? shippingData.city : ""}
            placeholder={isEditing ? "" : shippingData.city}
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
            value={isEditing ? shippingData.state : ""}
            placeholder={isEditing ? "" : shippingData.state}
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
            value={isEditing ? shippingData.country : ""}
            placeholder={isEditing ? "" : shippingData.country}
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

export default ShippingAddressForm;
