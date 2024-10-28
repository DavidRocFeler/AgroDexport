"use client"
import React, { useEffect } from "react";
import styles from "../styles/ProductDetail.module.css"
import { IAgriProduct } from "@/interface/types";
import { exampleProduct } from "@/helpers/Product.helpers";
import { useRouter } from "next/navigation";

const ProductDetail: React.FC<IAgriProduct> = ({
  carbs, fat, calories, protein, category_id, stock, minimum_order, harvest_date, company_product_name, company_product_img, company_product_description, company_price_x_kg, origin
}) => {
  const { shippingOptions, certifications } = exampleProduct;
  const { method, deliveryTime, seaFreight } = shippingOptions
  const router = useRouter()

  const handleAddShop = () => {
    // Recuperar el producto seleccionado de localStorage
    const selectedProduct = localStorage.getItem("selectedProduct");

    if (selectedProduct) {
        const newProduct: IAgriProduct = JSON.parse(selectedProduct); // Asegúrate de que se tipa correctamente
        const existingCart: IAgriProduct[] = JSON.parse(localStorage.getItem("CartProduct") ?? "[]");

        // Comprobar si el producto ya existe en el carrito
        const existingProductIndex = existingCart.findIndex(product => product.company_product_id === newProduct.company_product_id);

        if (existingProductIndex !== -1) {
            // Si el producto ya existe, solo sumar la cantidad
            existingCart[existingProductIndex].minimum_order = (existingCart[existingProductIndex].minimum_order || 0) + (newProduct.minimum_order || 0);
        } else {
            // Si no existe, agregar el producto al carrito
            newProduct.minimum_order = newProduct.minimum_order || 0; // Asigna una cantidad inicial
            existingCart.push(newProduct);
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem("CartProduct", JSON.stringify(existingCart));
        
        // Limpiar el producto seleccionado
        localStorage.removeItem("selectedProduct");
        
        // Redirigir al carrito
        router.push("/cartshop");
    }
};

  const handleCompanyId = () => {
   
  }

  const handleProductId = () => {
    router.push("/supplierhistoryproduct");
  }

  return (
    <div className="md:flex flex-col pt-[2rem] pb-[2rem] ">
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col w-[40%] border-[1px] border-black border-solid ">
          <figure className={styles.MainPicture}>
            <img src={company_product_img} alt="MainProduct" className="w-[30rem] m-auto object-cover " />
          </figure>
          <figure className="flex flex-row mt-[2rem] justify-evenly">
            <img src={company_product_img} alt="MainProduct" className="w-[9rem] h-auto mr-[1rem] " />
            <img src={company_product_img} alt="MainProduct" className="w-[9rem] h-auto mr-[1rem] " />
            <img src={company_product_img} alt="MainProduct" className="w-[9rem] h-auto mr.[1rem] " />
          </figure>
        </div>
        <div className="border-[1px] border-black border-solid w-[45%] relative overflow-hidden  ">
          <table className={styles.CustomTable}>
            <tbody>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Name: </td>
                <td className={styles.ColRight} > {company_product_name} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Variety: </td>
                <td className={styles.ColRight} > {category_id} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Origin: </td>
                <td className={styles.ColRight} > {origin} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Harvest Date: </td>
                <td className={styles.ColRight} > {harvest_date} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Price per kl: </td>
                <td className={styles.ColRight} > $ {company_price_x_kg} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Minimum Order:</td>
                <td className={styles.ColRight} > {minimum_order} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.ColLeft}> Stock: </td>
                <td className={styles.ColRight} > {stock} </td>
              </tr>
            </tbody>
          </table>
          <div className="border-black border-solid border-[1px] m-auto absolute bottom-0 ">
            <p className="p-[2rem] " > {company_product_description} </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-evenly mt-[2rem] ">
        <div className="flex flex-row  w-[65%] border-[1px] border-solid border-black " >

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
                <td className={styles.RightCol}> {fat} </td>
              </tr>
              <tr className={styles.Row}>
                <td className={styles.LeftCol}> Carbs: </td>
                <td className={styles.RightCol}> {carbs} </td>
              </tr>
            </tbody>
          </table>

          <table className={styles.TableTwoColumns} style={{ marginLeft: "auto" }}>
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
        <div className="flex flex-col w-[20%] border-[1px] border-solid border-black ">
          <button onClick={handleAddShop} className={styles.ButtonCartshop} > Add to cart </button>
          <button onClick={handleCompanyId} className={styles.ButtonSupplier}> Supplier </button>{styles.ButtonSuppier}
          <button onClick={handleProductId} className={styles.ButtonSupply} > Supply chain </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;