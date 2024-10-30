import React, { useState } from 'react';
import styles from "../styles/LabelComponent.module.css";
import { IAgriProduct } from '@/interface/types';

interface LabelComponentProps extends IAgriProduct {
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void; // Nueva prop para eliminar el producto
}

const LabelComponent: React.FC<LabelComponentProps> = ({
  company_product_img,
  company_product_name,
  minimum_order,
  company_price_x_kg,
  isSelected,
  stock,
  onSelect,
  category_id,
  onRemove 
}) => {
 
  const availableStock = stock ?? 0; 
  const initialQuantity = Math.min(minimum_order ?? 0, availableStock); 
  const adjustedMinimumOrder = minimum_order ?? 0; // Usar 0 si minimum_order es undefined

  const [quantity, setQuantity] = useState(initialQuantity); // Estado para la cantidad seleccionada

  const handleIncrease = () => {
    if (quantity < availableStock) { // Verifica si la cantidad es menor que el stock
      setQuantity(quantity + 1);
    } else {
      alert("Stock máximo alcanzado");
    }
  };

  const handleDecrease = () => {
    if (quantity > adjustedMinimumOrder) {
      setQuantity(quantity - 1);
    } else if (quantity === adjustedMinimumOrder) {
      onRemove();
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

export default LabelComponent;
