import { ISettingsPasswordProps } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// updateUserSettings.ts

export const updatePasswordSettings = async (user_id: string, updatedFields: Partial<ISettingsPasswordProps>, token: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Incluye el token en el header
        },
        body: JSON.stringify(updatedFields),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar la configuración del usuario");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error en la actualización de los datos del usuario:", error);
      throw error;
    }
  };
  

  export const getPasswordSettings = async (user_id: string): Promise<ISettingsPasswordProps> => {
    try {
        const res = await fetch(`${API_URL}/users/${user_id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Error al obtener los datos del usuario");
        }

        return await res.json();
    } catch (error: any) {
        throw new Error(error.message || "Error inesperado");
    }
};
