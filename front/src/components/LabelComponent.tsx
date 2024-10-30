import React, { useState } from 'react';
import styles from "../styles/LabelComponent.module.css";
import { IAgriProduct } from '@/interface/types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface LabelComponentProps extends IAgriProduct {
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void; 
  quantity?: number ; 
  onQuantityChange: (quantity: number) => void;
}

export const LabelComponent: React.FC<LabelComponentProps> = ({
  company_product_img,
  company_product_name,
  minimum_order,
  company_price_x_kg,
  isSelected,
  stock,
  category_id,
  company_id,
  onSelect,
  onRemove,
  onQuantityChange, 
}) => {
 
  const availableStock = stock ?? 0; 
  const initialQuantity = Math.min(minimum_order ?? 0, availableStock); 
  const adjustedMinimumOrder = minimum_order ?? 0; 

  const [quantity, setQuantity] = useState(initialQuantity); 

  const handleIncrease = () => {
    if (quantity < availableStock) { 
      setQuantity(quantity + 1);
      onQuantityChange(quantity + 1);
    } else {
      MySwal.fire({
        icon: 'info',
        title: 'Maximum Stock Reached',
        text: 'You cannot add more products because you have reached the maximum stock limit.',
      });
    }
  };

  const handleDecrease = () => {
    if (quantity > adjustedMinimumOrder) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    } else if (quantity === adjustedMinimumOrder) {
      MySwal.fire({
        icon: 'warning', 
        title: 'Remove Product?',
        text: 'Are you sure you want to remove this product?',
        showCancelButton: true, 
        confirmButtonText: 'Yes, remove it',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          onRemove();
        }
      });
    }
  };
  
  

  return (
    <div className={styles.Label}>
      <figure className={styles.ImageIcon}>
        <img src={company_product_img} alt={company_product_name} />
      </figure>
      <div className={styles.Extrainfo}>
        <p>{company_product_name}</p>
        <div className="flex flex-row">
          <p className="mr-2">Quantity: {quantity} t</p>
        </div>
        <div className={styles.CantButton}>
          <button className={styles.LessButton} onClick={handleDecrease}>-</button>
          <button className={styles.MoreButton} onClick={handleIncrease}>+</button>
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



