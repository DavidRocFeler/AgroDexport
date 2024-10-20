"use client"
import Link from 'next/link';
import React from 'react';
import styles from "../styles/UserPanel.module.css"
import SupplyChainComponent from '@/components/SupplyChainComponent';
import { supplyChainArray } from '@/helpers/supplyChain.helpers';
import { ISupplyChainProps } from '@/interface/types';
import { useUserStore } from '@/store/useUserStore';

const PanelUserView: React.FC = () => {
  const supplyChain: ISupplyChainProps[] = supplyChainArray;
  const userType = useUserStore((state) => state.userType);
 
  return (
    <section>
      <div style={{backgroundColor: "#C4E2FF", paddingTop: "4rem", paddingBottom: "4rem"}}>
          <h1 className={styles.UserPanel} >User Panel</h1>
          <aside className='flex flex-row justify-center mb-[1rem] '>
            <button className={styles.ButtonProfile}> Profile </button>
            <button className={styles.ButtonHistory}> History </button>
          </aside>
          <nav className='flex flex-row justify-center'>
            <Link className={styles.RedirectPanel} href="/orders" > Order Status </Link>
            <Link className={styles.RedirectPanel} href="/cartshop"> Cart Shop </Link>
            <Link className={styles.RedirectPanel} href="/market"> See Market </Link>
            <Link className={styles.RedirectPanel} href="/payments" > Payments </Link>
            <Link className={styles.RedirectPanel} href="/help" > Help </Link>
          </nav>
      </div>
      <div className={styles.SupplyChain} >
      {supplyChain.map((item) => (
          // Renderiza un SupplyChainComponent para cada item en el arreglo
          <SupplyChainComponent key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
export default PanelUserView;
