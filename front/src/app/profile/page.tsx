"use client";

import React, { useEffect } from "react";
import ProfileView from "@/views/ProfileView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated && <ProfileView />}</>;
};

export default Profile;
