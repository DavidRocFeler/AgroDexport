//front/src/store/useAuthThirdStore.ts
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
                return state;
            }

            if (session?.user) {
                const role_name = localStorage.getItem("userRole");
                
                const newGoogleSession = {
                    name: session.user.name ?? null,
                    email: session.user.email ?? null,
                    role_name: role_name
                };
                
                console.log('Sesión de Google creada:', newGoogleSession);
                
                return {
                    ...state,
                    googleSession: newGoogleSession,
                    hasInitialized: true
                };
            }
            return state;
        });
    },
    
    setSessionSent: (value) => {
        set((state) => ({
            ...state,
            isSessionSent: value
        }));
    },
    
    resetInitialization: () => {
        set((state) => ({
            ...state,
            hasInitialized: false
        }));
    },
    
    clearAllSessions: async () => {
        try {
            set({
                googleSession: null,
                isSessionSent: false,
                hasInitialized: false
            });
            
            localStorage.removeItem("userRole");
            await signOut({ redirect: false });
            
            console.log('Todas las sesiones han sido limpiadas');
        } catch (error) {
            console.error('Error al limpiar las sesiones:', error);
            throw error;
        }
    }
}));