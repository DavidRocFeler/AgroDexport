import { ICompany, IProductDetails } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCompanySettings = async (company_id: string, token: string): Promise<ICompany> => {
    try {
        const res = await fetch(`${API_URL}/companies/${company_id}`, {
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



    export const getProductDetails = async (orderDetailId: string, token: string): Promise<IProductDetails> => {
    const response = await fetch(`${API_URL}/orders/companies/order/${orderDetailId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching product details');
    }

    const data: IProductDetails = await response.json();
    return data;
};
