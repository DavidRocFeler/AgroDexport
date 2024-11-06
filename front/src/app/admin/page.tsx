// import DashboardView from "@/views/DashboardView";

// const Admin: React.FC = () => {
//   return (
//     <>
//       <DashboardView />
//     </>
//   );
// };

// export default Admin;

//----------------------------------------------------------
"use client";

import React, { useEffect } from "react";
import DashboardView from "@/views/DashboardView";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Admin: React.FC = () => {
  const { role_name, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    //If the user is not authenticated or is not an administrator, we redirect.
    if (!isAuthenticated || role_name !== "admin") {
      router.push("/");
    }
  }, [role_name, isAuthenticated, router]);

  return <>{isAuthenticated && role_name === "admin" && <DashboardView />}</>;
};

export default Admin;
