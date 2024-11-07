"use client";

import React, { useEffect } from "react";
import PublishProductView from "@/views/PublishProductView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const PublishProducts = () => {
  const { isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Redirige a /home si el usuario no está autenticado o no tiene token
    if (!isAuthenticated || !token) {
      router.push("/");
    }
  }, [isAuthenticated, token, router]);

  return <>{isAuthenticated && token && <PublishProductView />}</>;
};

export default PublishProducts;
