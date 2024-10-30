// front/src/store/useAuthThirdStore.ts
import { create } from "zustand";
import { IAuthThirdState } from "@/interface/types";
import { signOut } from "next-auth/react";

export const useAuthThirdStore = create<IAuthThirdState>((set) => ({
    googleSession: null,
    isSessionSent: false,
    hasInitialized: false,

    createGoogleSession: (session) => {
        set((state) => {
            if (state.isSessionSent) {
                return state; // No modificar si ya se envió la sesión
            }

            if (session?.email && session?.name) {
                const newGoogleSession = {
                    name: session.name ?? null,
                    email: session.email ?? null,
                    role_name: session.role_name ?? null // Asegúrate de que esto se está pasando correctamente
                };

                console.log('Sesión de Google creada:', newGoogleSession);

                return {
                    ...state,
                    googleSession: newGoogleSession,
                    hasInitialized: true,
                    isSessionSent: true // Marca que la sesión se ha enviado
                };
            }
            return state; // Si no hay email o name, retornar el estado sin cambios
        });
    },

    setSessionSent: (value) => {
        set((state) => ({
            ...state,
            isSessionSent: value // Establece el valor de isSessionSent
        }));
    },

    resetInitialization: () => {
        set((state) => ({
            ...state,
            hasInitialized: false // Restablece hasInitialized a false
        }));
    },

    resetSession: () => {
        set({
            googleSession: null,
            isSessionSent: false,
            hasInitialized: false
        });
    },

    clearAllSessions: async () => {
        try {
            set({
                googleSession: null,
                isSessionSent: false,
                hasInitialized: false
            });
            await signOut({ redirect: false });
            console.log('Todas las sesiones han sido limpiadas');
        } catch (error) {
            console.error('Error al limpiar las sesiones:', error);
            throw error;
        }
    }
}));
