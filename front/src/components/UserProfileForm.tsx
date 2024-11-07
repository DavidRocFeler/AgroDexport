"use client"
import React, { useState, useEffect } from "react";
import { ISettingsUserProps } from "@/interface/types";
import { getUserSettings } from "@/server/getUserSettings";
import { updateUserSettings } from "@/server/updateUserSettings";
import { useUserStore } from "@/store/useUserStore";
import Swal from "sweetalert2";
import { validateUserSettings } from "@/helpers/validateUserSettings";
import 'react-datepicker/dist/react-datepicker.css';

const UserProfileForm = () => {
  const initialState: ISettingsUserProps = {
    user_id: "",
    user_name: "",
    user_lastname: "",
    nDni: null,
    birthday: "",
    phone: "",
    country: "",
  } 

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState<Partial<Record<keyof ISettingsUserProps, string>>>({});
  const [originalData, setOriginalData] = useState<ISettingsUserProps>(userData);
  const [resetFlag, setResetFlag] = useState(false); 
  const { user_id, token } = useUserStore();


  useEffect(() => {
    const fetchUserSettings = async () => {
      if (user_id && token) {
        try {
          const data = await getUserSettings(user_id, token);
          setUserData(data);
          setOriginalData(data); // Establecer originalData cuando se obtienen los datos
        } catch (error) {
          console.error('failed to update notifications:', error);
        }
      }
    };

    fetchUserSettings();
  }, [user_id, token, resetFlag]); // Agregar resetFlag para reiniciar

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: name === "nDni" ? (value === "" ? null : Number(value)) : value,
    });
  };

  const handleSave = async () => {
    if (JSON.stringify(userData) === JSON.stringify(originalData)) {
      Swal.fire({
        title: 'No changes to save',
        text: 'There are no changes to save.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      setIsEditing(false);
      return;
    }

    if (!token) {
      return;
    }

    const errors = validateUserSettings(userData);
    if (Object.keys(errors).length > 0) {
      // Encontrar el primer error
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
    
    const updatedFields: Partial<ISettingsUserProps> = {};
    Object.keys(userData).forEach((key) => {
      if (userData[key as keyof ISettingsUserProps] !== originalData[key as keyof ISettingsUserProps]) {
        updatedFields[key as keyof ISettingsUserProps] = userData[key as keyof ISettingsUserProps];
      }
    });

    // console.log("Field update:", updatedFields);

    try {
      if (user_id) {
        await updateUserSettings(user_id, updatedFields, token); 
        setOriginalData(userData);
        setIsEditing(false);
        await Swal.fire({
          title: 'Success!',
          text: 'Your settings have been updated successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      } else {
        alert("The user's ID could not be obtained.");
      }
    } catch (error: any) {
      console.error("Error saving:", error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); 
  };

  const handleCancel = () => {
    setResetFlag(prev => !prev);
    setIsEditing(false); 
  };

  useEffect(() => {
    const newErrors = validateUserSettings(userData);
    setError(newErrors)
  }, [userData])

  return (
    <div className="w-[100%] p-6 bg-white rounded-lg">
      <form className="space-y-4 flex flex-col">
      <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
  Name
  <input
    className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
    type="text"
    name="user_name"
    value={isEditing ? userData.user_name : ""}
    placeholder={!isEditing ? userData.user_name : ""}
    onChange={(e) => {
      const { value } = e.target;
      // Permite solo letras y espacios, entre 3 y 50 caracteres
      if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{0,50}$/.test(value)) {
        handleChange(e); // Llama a la función original si cumple las condiciones
      }
    }}
    maxLength={50} // Limita la longitud a 50 caracteres
    disabled={!isEditing}
  />
</label>

<label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
  Last name
  <input
    className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
    type="text"
    name="user_lastname"
    value={isEditing ? userData.user_lastname : ""}
    placeholder={!isEditing ? userData.user_lastname : ""}
    onChange={(e) => {
      const { value } = e.target;
      // Permite solo letras y espacios, entre 3 y 50 caracteres
      if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{0,50}$/.test(value)) {
        handleChange(e); // Llama a la función original si cumple las condiciones
      }
    }}
    maxLength={50} // Limita la longitud a 50 caracteres
    disabled={!isEditing}
  />
</label>


        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
  Document ID
  <input
    className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
    type="text"
    name="nDni"
    value={isEditing ? userData.nDni || "" : ""}
    placeholder={!isEditing ? String(userData.nDni || "") : ""}
    onChange={(e) => {
      const { value } = e.target;
      if (/^\d*$/.test(value) && value.length <= 15) {
        handleChange(e); 
      }
    }}
    maxLength={15}
    disabled={!isEditing}
  />
</label>


        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
  Birthday
  <input
    type="text"
    name="birthday"
    value={isEditing ? userData.birthday : ""}
    placeholder={!isEditing ? String(userData.birthday || "yyyy-mm-dd") : "yyyy-mm-dd"}
    onChange={(e) => {
      const value = e.target.value;
      const regex = /^\d{0,4}-?\d{0,2}-?\d{0,2}$/; // Permite progresivamente el formato yyyy-mm-dd

      if (regex.test(value)) {
        handleChange(e); // Solo permite la actualización si coincide con el patrón
      }
    }}
    pattern="\d{4}-\d{2}-\d{2}"
    title="Date must be in the format yyyy-mm-dd"
    disabled={!isEditing}
    className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
  />
</label>


        <style jsx>{`
          input[type="date"] {
              color: #888; /* Cambia esto al color que desees que sea similar al del placeholder */
          }

          input[type="date"]::-webkit-inner-spin-button,
          input[type="date"]::-webkit-calendar-picker-indicator {
              display: none; /* Esto oculta los elementos de selector nativos */
          }
    `   }</style>

<label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
  Phone
  <input
    className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
    type="text"
    name="phone"
    value={isEditing ? userData.phone || "" : ""} 
    placeholder={!isEditing ? userData.phone : "+2334455676"} 
    maxLength={16} 
    disabled={!isEditing}
    onChange={(e) => {
      const { value } = e.target; 


      if (/^[+\d]*$/.test(value)) {
        handleChange({
          ...e,
          target: {
            ...e.target,
            name: "phone",
            value,
          },
        });
      }
    }}
  />
</label>





<label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
  Country
  <input
    className="ml-auto w-[70%] p-2 border border-gray-300 rounded-[2px]"
    type="text"
    name="country"
    value={isEditing ? userData.country : ""}
    placeholder={!isEditing ? userData.country : ""}
    onChange={(e) => {
      const { value } = e.target;

      if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{0,60}$/.test(value)) {
        handleChange(e); 
      }
    }}
    maxLength={60} 
    disabled={!isEditing}
  />
  {userData.country && error.country && (
    <p>{error.country}</p>
  )}
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

export default UserProfileForm;

