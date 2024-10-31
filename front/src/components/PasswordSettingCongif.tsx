"use client"
import React, { useState, useEffect } from "react";
import { ISettingsPasswordProps } from "@/interface/types";
import { updateUserSettings } from "@/server/updateUserSettings";
import { useUserStore } from "@/store/useUserStore";
import { getPasswordSettings } from "@/server/updatePasswordSettings";

const PasswordProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<ISettingsPasswordProps>({
    password: "",
    confirm_password: "",
  });
  const [originalData, setOriginalData] = useState<ISettingsPasswordProps>(userData); // Guardamos datos originales

  const { user_id, token } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user_id) {
          console.log("Obteniendo datos del usuario...");
          const data = await getPasswordSettings(user_id);
          setUserData(data);
          setOriginalData(data); // Guardamos los datos originales
          console.log("Datos del usuario obtenidos:", data);
        } else {
          alert("No se pudo obtener el ID del usuario.");
        }
      } catch (error: any) {
        console.error("Error al cargar los datos:", error.message);
      }
    };

    fetchData();
  }, [user_id, token]); // Se ejecuta una vez cuando se carga el componente

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = async () => {
    if (JSON.stringify(userData) === JSON.stringify(originalData)) {
      alert("No hay cambios para guardar.");
      setIsEditing(false);
      return;
    }
  
    // Verifica si el token es nulo antes de continuar
    if (!token) {
      alert("No se encontró el token. Por favor, inicia sesión nuevamente.");
      return; // Detén la ejecución si no hay token
    }
  
    const updatedFields: Partial<ISettingsPasswordProps> = {};
        (Object.keys(userData) as (keyof ISettingsPasswordProps)[]).forEach((key) => {
        const newValue = userData[key];
        const originalValue = originalData[key];

        // Asegúrate de que los valores sean cadenas antes de asignarlos a updatedFields
        if (newValue !== originalValue && typeof newValue === "string") {
            updatedFields[key] = newValue; // Asigna solo si es una cadena
        }
        });

  
    console.log("Campos a actualizar:", updatedFields);
  
    try {
      if (user_id) {
        await updateUserSettings(user_id, updatedFields, token); // Pasamos el token sin problema
        setOriginalData(userData);
        setIsEditing(false);
        alert("Actualización exitosa");
      } else {
        alert("No se pudo obtener el ID del usuario.");
      }
    } catch (error: any) {
      alert("Error al guardar");
      console.error("Error al guardar:", error.message);
    }
  };

  // Nueva función para activar el modo de edición
  const handleEdit = () => {
    setIsEditing(true); // Cambia a modo de edición
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setUserData(originalData); // Restauramos los datos originales
    setIsEditing(false); // Salimos del modo de edición
  };
  
  return (
    <div className="w-[100%] p-6 bg-white rounded-lg">
      <form className="space-y-4 flex flex-col">
        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Password
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
            type="password"
            name="password"
            value={isEditing ? userData.password : ""}
            placeholder={!isEditing ? userData.password : ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Confirm password
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
            type="password"
            name="confirm_password"
            value={isEditing ? userData.confirm_password : ""}
            placeholder={!isEditing ? userData.confirm_password : ""}
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

export default PasswordProfileForm;

