import { ISettingsUserProps } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserSettings = async (user_id: string, token: string): Promise<ISettingsUserProps> => {
    try {
        const res = await fetch(`${API_URL}/users/${user_id}`, {
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
