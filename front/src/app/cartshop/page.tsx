"use client";

import CarShopView from "@/views/CarShopVIew";
import React, { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Carshop = () => {
  const { role_name, isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (
      !isAuthenticated ||
      !token ||
      (role_name !== "admin" && role_name !== "buyer")
    ) {
      router.push("/");
    }
  }, [role_name, isAuthenticated, token, router]);

  return (
    <>
      {isAuthenticated &&
        token &&
        (role_name === "admin" || role_name === "buyer") && <CarShopView />}
    </>
  );
};

export default Carshop;
