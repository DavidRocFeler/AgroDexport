"use client";

import React, { useEffect } from "react";
import MyProductsView from "@/views/MyProductsView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const MyProducts = () => {
  const { isAuthenticated, role_name, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (
      !isAuthenticated ||
      !token ||
      (role_name !== "admin" && role_name !== "supplier")
    ) {
      router.push("/");
    }
  }, [isAuthenticated, role_name, token, router]);

  return (
    <>
      {isAuthenticated &&
        token &&
        (role_name === "admin" || role_name === "supplier") && (
          <div className="min-h-screen">
            <MyProductsView />
          </div>
        )}
    </>
  );
};

export default MyProducts;
