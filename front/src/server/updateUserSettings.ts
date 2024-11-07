import { ISettingsUserProps } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const updateUserSettings = async (user_id: string, updatedFields: Partial<ISettingsUserProps>, token: string) => {
  try {
      const response = await fetch(`${API_URL}/users/${user_id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFields),
      });

      // Check if the response is not okay
      if (!response.ok) {
          const errorData = await response.json(); // Get the error details from the response body
          throw new Error(errorData.message || "Error al actualizar la configuración del usuario"); // Use the message from backend, or a default message
      }

      return await response.json();
  } catch (error) {
      console.error("Error en la actualización de los datos del usuario:", error);
      throw error; // Rethrow the error to propagate it further
  }
};

  
