// useUserSettingsStore.ts
import { create } from 'zustand';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { IUserSettingsState } from '@/interface/storeTypes';
import { ISettingsUserProps } from '@/interface/types';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'tu-clave-secreta';

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

const getInitialSettingsState = () => {
  if (typeof window === 'undefined') {
    return {
      userSettings: null,
      user_name: undefined,
      user_lastname: undefined,
    };
  }

  const encryptedData = Cookies.get('userSettings');
  if (!encryptedData) {
    return {
      userSettings: null,
      user_name: undefined,
      user_lastname: undefined,
    };
  }

  const decryptedData = decryptData(encryptedData);
  return decryptedData || {
    userSettings: null,
    user_name: undefined,
    user_lastname: undefined,
  };
};

const useUserSettingsStore = create<IUserSettingsState>((set) => ({
  ...getInitialSettingsState(),

  setUserSettings: (settings: ISettingsUserProps) => {
    const userSettingsData = { 
      userSettings: settings, 
      user_name: settings.user_name, 
      user_lastname: settings.user_lastname 
    };

    if (typeof window !== 'undefined') {
      Cookies.set('userSettings', encryptData(userSettingsData), {
        expires: 1,
        secure: true,
        sameSite: 'strict'
      });
    }

    set(userSettingsData);
  },

  clearUserSettings: () => {
    if (typeof window !== 'undefined') {
      Cookies.remove('userSettings');
    }

    set({ 
      userSettings: null, 
      user_name: undefined, 
      user_lastname: undefined 
    });
  }
}));

export default useUserSettingsStore;
