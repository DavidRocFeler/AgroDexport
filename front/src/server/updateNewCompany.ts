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
  
      return await response.json();
    } catch (error) {
      console.error("Error en la actualización de los datos del usuario:", error);
      throw error;
    }
  };
  