"use client"
import React, { useState } from "react";
import { ISettingsPasswordProps } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";
import { updatePasswordSettings } from "@/server/updatePasswordSettings";
import Swal from "sweetalert2";

const PasswordProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<ISettingsPasswordProps>({
    password: "",
    confirm_password: ""
  });

  const { user_id, token } = useUserStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    // Validar que los campos no estén vacíos
    if (!userData.password || !userData.confirm_password) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in both password fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Validar que las contraseñas coincidan
    if (userData.password !== userData.confirm_password) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!token) {
      return;
    }

    try {
      if (user_id) {
        await updatePasswordSettings(user_id, userData, token);
        setIsEditing(false);
        setUserData({ password: "", confirm_password: "" }); // Restablecer los campos a vacío tras guardar
        await Swal.fire({
          title: 'Success!',
          text: 'Your password has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        alert("The user's ID could not be obtained.");
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'warning',
        title: 'Error saving',
        text: 'Try again later',
      });
      console.error("Error saving:", error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserData({ password: "", confirm_password: "" }); // Restablecer campos al cancelar
  };

  return (
    <div className="w-[100%] p-6 rounded-lg h-[100%] relative">
      <form className="space-y-4 flex flex-col ">
        <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
          Password
          <input
            className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
            type="password"
            name="password"
            value={isEditing ? userData.password : "*******"}
            placeholder={!isEditing ? "*******" : ""}
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
            value={isEditing ? userData.confirm_password : "*******"}
            placeholder={!isEditing ? "*******" : ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <div className="flex justify-between mt-4 absolute bottom-[1.6rem] right-[1.6rem]">
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

