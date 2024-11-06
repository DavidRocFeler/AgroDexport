"use client";
import React from "react";
import styles from "../styles/ProductDetail.module.css";
import { IAgriProduct } from "@/interface/types";
import { exampleProduct } from "@/helpers/Product.helpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import Swal from "sweetalert2";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const ProductDetail: React.FC<IAgriProduct> = () => {
  const { shippingOptions, certifications } = exampleProduct;
  const { method, deliveryTime, seaFreight } = shippingOptions;
  const [productData, setProductData] = useState<IAgriProduct | null>(null);
  const { token, role_name, isAuthenticated } = useUserStore()
  const [modalType, setModalType] = React.useState<"login" | "signup" | null>(null);
  const router = useRouter();

  const handleShowLogIn = () => setModalType("login");
  const handleCloseModal = () => setModalType(null);
  const handleSwitchModal = (type: "login" | "signup") => setModalType(type);

  useEffect(() => {
    const handleProductUpdate = () => {
      const storedProduct = localStorage.getItem("selectedProduct");
      if (storedProduct) {
        setProductData(JSON.parse(storedProduct));
      }
    };
  
    // Carga inicial
    handleProductUpdate();
  
    // Escuchar el evento personalizado
    window.addEventListener('productSelected', handleProductUpdate);
    
    return () => {
      window.removeEventListener('productSelected', handleProductUpdate);
    };
  }, []);

  if (!productData) return null;

  const {
    carbs,
    fat,
    calories,
    protein,
    category,
    stock,
    minimum_order,
    harvest_date,
    company_product_name,
    company_product_img,
    company_product_description,
    company_price_x_kg,
    origin,
    discount,
  } = productData;

  const handleAddShop = () => {
    // Verificar si el usuario no está autenticado
    if (!token) {
      handleShowLogIn(); // Mostrar modal de inicio de sesión
      return;
    }
  
    // Verificar si el usuario es "supplier"
    if (role_name === "supplier") {
      Swal.fire({
        icon: "warning",
        title: "Only valid for buyers",
        text: "This action is for buyer users only.",
        confirmButtonText: "Understood",
      });
      return;
    }
  
    // Si el usuario está autenticado y es un comprador
    const selectedProduct = localStorage.getItem("selectedProduct");
  
    if (selectedProduct) {
      const newProduct: IAgriProduct = JSON.parse(selectedProduct);
      const existingCart: IAgriProduct[] = JSON.parse(
        localStorage.getItem("CartProduct") ?? "[]"
      );
  
      // Comprobar si el producto ya existe en el carrito
      const existingProductIndex = existingCart.findIndex(
        (product) => product.company_product_id === newProduct.company_product_id
      );
  
      if (existingProductIndex !== -1) {
        // Si el producto ya existe, redirigir al carrito
        router.push("/cartshop");
      } else {
        // Si no existe, agregar el producto al carrito
        newProduct.minimum_order = newProduct.minimum_order || 0;
        existingCart.push(newProduct);
        localStorage.setItem("CartProduct", JSON.stringify(existingCart));
        
        // Redirigir al carrito
        router.push("/cartshop");
      }
    }
  };
  
  // const handleAddShop = () => {
  //   if (!isAuthenticated) {
  //     handleShowLogIn();
  //   } else {
  //     router.push("/cartshop");
  //   }
  //   // Comprobar si el usuario es "supplier"
  //   if (role_name === "supplier") {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Only valid for buyers",
  //       text: "This action is for buyer users only.",
  //       confirmButtonText: "Understood",
  //     });
  //     return;
  //   }

  //   // Comprobar si el usuario no tiene token (no está logueado)
  //   if (!token) {
  //     handleShowLogIn(); // Mostrar modal de inicio de sesión
  //     return;
  //   }

  //   // Recuperar el producto seleccionado de localStorage
  //   const selectedProduct = localStorage.getItem("selectedProduct");

  //   if (selectedProduct) {
  //     const newProduct: IAgriProduct = JSON.parse(selectedProduct); // Asegúrate de que se tipa correctamente
  //     const existingCart: IAgriProduct[] = JSON.parse(
  //       localStorage.getItem("CartProduct") ?? "[]"
  //     );

  //     // Comprobar si el producto ya existe en el carrito
  //     const existingProductIndex = existingCart.findIndex(
  //       (product) =>
  //         product.company_product_id === newProduct.company_product_id
  //     );

  //     if (existingProductIndex !== -1) {
  //       // Si el producto ya existe, (reenviar al carrito cambio)
  //       router.push("/cartshop");
  //     } else {
  //       // Si no existe, agregar el producto al carrito
  //       newProduct.minimum_order = newProduct.minimum_order || 0; // Asigna una cantidad inicial
  //       existingCart.push(newProduct);
  //     }

  //     // Guardar el carrito actualizado en localStorage
  //     localStorage.setItem("CartProduct", JSON.stringify(existingCart));

  //     // Limpiar el producto seleccionado
  //     // localStorage.removeItem("selectedProduct");

  //     // Redirigir al carrito
  //     router.push("/cartshop");
  //   }
  // };

  const handleCompanyId = () => {
    router.push("/profileclient")
  };

  const handleProductId = () => {
    router.push("/supplierhistoryproduct");
  };
  
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
    <div className="md:flex flex-col pt-[5rem] pb-[4rem] bg-gray-50">
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col w-[40%] border-solid border-[#5c8b1b] border-[1px] ">
          <figure className={styles.MainPicture}>
            <img
              src={company_product_img}
              alt="MainProduct"
              className="w-[30rem] m-auto object-cover "
            />
          </figure>
          {/* <figure className="flex flex-row mt-[2rem] justify-evenly">
            <img
              src={company_product_img}
              alt="MainProduct"
              className="w-[9rem] h-auto mr-[1rem] "
            />
            <img
              src={company_product_img}
              alt="MainProduct"
              className="w-[9rem] h-auto mr-[1rem] "
            />
            <img
              src={company_product_img}
              alt="MainProduct"
              className="w-[9rem] h-auto mr.[1rem] "
            />
          </figure> */}
        </div>
        <div className="w-[45%] relative overflow-hidden">
          <table className={styles.CustomTable}>
            <tbody className={styles.Tbody} >
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Name: </td>
                <td className={styles.ColRight}> {company_product_name} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Variety: </td>
                <td className={styles.ColRight}> {category?.name_category} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Origin: </td>
                <td className={styles.ColRight}> {origin} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Harvest Date: </td>
                <td className={styles.ColRight}> {formatDate(harvest_date)} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Price per kl: </td>
                <td className={styles.ColRight}> $ {company_price_x_kg} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Minimum Order:</td>
                <td className={styles.ColRight}> {minimum_order} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Stock: </td>
                <td className={styles.ColRight}> {stock} </td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
      <div className={styles.Description}>
          <p className="p-[2rem] "> {company_product_description} </p>
      </div>
      <div className="flex flex-row justify-evenly mt-[2rem] ">
        <div className="flex flex-row  w-[65%]">
          <table className={styles.TableTwoColumns}>
            <tbody className={styles.BodyRows}>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}> Calories: </td>
                <td className={styles.RightCol}> {calories} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}> Protein: </td>
                <td className={styles.RightCol}> {protein} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}> Fat: </td>
                <td className={styles.RightCol}> {fat}  </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}> Carbs: </td>
                <td className={styles.RightCol}> {carbs} </td>
              </tr>
            </tbody>
          </table>

          <table
            className={styles.TableTwoColumns}
            style={{ marginLeft: "auto" }}
          >
            <tbody className={styles.BodyRows}>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}>Certifications:</td>
                <td className={styles.RightCol}>{certifications} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}> Delivery Time: </td>
                <td className={styles.RightCol}> {deliveryTime} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}> Shipping Condition: </td>
                <td className={styles.RightCol}> {method} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}> Sea Freight: </td>
                <td className={styles.RightCol}> {seaFreight} </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col w-[20%]">
          <button onClick={handleAddShop} className={styles.ButtonCartshop}>
            {" "}
            Add to cart{" "}
          </button>
          <button onClick={handleCompanyId} className={styles.ButtonSupplier}>
            {" "}
            Supplier{" "}
          </button>
          {styles.ButtonSuppier}
          <button onClick={handleProductId} className={styles.ButtonSupply}>
            {" "}
            Supply chain{" "}
          </button>
        </div>
      </div>
    </div>
    {modalType === "login" && (
        <div className={styles.Overlay}>
          <LogIn
            onCloseLogin={handleCloseModal}
            onSwitchToSignUp={() => handleSwitchModal("signup")}
          />
        </div>
      )}
      {modalType === "signup" && (
        <div className={styles.Overlay}>
          <SignUp
            onCloseSignUp={handleCloseModal}
            onSwitchToLogin={() => handleSwitchModal("login")}
          />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
