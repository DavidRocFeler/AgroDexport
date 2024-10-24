// import React from "react";
// import classs from "@/classs/CartShow.module.css";

// const CartShowView: React.FC = () => {
//   return (
//     <div class={classs.maincontainer}>
//       <span class={classs.cartshop}>Cart Shop</span>
//       <span class={classs.selectproduct}>Select Product v</span>
//       <div class={classs.contenedor}></div>
//       <div class={classs.rectangle}></div>
//       <div class={classs.producta}>
//         <div class={classs.rectangle1}></div>
//         <span class={classs.producta2}>Product A</span>
//         <span class={classs.producta3}>Product A</span>
//         <div class={classs.rectangle4}></div>
//         <span class={classs.description}>Description</span>
//       </div>
//       <div class={classs.productb}>
//         <div class={classs.rectangle5}></div>
//         <div class={classs.rectangle6}></div>
//         <span class={classs.productb7}>Product B</span>
//         <span class={classs.description8}>Description</span>
//       </div>
//       <button class={classs.button}>
//         <span class={classs.add}>ADD</span>
//       </button>
//     </div>
//   );
// };
// export default CartShowView;

import React from "react";
import styles from "@/styles/CartShow.module.css";

const CartShowView: React.FC = () => {
  return (
    <div className="container">
      <div className="container1">
        <div className="title">
          <b className="cartshop">CART SHOP</b>
          {/* <div className="ordernowand">
          Order now and appreciate the beauty of nature
        </div> */}
        </div>

        <div className="containercomp">
          <img className="imgbicon" alt="" src="../img1_cart.png" />
          <div className="button">
            <div className="explore">Button</div>
          </div>
        </div>

        <div className="productb">
          <img className="imgbicon" alt="" src="../img1_cart.png" />
          <div className="artificialplantsparent">
            <div className="explore">Artificial Plants</div>
            <div className="div">₱ 900.00</div>
          </div>
        </div>
        <div className="producta">
          <img className="imgicon" alt="" src="../img2_cart.png" />
          <div className="artificialplantsparent">
            <div className="explore">Natural Plants</div>
            <div className="div">₱ 1,400.00</div>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdownchild"></div>
          <img className="dropdownicon" alt="" src="../dropdown_cart.png" />
          <div className="selectcompanie">Select Companie</div>
        </div>
      </div>
    </div>
  );
};
export default CartShowView;
