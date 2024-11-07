"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { logginAuthProps } from "@/server/loginHelpers";
import { IAuthWrapperProps, ILoginAuth } from "@/interface/types"; 
import { useAuthThirdStore } from "@/store/useAuthThirdStore";
import { useUserStore } from "@/store/useUserStore";
import { useSessionStore } from "@/store/useSessionStore";

const AuthWrapperLoggin: React.FC<IAuthWrapperProps> = ({ children }) => {
    const router = useRouter();
    const { clearAllSessions, resetInitialization } = useAuthThirdStore();
    const { setUserData } = useUserStore();
    const { authSession, clearAuthSession } = useSessionStore();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    const handleGoogleLogin = async () => {
        if (authSession && !hasLoggedIn) {  // Verifica que authSession no sea null y que no se haya hecho login
            try {
                const response = await logginAuthProps(authSession as ILoginAuth);
                
                setIsLoggedIn(true);
                
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
    
                if (response && response.user_id && response.token && response.role_name) {
                    const { user_id, token, role_name } = response;
                    setUserData(user_id, token, role_name);
                }
                
                setHasLoggedIn(true); // Marcar como ya logueado
    
                // Limpiar solo después de que todo esté correcto
                clearAuthSession();
                clearAllSessions();
                resetInitialization();
                router.push("/");
            } catch (error: any) {
                await Swal.fire({
                    icon: "error",
                    title: "Login Error",
                    text: error.message || "An error occurred during login.",
                    width: 400,
                    padding: "3rem",
                    customClass: {
                        popup: "custom-swal-popup",
                    },
                });
                console.error("Error en el login:", error.message);
            } finally {
                // Ya no es necesario limpiar antes de la redirección o proceso final
                if (!isLoggedIn) {
                    clearAuthSession();
                    clearAllSessions();
                    resetInitialization();
                }
            }
        }
    };

    const handleLoginError = async (error: any) => {
        await Swal.fire({
            icon: "error",
            title: "Login Error",
            text: error.message || "An error occurred during login.",
            width: 400,
            padding: "3rem",
            customClass: {
                popup: "custom-swal-popup",
            },
        });
        console.error("Error en el login:", error.message);
    };

    useEffect(() => {
        // Ejecutar la lógica de login solo si tenemos datos en el estado global y aún no se ha hecho login
        if (authSession && !hasLoggedIn) {
            handleGoogleLogin();
            setHasLoggedIn(true); // Marcar que ya se intentó el login
        }
    }, [authSession, hasLoggedIn]);

    return <>{children}</>;
};

export default AuthWrapperLoggin;
