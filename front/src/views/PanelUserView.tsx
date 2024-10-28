"use client";
import { Bell, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from "../styles/UserPanel.module.css";
import SupplyChainComponent from '@/components/SupplyChainComponent';
import { supplyChainArray } from '@/helpers/supplyChain.helpers';
import { ISupplyChainProps} from '@/interface/types';
import { useUserStore } from '@/store/useUserStore'; // Asegúrate de importar el hook para acceder al estado global
import NotificationsModal from '@/components/NotificationsModal';
import { useRouter } from 'next/navigation';

const PanelUserView: React.FC = ({
}) => {
  const supplyChain: ISupplyChainProps[] = supplyChainArray;
  const { role_name } = useUserStore();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("supplier"); // Estado para el modo de vista
  const router = useRouter();

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

  const handleRedirectPurchaseHistory = () => {
    router.push("/purchasehistory");
  };

  // Funciones para cambiar el modo de vista
  const handleViewAsSupplier = () => setViewMode("supplier");
  const handleViewAsBuyer = () => setViewMode("buyer");

  
  if (!isHydrated) {
    return (
      // <ProtectedRoute allowedRoles={['supplier', 'buyer']}>
      <section>
        <div style={{ backgroundColor: "#C4E2FF", paddingTop: "2rem", paddingBottom: "4rem" }}>
          <aside className='w-fit ml-auto mb-[4rem] mr-[2rem]'>
            <button>
              <MessageCircle/>
            </button>
            <button className='ml-[1rem] '>
              <Bell/>
            </button>
          </aside>
          <h1 className={styles.UserPanel}>User Panel</h1>
          <aside className='flex flex-row justify-center mb-[4.3rem]'>
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
      <section>
        <div style={{ backgroundColor: "#C4E2FF", paddingTop: "2rem", paddingBottom: "4rem" }}>
          {/* Botones para el admin elegir el modo de visualización */}
          {role_name === "admin" && (
            <aside className='flex flex-row relative'>
              <button id='' onClick={handleViewAsBuyer} className={styles.ButtonSupplier}> View as Supplier </button>
              <button id='' onClick={handleViewAsSupplier} className={styles.ButtonBuyer}> View as Buyer </button>
            </aside>
          )}
          <aside className='w-fit ml-auto mb-[4rem] mr-[2rem]'>
            <button>
              <MessageCircle/>
            </button>
            <button onClick={() => setIsModalOpen(true)} className='ml-[1rem] '>
              <Bell/>
            </button>
            
          </aside>
          <h1 className={styles.UserPanel}>User Panel</h1>
          {/* Renderizado condicional basado en el modo de vista seleccionado */}
          <aside className='flex flex-row justify-center mb-[1rem]'>
            <button onClick={handleRedirectProfile} className={styles.ButtonProfile}> Profile </button>
            {viewMode === "buyer" && (
              <button onClick={handleRedirectHistorySales} className={styles.ButtonHistory}> History </button>
            )}
            {viewMode === "supplier" && (
              <button onClick={handleRedirectPurchaseHistory} className={styles.ButtonHistory}> History </button>
            )}
          </aside>

          <nav className='flex flex-row justify-center'>
            <Link className={styles.RedirectPanel} href="/orderstatus"> Order Status </Link>
            {viewMode === "buyer" ? (
              <Link className={styles.RedirectPanel} href="/myproducts"> My products </Link>
            ) : (
              <Link className={styles.RedirectPanel} href="/cartshop"> Cart Shop </Link>
            )}
            {viewMode === 'buyer' ? ( 
              <Link className={styles.RedirectPanel} href="/publishproduct"> Publish Product </Link>
            ) : (
              <Link className={styles.RedirectPanel} href="/market"> See Market </Link>
            )}
            <Link className={styles.RedirectPanel} href="/payments"> Payments </Link>
            <Link className={styles.RedirectPanel} href="/help"> Help </Link>
          </nav>
        </div>

        <div className={styles.SupplyChain}>
          {supplyChain.map((item) => (
            <SupplyChainComponent key={item.id} {...item} />
          ))}
        </div>
        {isModalOpen && (
        <NotificationsModal
          userId='' 
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      </section>
  );
};

export default PanelUserView;


