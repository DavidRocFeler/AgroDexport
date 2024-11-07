"use client";

import React, { useEffect } from "react";
import SupplyChainView from "@/views/SupplyChainView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const SupplyChain = () => {
  const { isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/");
    }
  }, [isAuthenticated, token, router]);

  return <>{isAuthenticated && token && <SupplyChainView />}</>;
};

export default SupplyChain;
