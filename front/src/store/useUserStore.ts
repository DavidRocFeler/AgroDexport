import { create } from "zustand";
import { IUser, IUserState } from "@/interface/types";

export const useUserStore = create<IUserState>((set) => ({
    users: [],
    token: null,
    userType: null,
    addUser: (user: IUser) => set((state) => {
        if (state.users.some(u => u.id === user.id)) {
            return state; 
        }
        return { users: [...state.users, user] };
    }),
    removeUser: (userId: string) => set((state) => ({
        users: state.users.filter(user => user.id !== userId)
    })),
    clearUsers: () => set({ users: [] }),
    setToken: (token: string) => set({ token }),
    setUserType: (userType: "supplier" | "buyer" |  null) => set({ userType }),
    checkToken: () => {
        const token = localStorage.getItem("jwt");
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userType = payload.userType;
            set({ token, userType });
        }
    },
}));

export const saveToken = (token: string) => {
    localStorage.setItem("jwt", token);
};