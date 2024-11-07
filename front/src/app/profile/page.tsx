"use client";

import React, { useEffect } from "react";
import ProfileView from "@/views/ProfileView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const { isAuthenticated, token } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/");
    }
  }, [isAuthenticated, token, router]);

  return <>{isAuthenticated && token && <ProfileView />}</>;
};

export default Profile;
