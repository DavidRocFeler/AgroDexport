import { IShippingAddress } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const newShippingAddress = async (updatedFields: Partial<IShippingAddress>, token: string) => {
    try {
      const response = await fetch(`${API_URL}/ShippingAddresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(updatedFields),
      });
  
      const data = await response.json();
      console.log("Data de la dirección de envío:", data); // <-- Aquí
      return data;
    } catch (error) {
      console.error("Error en la actualización de los datos del usuario:", error);
      throw error;
    }
  };
  
  