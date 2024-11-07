"use client";

import React, { useEffect } from "react";
import ProfileClientView from "@/views/ProfileClientView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const ProfileClient = () => {
  const { isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/");
    }
  }, [isAuthenticated, token, router]);

  return <>{isAuthenticated && token && <ProfileClientView />}</>;
};

export default ProfileClient;
