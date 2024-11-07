"use client";

import React, { useEffect } from "react";
import PanelUserView from "@/views/PanelUserView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const PanelUser = () => {
  const { isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Redirige a / si el usuario no está autenticado o no tiene token
    if (!isAuthenticated || !token) {
      router.push("/");
    }
  }, [isAuthenticated, token, router]);

  return <>{isAuthenticated && token && <PanelUserView />}</>;
};

export default PanelUser;
