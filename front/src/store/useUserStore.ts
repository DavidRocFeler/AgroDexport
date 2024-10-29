import { IUserState } from "@/interface/types";
import { create } from "zustand";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "tu-clave-secreta";

const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decryptData = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
};

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      user_id: null,

      token: null,

      role_name: null,
      isAuthenticated: false,
    };
  }

  const encryptedData = Cookies.get("userState");
  if (!encryptedData) {
    return {
      user_id: null,
      token: null,

      role_name: null,
      isAuthenticated: false,
    };
  }

  const decryptedData = decryptData(encryptedData);
  return (
    decryptedData || {
      user_id: null,
      token: null,

      role_name: null,
      isAuthenticated: false,
    }
  );
};

export const useUserStore = create<IUserState>((set) => ({
  ...getInitialState(),

  setUserData: (
    user_id: string,
    token: string,

    role_name: string
  ) => {
    const userData = {
      user_id,
      token,

      role_name,
      isAuthenticated: true,
    };

    if (typeof window !== "undefined") {
      Cookies.set("userState", encryptData(userData), {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
    }

    set(userData);
  },

  clearUser: () => {
    if (typeof window !== "undefined") {
      Cookies.remove("userState");
    }
    set({
      user_id: null,
      token: null,

      role_name: null,
      isAuthenticated: false,
    });
  },
}));
