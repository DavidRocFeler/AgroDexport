import { ICompany } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCompanyByUser = async (user_id: string, token: string): Promise<ICompany[]> => {
    try {
        const res = await fetch(`${API_URL}/companies/user/${user_id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Error al obtener los datos del usuario");
        }

        return await res.json();
    } catch (error: any) {
        throw new Error(error.message || "Error inesperado");
    }
};
