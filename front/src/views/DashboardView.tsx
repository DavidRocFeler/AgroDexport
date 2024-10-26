"use client";
import { Bell, MessageCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/UserPanel.module.css";
import SupplyChainComponent from "@/components/SupplyChainComponent";
import { supplyChainArray } from "@/helpers/supplyChain.helpers";
import { ISupplyChainProps } from "@/interface/types";
import ProtectedRoute from "@/app/ProtectedRoute";
import { useUserStore } from "@/store/useUserStore"; // Asegúrate de importar el hook para acceder al estado global
import NotificationsModal from "@/components/NotificationsModal";
import { useRouter } from "next/navigation";

const DashboardView: React.FC = () => {
  const supplyChain: ISupplyChainProps[] = supplyChainArray;
  const { role_name } = useUserStore();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleRedirectProfile = () => {
    setIsAuth(true);
    router.push("/profile");
  };

  const handleRedirectHistorySales = () => {
    setIsAuth(true);
    router.push("/supplierhistorysales");
  };

  const handleRedirectHistoryBuys = () => {
    router.push("/buyerhistorybuys");
  };

  if (!isHydrated) {
    return (
      // <ProtectedRoute allowedRoles={['supplier', 'buyer']}>
      <section>
        <div
          style={{
            backgroundColor: "#C4E2FF",
            paddingTop: "2rem",
            paddingBottom: "4rem",
          }}
        >
          <aside className="w-fit ml-auto mb-[4rem] mr-[2rem]">
            <button>
              <MessageCircle />
            </button>
            <button className="ml-[1rem] ">
              <Bell />
            </button>
          </aside>
          <h1 className={styles.UserPanel}>Dashboard</h1>
          <aside className="flex flex-row justify-center mb-[4.3rem]">
            <button className={styles.ButtonProfile}> Profile </button>
            <button className={styles.ButtonHistory}> History </button>
          </aside>
        </div>
        <div className={styles.SupplyChain}>
          {supplyChain.map((item) => (
            // Render supplychain per each component
            <SupplyChainComponent key={item.id} {...item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["supplier", "buyer"]}>
      <section>
        <div
          style={{
            backgroundColor: "#C4E2FF",
            paddingTop: "2rem",
            paddingBottom: "4rem",
          }}
        >
          <aside className="w-fit ml-auto mb-[4rem] mr-[2rem]">
            <button>
              <MessageCircle />
            </button>
            <button onClick={() => setIsModalOpen(true)} className="ml-[1rem] ">
              <Bell />
            </button>
          </aside>
          <h1 className={styles.UserPanel}>Dashboard</h1>
          <aside className="flex flex-row justify-center mb-[1rem]">
            <button
              onClick={handleRedirectProfile}
              className={styles.ButtonProfile}
            >
              {" "}
              Profile{" "}
            </button>
            {role_name === "supplier" ? (
              <button
                onClick={handleRedirectHistorySales}
                className={styles.ButtonHistory}
              >
                {" "}
                History{" "}
              </button>
            ) : (
              <button
                onClick={handleRedirectHistoryBuys}
                className={styles.ButtonHistory}
              >
                {" "}
                History{" "}
              </button>
            )}
          </aside>
          <nav className="flex flex-row justify-center">
            <Link className={styles.RedirectPanel} href="/">
              {" "}
              Order Complete{" "}
            </Link>
            {role_name === "supplier" ? (
              <Link className={styles.RedirectPanel} href="/">
                {" "}
                Commission{" "}
              </Link>
            ) : (
              <Link className={styles.RedirectPanel} href="/">
                {" "}
                allProducts{" "}
              </Link>
            )}
            {role_name === "supplier" ? (
              <Link className={styles.RedirectPanel} href="/">
                {" "}
                allCompanies{" "}
              </Link>
            ) : (
              <Link className={styles.RedirectPanel} href="/">
                {" "}
                allUsers{" "}
              </Link>
            )}
            <Link className={styles.RedirectPanel} href="/">
              {" "}
              Transactions history{" "}
            </Link>
            <Link className={styles.RedirectPanel} href="/help">
              {" "}
              Help{" "}
            </Link>
          </nav>
        </div>
        <div className={styles.SupplyChain}>
          {supplyChain.map((item) => (
            // Render supplychain per each component
            <SupplyChainComponent key={item.id} {...item} />
          ))}
        </div>
      </section>
      {isModalOpen && (
        <NotificationsModal
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </ProtectedRoute>
  );
};

export default DashboardView;
