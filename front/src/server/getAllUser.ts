// Este archivo tiene que crear la logica para hacer un get a todos los usuarios.
//Ir a swager para verificar la ruta a get a todos los usuarios.
// const APIURL = process.env.NEXT_PUBLIC_API_URL

import { ISettingsUserProps } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (): Promise<ISettingsUserProps[]> => {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener los datos de los usuarios");
    }

    const data: ISettingsUserProps[] = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error inesperado");
  }
};
