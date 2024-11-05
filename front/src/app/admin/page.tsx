"use client";

import React, { useEffect } from "react";
import DashboardView from "@/views/DashboardView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Admin: React.FC = () => {
  const { role_name, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    //Si el usuario no está autenticado o no es administrador, redirigimos
    if (!isAuthenticated || role_name !== "admin") {
      router.push("/home");
    }
  }, [role_name, isAuthenticated, router]);

  return <>{isAuthenticated && role_name === "admin" && <DashboardView />}</>;
};

export default Admin;
