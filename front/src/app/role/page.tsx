"use client"
// app/role/page.tsx
import React from 'react';
import RoleUser from '@/components/RoleUser'; // Asegúrate de la ruta correcta
import { useRouter } from 'next/navigation'; // Para manejar la navegación
import { useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Para obtener la sesión

const Role = () => {
    const router = useRouter();
    const { data: session } = useSession(); // Obtener la sesión

    // Función para manejar la selección de roles
    const handleRoleSelected = (role: "supplier" | "buyer") => {
        console.log(`User selected role: ${role}`);
        
        // Aquí puedes manejar la lógica adicional, como guardar el rol en la base de datos.
        
        // Redirige a la siguiente página después de seleccionar el rol
        router.push('/'); // Cambia '/nextPage' a la ruta a la que quieras redirigir
    };


    return (
        <div>
            <h1>Select Your Role</h1>
            {session ? (
                <RoleUser onSelectRole={handleRoleSelected} /> // Pasar la función aquí
            ) : (
                <p>Please log in to select your role.</p>
            )}
        </div>
    );
};

export default Role;

