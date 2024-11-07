"use client";

import React, { useEffect } from "react";
import SupplyChainViewSupplier from "@/views/SupplyChainViewBuyes";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const { isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Redirige a /home si el usuario no está autenticado o no tiene token
    if (!isAuthenticated || !token) {
      router.push("/home");
    }
  }, [isAuthenticated, token, router]);

  return <>{isAuthenticated && token && <SupplyChainViewSupplier />}</>;
};

export default Page;
