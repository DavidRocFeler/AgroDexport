import { IOrderHistory } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
export const getOrderByCompany = async (company_id: string, token: string): Promise<IOrderHistory[]> => {
    try {
        const res = await fetch(`${API_URL}/orders/companies/${company_id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Error al obtener los datos de la ordernes");
        }

        return await res.json();
    } catch (error: any) {
        throw new Error(error.message || "Error inesperado");
    }
};
