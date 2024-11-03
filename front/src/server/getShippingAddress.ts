import { ICompany, IShippingAddress } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getShippingAddressSettings = async (company_id: string, token: string): Promise<IShippingAddress> => {
    try {
        const res = await fetch(`${API_URL}/ShippingAddresses/address/${company_id}`, {
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
