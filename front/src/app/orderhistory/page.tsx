"use client";

import React, { useEffect } from "react";
import SupplyChainViewAdmin from "@/views/SupplyChainViewAdmin";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const OrderHistory = () => {
  const { isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Redirige a /home si el usuario no está autenticado o si no tiene el token
    if (!isAuthenticated || !token) {
      router.push("/");
    }
  }, [isAuthenticated, token, router]);

  return <>{isAuthenticated && token && <SupplyChainViewAdmin />}</>;
};

export default OrderHistory;
