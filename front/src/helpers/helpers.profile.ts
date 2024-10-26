// import { useUserStore } from "../store/useUserStore";
// import { IUserData } from "@/interface/types";

// // Constante para la configuración
// const BASE_URL = "http://localhost:3002";

// export const updateUserProfile = async (
//   userData: IUserData
// ): Promise<IUserData> => {
//   // Obtener el ID del primer usuario del store
//   const users = useUserStore.getState().users;
//   const userId = users[0]?.id;

//   if (!userId) {
//     throw new Error("No se encontró ID de usuario");
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/users/${userId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         // Si necesitas incluir el token en las peticiones - ------------------------------????
//         Authorization: `Bearer ${useUserStore.getState().token}`,
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(
//         errorData.message || `Error ${response.status}: ${response.statusText}`
//       );
//     }

//     const data = await response.json();

//     if (!data) {
//       throw new Error("No se recibieron datos del servidor");
//     }

//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Error al actualizar el perfil: ${error.message}`);
//     }
//     throw new Error("Error inesperado al actualizar el perfil");
//   }
// };
