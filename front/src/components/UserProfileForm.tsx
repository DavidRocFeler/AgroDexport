import { validateUserData } from "@/helpers/validateUserData";
import React, { useState } from "react";

const UserProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John",
    lastName: "Doe",
    country: "USA",
    birthdate: "1990-01-01",
    nDni: "123456789",
    phone: "+1234567890",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      validateUserData(userData);
      await updateUserProfile(userData);
      setIsEditing(false);
      // Opcional: Agregar mensaje de éxito
    } catch (error) {
      console.error("Error al guardar:", error.message);
      // Manejar el error (mostrar mensaje al usuario)
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form className="space-y-4">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
              type={key === "birthdate" ? "date" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        ))}

        <div className="flex justify-between mt-4">
          {isEditing ? (
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
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
