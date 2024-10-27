// crear const user y hacer mapeo de todos los usuarios dentro del componente hijo userCard

// const users = getAllUserDB();
// a la hora de hacer el mapeo cambiar el id a un sstring

// ----Esta es la que va pero falta corregir error de token------------------------------------------------------------
//-----------------------------------------------------------------------------------
// "use client";
// import React, { useEffect, useState } from "react";
// // Ajusta la ruta según tu estructura
// import { ISettingsUserProps } from "@/interface/types";
// import { getAllUsers } from "@/server/getAllUser";
// import UserCard from "@/components/UserCards";

// const UserView: React.FC = () => {
//   const [users, setUsers] = useState<ISettingsUserProps[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const data = await getAllUsers();
//         setUsers(data);
//       } catch (error) {
//         setError(
//           error instanceof Error ? error.message : "Error al cargar usuarios"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = (id: string) => {
//     console.log(`Deleting user with id: ${id}`);
//     // Lógica adicional para eliminar el usuario
//   };

//   if (isLoading) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <p className="text-xl">Cargando usuarios...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <p className="text-xl text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 font-inter">
//       <h1 className="text-[96px] text-center mb-12 font-inter">Users List</h1>
//       <div
//         className={`${
//           users.length === 0
//             ? "border border-black w-full h-64 flex items-center justify-center"
//             : ""
//         }`}
//       >
//         {users.length === 0 ? (
//           <p className="text-gray-500">No hay usuarios registrados</p>
//         ) : (
//           users?.map((user) => (
//             <UserCard key={user.id} {...user} onDelete={handleDelete} />
//           ))
//         )}
//       </div>
//       <div className="mt-8 flex justify-center">
//         <button
//           onClick={() => (window.location.href = "/dashboard")}
//           className="font-inter border border-black px-4 py-2 hover:bg-gray-50 transition-colors"
//         >
//           Volver al Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserView;

//-------esta harcodea un array y funciona--------------------------------------------------
//---------------------------------------------------------
"use client";
import React from "react";
import UserCard from "@/components/UserCards";
import { ISettingsUserProps } from "@/interface/types";
import { usersData } from "@/helpers/usersData";

const UserView: React.FC = () => {
  const handleDelete = (id: string) => {
    console.log(`Deleting user with id: ${id}`);
    // The elimination logic would go here when you have the connection to the DB
  };

  return (
    <div className="container mx-auto py-8 font-inter">
      <h1 className="text-[96px] text-center mb-12 font-inter">Users List</h1>
      <div
        className={`${
          usersData.length === 0
            ? "border border-black w-full h-64 flex items-center justify-center"
            : ""
        }`}
      >
        {usersData.length === 0 ? (
          <p className="text-gray-500">No hay usuarios registrados</p>
        ) : (
          usersData.map((user) => (
            <UserCard key={user.id} {...user} onDelete={handleDelete} />
          ))
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="font-inter border border-black px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          Come back
        </button>
      </div>
    </div>
  );
};

export default UserView;
