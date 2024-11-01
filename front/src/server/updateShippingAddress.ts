import { ICompany, IShippingAddress } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const updateShippingAddress= async (company_id: string, updatedFields: Partial<IShippingAddress>, token: string) => {
    try {
      const response = await fetch(`${API_URL}/ShippingAddresses/${company_id}`, {
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
  