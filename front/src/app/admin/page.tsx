"use client";

import React, { useEffect } from "react";
import DashboardView from "@/views/DashboardView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Admin: React.FC = () => {
  const { role_name, isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token || role_name !== "admin") {
      router.push("/");
    }
  }, [role_name, isAuthenticated, token, router]);

  return (
    <>
      {isAuthenticated && token && role_name === "admin" && <DashboardView />}
    </>
  );
};

export default Admin;
