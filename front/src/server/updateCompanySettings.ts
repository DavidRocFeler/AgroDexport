import { ICompany} from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const updateCompanySettings = async (companyid: string, updatedFields: Partial<ICompany>, token: string) => {
  try {
    const response = await fetch(`${API_URL}/companies/${companyid}`, {
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
      const errorMessage = errorResponse?.message || 'An error occurred while updating the company settings.';
      throw new Error(errorMessage);
    }

    return await response.json();  // Devuelve los datos si la solicitud fue exitosa
  } catch (error: any) {
    console.error("Error en la actualización de los datos del usuario:", error);
    throw error;  // Lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};

  