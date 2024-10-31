// store/useSessionStore.ts
import { create } from 'zustand';

interface SessionState {
    authSession: { email: string; name: string } | null;
    setAuthSession: (sessionData: { email: string; name: string }) => void;
    clearAuthSession: () => void; // Nueva función para limpiar el estado
}

export const useSessionStore = create<SessionState>((set) => ({
    authSession: null,
    setAuthSession: (sessionData) => set({ authSession: sessionData }),
    clearAuthSession: () => set({ authSession: null }), // Implementación de la función
}));
