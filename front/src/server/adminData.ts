import { ICompany, IOrder, ISettingsUserProps } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCompanies = async (filters: Record<string, any>, token: string): Promise<ICompany[]> => {
  try {

    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const res = await fetch(`${API_URL}/companies?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener las compañías");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Error inesperado al obtener las compañías");
  }
};


export const getUsers = async (filters: Record<string, any>, token: string): Promise<ISettingsUserProps[]> => {
  try {

    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const res = await fetch(`${API_URL}/users?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Error inesperado al obtener los usuarios");
  }
};


export const getOrders = async (token: string): Promise<IOrder[]> => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener las órdenes");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Error inesperado al obtener las órdenes");
  }
};
