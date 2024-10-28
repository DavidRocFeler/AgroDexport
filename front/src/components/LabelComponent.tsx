// LabelComponent.tsx
import React from 'react';
import styles from "../styles/LabelComponent.module.css";
import { IAgriProduct } from '@/interface/types';

interface LabelComponentProps extends IAgriProduct {
  isSelected: boolean;
  onSelect: () => void;
}

const LabelComponent: React.FC<LabelComponentProps> = ({
  company_product_img,
  company_product_name,
  minimum_order,
  company_price_x_kg,
  isSelected,
  onSelect,
  category_id // Añadimos esta prop requerida
}) => {
  return (
    <div className={styles.Label}>
      <figure className={styles.ImageIcon}>
        <img src={company_product_img} alt={company_product_name} />
      </figure>
      <div className={styles.Extrainfo}>
        <p>{company_product_name}</p>
        <div className="flex flex-row">
          <p className="mr-2">Quantity: {minimum_order} t</p>
        </div>
      </div>
      <div className={styles.Price}>
        <p>$ {company_price_x_kg} kg.</p>
        <input
          className="absolute bottom-0 right-0"
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </div>
    </div>
  );
};

export default LabelComponent;

