"use client";
import { Bell, MessageCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/UserPanel.module.css";
import SupplyChainComponent from "@/components/SupplyChainComponent";
import { supplyChainArray } from "@/helpers/supplyChain.helpers";
import { INotification, ISupplyChainProps } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";
import NotificationsModal from "@/components/NotificationsModal";
import { useRouter } from "next/navigation";
import { useSocket } from "../server/useSocket";
import {
  getNotifications,
  markNotificationAsRead,
} from "@/server/notificationsSetting";

const PanelUserView: React.FC = () => {
  const supplyChain: ISupplyChainProps[] = supplyChainArray;
  const { user_id, token, role_name } = useUserStore();
  const { socket } = useSocket(user_id || "");
  const [unreadCount, setUnreadCount] = useState(0);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("supplier");
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user_id && token) {
        try {
          const data = await getNotifications(user_id, token);
          setAllNotifications(data);

          // Contar las no leídas
          const unreadNotifications = data.filter((n) => !n.isRead).length;
          setUnreadCount(unreadNotifications);
        } catch (error) {
          console.error("Error al cargar notificaciones:", error);
        }
      }
    };

    fetchNotifications();
  }, [user_id, token]);

  useEffect(() => {
    if (socket && user_id) {
      socket.on("newNotification", (notification: INotification) => {
        setAllNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      return () => {
        socket.off("newNotification");
      };
    }
  }, [socket, user_id]);

  const handleMarkAllAsRead = async () => {
    if (!token) {
      console.error("Token no disponible");
      return;
    }

    const unreadNotifications = allNotifications.filter(
      (notification) => !notification.isRead
    );

    for (const notification of unreadNotifications) {
      await markNotificationAsRead(notification.notification_id, token);
    }

    setAllNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setUnreadCount(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleMarkAllAsRead();
  };

  const handleRedirectProfile = () => {
    router.push("/profile");
  };

  const handleRedirectHistorySales = () => {
    router.push("/supplierhistorysales");
  };

  const handleRedirectPurchaseHistory = () => {
    router.push("/purchasehistory");
  };

  const handleViewAsSupplier = () => setViewMode("supplier");
  const handleViewAsBuyer = () => setViewMode("buyer");

  if (!isHydrated) {
    return (
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
            <button onClick={handleOpenModal} className="BellButton">
              <Bell className="BellIcon" />
              {unreadCount > 0 && (
                <span className="NotificationCount">{unreadCount}</span>
              )}
            </button>
          </aside>
          <h1 className={styles.UserPanel}>User Panel</h1>
          <aside className="flex flex-row justify-center mb-[4.3rem]">
            <button className={styles.ButtonProfile}>Profile</button>
            <button className={styles.ButtonHistory}>History</button>
          </aside>
        </div>
        <div className={styles.SupplyChain}>
          {supplyChain.map((item) => (
            <SupplyChainComponent key={item.id} {...item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div
        style={{
          backgroundColor: "#C4E2FF",
          paddingTop: "2rem",
          paddingBottom: "4rem",
        }}
      >
        {role_name === "admin" && (
          <aside className="flex flex-row relative">
            <button
              onClick={handleViewAsBuyer}
              className={styles.ButtonSupplier}
            >
              View as Supplier
            </button>
            <button
              onClick={handleViewAsSupplier}
              className={styles.ButtonBuyer}
            >
              View as Buyer
            </button>
          </aside>
        )}
        <aside className="w-fit ml-auto mb-[4rem] mr-[2rem]">
          <button>
            <MessageCircle />
          </button>
          <button onClick={handleOpenModal} className="ml-[1rem]">
            <Bell />
            {unreadCount > 0 && <span>{unreadCount}</span>}
          </button>
        </aside>
        <h1 className={styles.UserPanel}>User Panel</h1>
        <aside className="flex flex-row justify-center mb-[1rem]">
          <button
            onClick={handleRedirectProfile}
            className={styles.ButtonProfile}
          >
            Profile
          </button>
          {viewMode === "buyer" && (
            <button
              onClick={handleRedirectHistorySales}
              className={styles.ButtonHistory}
            >
              History
            </button>
          )}
          {viewMode === "supplier" && (
            <button
              onClick={handleRedirectPurchaseHistory}
              className={styles.ButtonHistory}
            >
              History
            </button>
          )}
        </aside>

        <nav className="flex flex-row justify-center">
          <Link className={styles.RedirectPanel} href="/orderstatus">
            Order Status
          </Link>
          {viewMode === "buyer" ? (
            <Link className={styles.RedirectPanel} href="/myproducts">
              My products
            </Link>
          ) : (
            <Link className={styles.RedirectPanel} href="/cartshop">
              Cart Shop
            </Link>
          )}
          {viewMode === "buyer" ? (
            <Link className={styles.RedirectPanel} href="/publishproducts">
              Publish Product
            </Link>
          ) : (
            <Link className={styles.RedirectPanel} href="/market">
              See Market
            </Link>
          )}
          <Link className={styles.RedirectPanel} href="/payments">
            Payments
          </Link>
          <Link className={styles.RedirectPanel} href="/help">
            Help
          </Link>
        </nav>
      </div>

      <div className={styles.SupplyChain}>
        {supplyChain.map((item) => (
          <SupplyChainComponent key={item.id} {...item} />
        ))}
      </div>

      {isModalOpen && (
        <NotificationsModal
          isVisible={isModalOpen}
          notifications={allNotifications}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default PanelUserView;
