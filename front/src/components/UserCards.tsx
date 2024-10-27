// importar la interfaz de los usuarios
// importar interface ISettingsUserProps
//   user_name?: string;
//   user_lastname?: string;

//   phone?: string;
//   country?: string;

"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { ISettingsUserProps } from "@/interface/types";

interface UserCardProps extends ISettingsUserProps {
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  user_name,
  user_lastname,
  phone,
  country,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300 mx-4">
      <div className="flex items-center gap-4">
        {/* Avatar del usuario */}
        <div className="flex-shrink-0">
          <img
            src="/api/placeholder/120/120"
            alt={`${user_name} avatar`}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        {/* Información del usuario */}
        <div className="flex-grow">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h3 className="font-semibold text-gray-700">Name:</h3>
              <p className="text-gray-600">{user_name || "Not specified"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Last Name:</h3>
              <p className="text-gray-600">
                {user_lastname || "Not specified"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Phone:</h3>
              <p className="text-gray-600">{phone || "Not specified"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Country:</h3>
              <p className="text-gray-600">{country || "Not specified"}</p>
            </div>
          </div>
        </div>
        {/* Botón de eliminar */}
        <button
          onClick={() => onDelete(id)}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
          aria-label="Delete user"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
