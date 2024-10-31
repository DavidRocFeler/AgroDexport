import { ICompany } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const updateCompanySettings = async (companyid: string, updatedFields: Partial<ICompany>, token: string) => {
    try {
      const response = await fetch(`${API_URL}/companies/${companyid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(updatedFields),
      });
  
      // if (!response.ok) {
      //   throw new Error("Error al actualizar la configuración del usuario");
      // }
  
      return await response.json();
    } catch (error) {
      console.error("Error en la actualización de los datos del usuario:", error);
      throw error;
    }
  };
  