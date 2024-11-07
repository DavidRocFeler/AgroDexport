import { ICompany } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const updateNewCompany = async (updatedFields: Partial<ICompany>, token: string) => {
  try {
      const response = await fetch(`${API_URL}/companies`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify(updatedFields),
      });

      // Verifica si la respuesta no es correcta (error)
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create the company");
      }

      return await response.json(); // si todo está bien, retorna los datos
  } catch (error) {
      console.error("Error en la actualización de los datos del usuario:", error);
      throw error;
  }
};
