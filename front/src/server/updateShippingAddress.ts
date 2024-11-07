import { IShippingAddress } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const updateShippingAddress = async (id: string, updatedFields: Partial<IShippingAddress>, token: string) => {
  try {
    const response = await fetch(`${API_URL}/ShippingAddresses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFields),
    });

    // Si la respuesta no es exitosa (status no en el rango 2xx)
    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse?.message || 'An error occurred while updating the shipping address.';
      throw new Error(errorMessage); // Lanza un error con el mensaje del backend
    }

    return await response.json();  // Devuelve los datos si la solicitud fue exitosa
  } catch (error: any) {
    console.error("Error en la actualización de la dirección de envío:", error);
    throw error;  // Lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};
  