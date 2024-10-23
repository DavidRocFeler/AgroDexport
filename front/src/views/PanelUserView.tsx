"use client";
import { Bell, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import styles from "../styles/UserPanel.module.css";
import SupplyChainComponent from '@/components/SupplyChainComponent';
import { supplyChainArray } from '@/helpers/supplyChain.helpers';
import { ISupplyChainProps } from '@/interface/types';
import ProtectedRoute from '@/app/ProtectedRoute';
import { useUserStore } from '@/store/useUserStore'; // Asegúrate de importar el hook para acceder al estado global

const PanelUserView: React.FC = () => {
  const supplyChain: ISupplyChainProps[] = supplyChainArray;
  const { role_name } = useUserStore(); // Obtener el role_name desde el estado global

  return (
    <ProtectedRoute allowedRoles={['supplier', 'buyer']}>
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
          <aside className='flex flex-row justify-center mb-[1rem]'>
            <button className={styles.ButtonProfile}> Profile </button>
            <button className={styles.ButtonHistory}> History </button>
          </aside>
          <nav className='flex flex-row justify-center'>
            <Link className={styles.RedirectPanel} href="/supplychain"> Order Status </Link>
            {role_name === "supplier" ? (
              <Link className={styles.RedirectPanel} href="/myproducts"> My products </Link>
            ) : (
              <Link className={styles.RedirectPanel} href="/cartshop"> Cart Shop </Link>
            )}
            {role_name === 'supplier' ? ( 
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
            // Render supplychain per each component
            <SupplyChainComponent key={item.id} {...item} />
          ))}
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default PanelUserView;

