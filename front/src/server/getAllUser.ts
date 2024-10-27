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

//-----------------------

// server/getAllUser.ts
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const getAllUsers = async (): Promise<ISettingsUserProps[]> => {
//   try {
//     // Verifica que la URL se está construyendo correctamente
//     console.log("API URL:", `${API_URL}/users`);

//     const res = await fetch(`${API_URL}/users`, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//       },
//       // Agrega estas opciones para debugging
//       cache: "no-store",
//       next: { revalidate: 0 },
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data: ISettingsUserProps[] = await res.json();
//     return data;
//   } catch (error: any) {
//     console.error("Error en getAllUsers:", error);
//     throw new Error(error.message || "Error inesperado");
//   }
// };
