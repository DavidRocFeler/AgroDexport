import React from "react";
import styles from "@/styles/CartShow.module.css";

const CartShowView: React.FC = () => {
  return (
    <div className={styles.maincontainer}>
      <span className={styles.cartshop}>Cart Shop</span>
      <span className={styles.selectproduct}>Select Product v</span>
      <div className={styles.contenedor}></div>
      <div className={styles.rectangle}></div>
      <div className={styles.producta}>
        <div className={styles.rectangle1}></div>
        <span className={styles.producta2}>Product A</span>
        <span className={styles.producta3}>Product A</span>
        <div className={styles.rectangle4}></div>
        <span className={styles.description}>Description</span>
      </div>
      <div className={styles.productb}>
        <div className={styles.rectangle5}></div>
        <div className={styles.rectangle6}></div>
        <span className={styles.productb7}>Product B</span>
        <span className={styles.description8}>Description</span>
      </div>
      <button className={styles.button}>
        <span className={styles.add}>ADD</span>
      </button>
    </div>
  );
};
export default CartShowView;
