"use client";

import React, { useEffect } from "react";
import MarketView from "@/views/MarketView";
import FooterSecond from "@/components/FooterSecond";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Market: React.FC = () => {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      {isAuthenticated && (
        <>
          <div>
            <MarketView />
          </div>
          <FooterSecond />
        </>
      )}
    </>
  );
};

export default Market;
