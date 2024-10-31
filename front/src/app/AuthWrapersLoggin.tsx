"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { logginAuthProps } from "@/server/loginHelpers";
import { IAuthWrapperProps } from "@/interface/types";
import { useAuthThirdStore } from "@/store/useAuthThirdStore";
import { useUserStore } from "@/store/useUserStore";
import { useSessionStore } from "@/store/useSessionStore"; // Importa el store para la sesión de Google

const AuthWrapperLoggin: React.FC<IAuthWrapperProps> = ({ children }) => {
    const router = useRouter();
    const { clearAllSessions, resetInitialization } = useAuthThirdStore();
    const { setUserData } = useUserStore();
    const { authSession, setAuthSession, clearAuthSession } = useSessionStore(); // Estado global para la sesión de Google
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Lógica de login usando los datos desde el estado global
    useEffect(() => {
        const handleGoogleLogin = async () => {
            if (authSession && !isLoggedIn) {
                try {
                    // Enviar los datos del estado global al backend
                    const response = await logginAuthProps(authSession);
                    setIsLoggedIn(true);

                    // Mostrar éxito en el login
                    await Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Google login successful",
                        width: 400,
                        padding: "3rem",
                        customClass: {
                            popup: "custom-swal-popup",
                        },
                    });

                    // Verificar si la respuesta es exitosa
                    if (response && response.user_id && response.token && response.role_name) {
                        const { user_id, token, role_name } = response;
                        setUserData(user_id, token, role_name);
                    } else {
                        await Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "You need to register first",
                            width: 400,
                            padding: "3rem",
                            customClass: {
                                popup: "custom-swal-popup",
                            },
                        });
                    }
                } catch (error) {
                    console.error("Error en el login:", error);
                } finally {
                    clearAuthSession();
                    resetInitialization();
                    router.push("/");
                }
            }
        };

        // Ejecutar la lógica de login solo si tenemos datos en el estado global
        if (authSession && !isLoggedIn) {
            handleGoogleLogin();
        }
    }, [authSession, router, clearAllSessions, resetInitialization, setUserData, isLoggedIn]);

    return <>{children}</>;
};

export default AuthWrapperLoggin;
