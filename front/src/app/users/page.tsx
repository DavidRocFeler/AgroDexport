"use client";

import React, { useEffect } from "react";
import UserView from "@/views/UserView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Users = () => {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated && <UserView />}</>;
};

export default Users;
