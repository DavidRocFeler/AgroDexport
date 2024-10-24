"use client";
import { useUserStore } from '@/store/useUserStore';
import React, { useEffect } from 'react';
import { IProvidersProps } from '@/interface/types';

const UserProviders = ({ children }: IProvidersProps) => {
  const { setUserData } = useUserStore();

  useEffect(() => {
    // Recupera los datos de sesión desde localStorage
    const user_id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const role_name = localStorage.getItem('roleName');

    // Si existen los datos, actualiza el estado global
    if (user_id && token && role_name) {
      setUserData(user_id, token, role_name);
    }
  }, [setUserData]);

  return (
    <>
      {children}
    </>
  );
};

export default UserProviders;
