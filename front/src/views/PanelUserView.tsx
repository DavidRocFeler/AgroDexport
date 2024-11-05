"use client";
import { Bell, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from "../styles/UserPanel.module.css";
import SupplyChainComponent from '@/components/SupplyChainComponent';
import { supplyChainArray } from '@/helpers/supplyChain.helpers';
import { INotification, ISupplyChainProps } from '@/interface/types';
import { useUserStore } from '@/store/useUserStore';
import NotificationsModal from '@/components/NotificationsModal';
import { useRouter } from 'next/navigation';
import { useSocket } from '../server/useSocket';
import { getNotifications, markNotificationAsRead } from "@/server/notificationsSetting";

const PanelUserView: React.FC = () => {
  const supplyChain: ISupplyChainProps[] = supplyChainArray;
  const { user_id, token, role_name } = useUserStore();
  const { socket } = useSocket(user_id || '');
  const [unreadCount, setUnreadCount] = useState(0);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewAsSupplier, setViewAsSupplier] = useState(true); 
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
          const unreadNotifications = data.filter(n => !n.isRead).length;
          setUnreadCount(unreadNotifications);
        } catch (error) {
          console.error('Error al cargar notificaciones:', error);
        }
      }
    };

    fetchNotifications();
  }, [user_id, token]);

  useEffect(() => {
    if (socket && user_id) {
      socket.on('newNotification', (notification: INotification) => {
        setAllNotifications((prev) => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
      });

      return () => {
        socket.off('newNotification');
      };
    }
  }, [socket, user_id]);

  const handleMarkAllAsRead = async () => {
    if (!token) {
      console.error('Token no disponible');
      return;
    }

    const unreadNotifications = allNotifications.filter(notification => !notification.isRead);

    for (const notification of unreadNotifications) {
      await markNotificationAsRead(notification.notification_id, token);
    }

    setAllNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
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
    if (role_name === "admin") {
      router.push("/userpanel");
    } else if (role_name === "supplier") {
      router.push("/profile");
    } else if (role_name === "buyer") {
      router.push("/profile");
    } else {
      console.warn("User role not recognized"); 
    }
  };

  const handleRedirectHistory = () => {
    if (role_name === "admin") {
      router.push("/historytransactions");
    } else if (role_name === "supplier") {
      router.push("/supplierhistorysales");
    } else if (role_name === "buyer") {
      router.push("/purchasehistory");
    } else {
      console.warn("User role not recognized"); 
    }
  };
  
  const handleViewAsSupplier = () => {
    setViewAsSupplier(true); 
  };

  const handleViewAsBuyer = () => {
    setViewAsSupplier(false); 
  };

  const handleDashboardRedirect = () => {
    router.push("/admin")
  }

  if (!isHydrated) {
    return (
      <section>
        <div style={{ backgroundColor: "#C4E2FF", paddingTop: "8.45rem", paddingBottom: "4rem" }}>
          <h1 className={styles.UserPanel}>User Panel</h1>
          <aside className='flex flex-row justify-center mb-[4.3rem]'>
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
      <div style={{ backgroundColor: "#C4E2FF", paddingTop: "2rem", paddingBottom: "4rem" }}>
        {role_name === "admin" && (
          <aside className='flex flex-row relative'>
            <button onClick={handleViewAsSupplier} className={styles.ButtonSupplier}>View as Supplier</button>
            <button onClick={handleViewAsBuyer} className={styles.ButtonBuyer}>View as Buyer</button>
            <button onClick={handleDashboardRedirect} className={styles.ButtonDashboard}> Go to dashboard </button>
          </aside>
        )}
        <aside className='w-fit ml-auto mb-[4rem] mr-[2rem]'>
          <button onClick={handleOpenModal} className='ml-[1rem] w-[2rem] h-[2rem] relative z-10'>
            <Bell />
            {unreadCount > 0 && <span className='text-[0.7rem] text-white z-20 absolute bottom-5 right-0 bg-red-700 rounded-full pt-[0.1rem] pb-[0.05rem] pl-[0.5rem] pr-[0.5rem] font-bold '>{unreadCount}</span>}
          </button>
        </aside>

        <h1 className={styles.UserPanel}>User Panel</h1>

        <aside className='flex flex-row justify-center mb-[1rem]'>
          <button onClick={handleRedirectProfile} className={styles.ButtonProfile}>Profile</button>
          <button onClick={handleRedirectHistory} className={styles.ButtonHistory}>History</button> 
        </aside>

        <nav className='flex flex-row justify-center'>        
          {viewAsSupplier && role_name === "admin" && (
            <>
              <Link className={styles.RedirectPanel} href="/userpanel">Order Status</Link>
              <Link className={styles.RedirectPanel} href="/userpanel">My products</Link>
              <Link className={styles.RedirectPanel} href="/userpanel">Publish Product</Link>
              {/* <Link className={styles.RedirectPanel} href="/payments">Payments</Link>
              <Link className={styles.RedirectPanel} href="/help">Help</Link> */}
            </>
          )}
          {!viewAsSupplier && role_name === "admin" && (
            <>
              <Link className={styles.RedirectPanel} href="/userpanel">Order Status</Link>
              <Link className={styles.RedirectPanel} href="/userpanel">Cart Shop</Link>
              <Link className={styles.RedirectPanel} href="/userpanel">See Market</Link>
              {/* <Link className={styles.RedirectPanel} href="/payments">Payments</Link>
              <Link className={styles.RedirectPanel} href="/help">Help</Link> */}
            </>
          )}
          {role_name === "supplier" && ( // Mostrar enlaces para supplier
            <>
              <Link className={styles.RedirectPanel} href="/orderstatus">Order Status</Link>
              <Link className={styles.RedirectPanel} href="/myproducts">My products</Link>
              <Link className={styles.RedirectPanel} href="/publishproducts">Publish Product</Link>
              {/* <Link className={styles.RedirectPanel} href="/payments">Payments</Link>
              <Link className={styles.RedirectPanel} href="/help">Help</Link> */}
            </>
          )} 
          {role_name === "buyer" && (
            <>
              <Link className={styles.RedirectPanel} href="/orderstatus">Order Status</Link>
              <Link className={styles.RedirectPanel} href="/cartshop">Cart Shop</Link>
              <Link className={styles.RedirectPanel} href="/market">See Market</Link>
              {/* <Link className={styles.RedirectPanel} href="/payments">Payments</Link>
              <Link className={styles.RedirectPanel} href="/help">Help</Link> */}
            </>
          )}             
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