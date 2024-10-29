"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useAuthThirdStore } from "@/store/useAuthThirdStore";
import { IAuthWrapperProps } from "@/interface/types";
import { useSessionStore } from "@/store/useSessionStore";

const GoogleWrapper: React.FC<IAuthWrapperProps> = ({ children }) => {
    const { 
        createGoogleSession, 
        setSessionSent,
    } = useAuthThirdStore();
    const { data: session, status: sessionStatus } = useSession();
    const { setAuthSession } = useSessionStore(); 
    const [isGoogleSessionCreated, setIsGoogleSessionCreated] = useState(false); // Estado para controlar si la sesión de Google fue creada

    useEffect(() => {
        if (sessionStatus === "authenticated" && session?.user?.email && session?.user?.name) {
            const roleName = localStorage.getItem("userRole");

            if (roleName && !isGoogleSessionCreated) {
                // Primero reseteamos isSessionSent a false
                setSessionSent(false);
                // Crea la sesión de Google y marca isGoogleSessionCreated como true
                createGoogleSession({
                    email: session.user.email,
                    name: session.user.name,
                    role_name: roleName,
                });
                console.log("Datos almacenados en createGoogleSession:", {
                    email: session.user.email,
                    name: session.user.name,
                    role_name: roleName,
                });
                
                localStorage.removeItem("userRole");
                signOut({ redirect: false });
                setIsGoogleSessionCreated(true); // Establece el estado para evitar ejecutar setAuthSession
                return;
            } 

            if (!isGoogleSessionCreated) {
                // Si no hay roleName, solo configura authSession
                setAuthSession({
                    email: session.user.email,
                    name: session.user.name,
                });
                console.log("Datos almacenados en setAuthSession:", {
                    email: session.user.email,
                    name: session.user.name,
                });
                
                signOut({ redirect: false });
            }
        }
    }, [sessionStatus, session, setAuthSession, createGoogleSession, isGoogleSessionCreated]);

    return <>{children}</>;
};

export default GoogleWrapper;
