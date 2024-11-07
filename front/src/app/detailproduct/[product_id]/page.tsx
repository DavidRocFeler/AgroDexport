"use client";

import React, { useEffect } from "react";
import AllDetailView from "@/views/AllDetailView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const DetailProduct: React.FC<{ params: { company_id: string } }> = ({
  params,
}) => {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Redirige a /home si el usuario no está autenticado
    if (!isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated && <AllDetailView />}</>;
};

export default DetailProduct;
