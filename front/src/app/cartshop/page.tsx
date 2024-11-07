"use client";
import CarShopView from "@/views/CarShopVIew";
import React, { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Carshop = () => {
  const { role_name, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || (role_name !== "admin" && role_name !== "buyer")) {
      router.push("/home");
    }
  }, [role_name, isAuthenticated, router]);

  return (
    <>
      {isAuthenticated && (role_name === "admin" || role_name === "buyer") && (
        <CarShopView />
      )}
    </>
  );
};

export default Carshop;
