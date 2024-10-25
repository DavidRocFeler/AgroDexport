// "use client"
// import React, { useState, useEffect } from "react";
// import { ISettingsCompanyProps, ISettingsUserProps } from "@/interface/types";
// import { getUserSettings } from "@/server/getUserSettings";
// import { updateUserSettings } from "@/server/updateUserSettings";
// import { useUserStore } from "@/store/useUserStore";

// const UserProfileForm = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState<ISettingsCompanyProps>({
//     company_name: "",
//     tax_identification_number: null,
//     address: "",
//     postal_code: "",
//     city: "",
//     state: "",
//     country: "",
//     industry: "",
//     website: "",
//     company_description: "",
//   });
//   const [originalData, setOriginalData] = useState<ISettingsUserProps>(userData); // Guardamos datos originales

//   const { user_id, token } = useUserStore();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (user_id) {
//           console.log("Obteniendo datos del usuario...");
//           const data = await getUserSettings(user_id);
//           setUserData(data);
//           setOriginalData(data); // Guardamos los datos originales
//           console.log("Datos del usuario obtenidos:", data);
//         } else {
//           alert("No se pudo obtener el ID del usuario.");
//         }
//       } catch (error: any) {
//         console.error("Error al cargar los datos:", error.message);
//       }
//     };

//     fetchData();
//   }, [user_id, token]); // Se ejecuta una vez cuando se carga el componente

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUserData({
//       ...userData,
//       [name]: name === "nDni" ? (value === "" ? null : Number(value)) : value,
//     });
//   };

//   const handleSave = async () => {
//     if (JSON.stringify(userData) === JSON.stringify(originalData)) {
//       alert("No hay cambios para guardar.");
//       setIsEditing(false);
//       return;
//     }
  
//     // Verifica si el token es nulo antes de continuar
//     if (!token) {
//       alert("No se encontró el token. Por favor, inicia sesión nuevamente.");
//       return; // Detén la ejecución si no hay token
//     }
  
//     const updatedFields: Partial<ISettingsUserProps> = {};
//     Object.keys(userData).forEach((key) => {
//       if (userData[key as keyof ISettingsUserProps] !== originalData[key as keyof ISettingsUserProps]) {
//         updatedFields[key as keyof ISettingsUserProps] = userData[key as keyof ISettingsUserProps];
//       }
//     });
  
//     console.log("Campos a actualizar:", updatedFields);
  
//     try {
//       if (user_id) {
//         await updateUserSettings(user_id, updatedFields, token); // Pasamos el token sin problema
//         setOriginalData(userData);
//         setIsEditing(false);
//         alert("Actualización exitosa");
//       } else {
//         alert("No se pudo obtener el ID del usuario.");
//       }
//     } catch (error: any) {
//       alert("Error al guardar");
//       console.error("Error al guardar:", error.message);
//     }
//   };

//   // Nueva función para activar el modo de edición
//   const handleEdit = () => {
//     setIsEditing(true); // Cambia a modo de edición
//   };

//   // Función para cancelar la edición
//   const handleCancel = () => {
//     setUserData(originalData); // Restauramos los datos originales
//     setIsEditing(false); // Salimos del modo de edición
//   };
  
//   return (
//     <div className="w-[100%] p-6 bg-white rounded-lg">
//       <form className="space-y-4 flex flex-col">
//         <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
//           Name
//           <input
//             className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
//             type="text"
//             name="user_name"
//             value={isEditing ? userData.user_name : ""}
//             placeholder={!isEditing ? userData.user_name : ""}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </label>

//         <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
//           Last name
//           <input
//             className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
//             type="text"
//             name="user_lastname"
//             value={isEditing ? userData.user_lastname : ""}
//             placeholder={!isEditing ? userData.user_lastname : ""}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </label>

//         <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
//           Document ID
//           <input
//             className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
//             type="text"
//             name="nDni"
//             value={isEditing ? userData.nDni || "" : ""}
//             placeholder={!isEditing ? String(userData.nDni || "") : ""}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </label>

//         <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
//           Birthday
//           <input
//             className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
//             type="text"
//             name="birthday"
//             value={isEditing ? userData.birthday : ""}
//             placeholder={!isEditing ? userData.birthday : ""}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </label>

//         <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
//           Phone
//           <input
//             className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
//             type="text"
//             name="phone"
//             value={isEditing ? userData.phone : ""}
//             placeholder={!isEditing ? userData.phone : ""}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </label>

//         <label className="flex flex-row items-center w-[100%] text-gray-700 font-medium">
//           Country
//           <input
//             className="ml-auto w-[70%] p-2 border border-gray-300 rounded-lg"
//             type="text"
//             name="country"
//             value={isEditing ? userData.country : ""}
//             placeholder={!isEditing ? userData.country : ""}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </label>

//         <div className="flex justify-between mt-4">
//           {isEditing ? (
//             <>
//               <button
//                 type="button"
//                 className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               type="button"
//               className="ml-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//               onClick={handleEdit}
//             >
//               Edit
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserProfileForm;

