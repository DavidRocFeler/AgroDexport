"use client";

import React, { useEffect } from "react";
import AllDetailView from "@/views/AllDetailView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const DetailProduct: React.FC<{ params: { company_id: string } }> = ({
  params,
}) => {
  const { isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/");
    }
  }, [isAuthenticated, token, router]);

  return <>{isAuthenticated && token && <AllDetailView />}</>;
};

export default DetailProduct;
