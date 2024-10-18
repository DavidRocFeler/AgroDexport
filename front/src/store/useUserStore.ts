import { create } from "zustand";
import { IUserState } from "@/interface/types";

export const useUserStore = create<IUserState>((set) => ({
    userType: null,
    setUserType: (type) => set({ userType: type }),
    checkCookies: () => {
        const cookies = document.cookie.split('; ');
        const userTypeCookie = cookies.find(row => row.startsWith('userType='));
        const emailCookie = cookies.find(row => row.startsWith('email='));
        
        if (userTypeCookie) {
            const userType = userTypeCookie.split('=')[1] as "buyer" | "supplier" | "admin";
            set({ userType });
        }
    }
}));