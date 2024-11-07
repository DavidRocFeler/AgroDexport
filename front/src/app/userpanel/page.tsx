"use client";

import PanelUserView from "@/views/PanelUserView";
import React, { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const PanelUser = () => {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated && <PanelUserView />}</>;
};

export default PanelUser;
