"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { IAuthWrapperProps } from "@/interface/types";
import { useAuthThirdStore } from "@/store/useAuthThirdStore"; // Importa correctamente tus funciones
import { logginAuthProps } from "@/helpers/loginHelpers";
import { useUserStore } from "@/store/useUserStore";

const AuthWrapper: React.FC<IAuthWrapperProps> = ({ children }) => {
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();
    const { clearAllSessions, resetInitialization } = useAuthThirdStore();
    const { setUserData } = useUserStore();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            if (sessionStatus === 'authenticated' && session?.user?.email && session?.user?.name) {
                // Preparar los datos para enviar al backend
                const googleData = {
                    email: session.user.email,
                    name: session.user.name,
                };

                // Enviar los datos al backend
                const response = await logginAuthProps(googleData);

                // Verificar si la respuesta es exitosa
                if (response && response.user_id && response.token && response.role_name) {
                    // Extraer los datos de la respuesta
                    const { user_id, token, role_name } = response;

                    // Actualizar el estado global del usuario
                    setUserData(user_id, token, role_name);

                    // Mostrar éxito en el login
                    await Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Google login successful",
                        width: 400,
                        padding: "3rem",
                    });

                    // Redirigir al home después del éxito en el login
                    router.push("/");

                } else {
                    // Mostrar mensaje de error si el login falla
                    await Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "You need to register first",
                        width: 400,
                        padding: "3rem",
                    });
                }

                // Destruir la sesión y limpiar todo, independientemente del éxito o error
                await clearAllSessions();  // Lógica personalizada para limpiar sesiones
                await signOut({ redirect: false });  // Destruir la sesión
                resetInitialization();  // Lógica personalizada para resetear cualquier estado
            }
        };

        // Ejecutar la lógica de login cuando la sesión esté autenticada
        if (sessionStatus === "authenticated") {
            handleGoogleLogin();
        }

    }, [session, sessionStatus, router, clearAllSessions, resetInitialization, setUserData, logginAuthProps]);

    return <>{children}</>;
};

export default AuthWrapper;
