"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { registerAuthProps } from "@/server/signUpHelpers";
import { IAuthWrapperProps } from "@/interface/types";
import { useAuthThirdStore } from "@/store/useAuthThirdStore";

const AuthWrapper: React.FC<IAuthWrapperProps> = ({ children }) => {
    const { googleSession, clearAllSessions } = useAuthThirdStore();
    const router = useRouter();

    // Manejar el registro en el backend
    const handleBackendRegistration = useCallback(async () => {
        if (googleSession) {
          try {
              console.log("Enviando datos de googleSession al backend:", googleSession); // Verificar el contenido
              await registerAuthProps(googleSession);
              Swal.fire({
                  icon: "success",
                  title: "Successfully",
                  text: "You registered successfully",
                  width: 400,
                  padding: "3rem",
                  customClass: {
                      popup: "custom-swal-popup",
                  },
              });
          } catch (error:any) {
                const errorMessage = error.toString().split(":").pop().trim();
              Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: `${errorMessage}`,
              });
          } finally {
              clearAllSessions();
              router.push("/");
          }
        }
    }, [googleSession,  clearAllSessions, router ]);    

    useEffect(() => {
      const registerUser = async () => {
        if (googleSession) {
            await handleBackendRegistration(); // Llama a la función de registro
        }
    };

    registerUser(); // Llama a la función dentro del useEffect

    }, [googleSession, handleBackendRegistration])

    return <>{children}</>;
};

export default AuthWrapper;
