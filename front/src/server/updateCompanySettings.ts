import { ICompany} from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const updateCompanySettings = async (companyid: string, updatedFields: Partial<ICompany>, token: string) => {
  console.log("respuesta de los campos parciales ", updatedFields)
    try {
      const response = await fetch(`${API_URL}/companies/${companyid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(updatedFields),
      });
      console.log(response)
      return await response.json();
    } catch (error) {
      console.error("Error en la actualización de los datos del usuario:", error);
      throw error;
    }
  };
  