import React from "react";
import styles from "../styles/ResumeShop.module.css";

interface ResumeShopProps {
  totals: {
    subtotal: number;
    logisticsCost: number;
    tariff: number;
    tax: number;
    total: number;
    productData: {
      company_id?: string;
      company_product_id?: string;
    } | null;
  };
  onOrderClick: () => void;
  isProductSelected: boolean;
}

const ResumeShopComponent: React.FC<ResumeShopProps> = ({ 
  totals, 
  onOrderClick,
  isProductSelected 
}) => {
  const formatPrice = (price: number) => {
    return `$ ${price.toFixed(2)}`;
  };

  return (
    <div className={styles.Resumen}>
      <h1 className="">Resume</h1>
      <div className={styles.SubTotal}>
        <h2>Subtotal</h2>
        <p>{formatPrice(totals.subtotal)}</p>
      </div>
      <div className={styles.SubTotal}>
        <h2>Logistics cost</h2>
        <p>{formatPrice(totals.logisticsCost)}</p>
      </div>
      <div className={styles.SubTotal}>
        <h2>Tariff</h2>
        <p>{formatPrice(totals.tariff)}</p>
      </div>
      <div className={styles.SubTotal}>
        <h2>Tax</h2>
        <p>{formatPrice(totals.tax)}</p>
      </div>
      <div className={styles.Total}>
        <h2>Total</h2>
        <p>{formatPrice(totals.total)}</p>
      </div>
      <div className={styles.Description}>
        Lorem ipsum Lorem ipsum Lorem ipsum
      </div>
      <button 
        className={styles.Order}
        onClick={onOrderClick}
      >
        Order now
      </button>
    </div>
  );
};

export default ResumeShopComponent;