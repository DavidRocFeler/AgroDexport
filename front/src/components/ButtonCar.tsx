import React from "react";
import Swal from "sweetalert2";
import { ILabelComponentProps } from "@/interface/types";
// import { createOrder } from "@/helpers/orders.helper";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../styles/ButtonSend.module.css"

const ButtonCar: React.FC<ILabelComponentProps> = ({ product, units, viewType, orderStatus }) => {
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const handleDisabled = () => {
        const storedCart = JSON.parse(localStorage.getItem("cartProduct") || "[]");
        setIsDisabled(storedCart.length === 0); // Deshabilita el botón si el carrito está vacío
    };

    useEffect(() => {
        handleDisabled(); // Llama a la función al montar el componente
    }, []);
    
    // const handleCartClick = async () => {
    //     const storedCart = JSON.parse(localStorage.getItem("cartProduct") || "[]");
    //     const userData = JSON.parse(localStorage.getItem("userSession")!);

    //     const idProducts = storedCart?.map((product: { id: number }) => product.id);
    //     await createOrder(idProducts, userData?.token!);

    //     Swal.fire({
    //         icon: "success",
    //         title: "Product purchased",
    //         showConfirmButton: false,
    //         timer: 1500
    //     }).then(() => {
    //         router.push("/dashboard/orders");
    //     });

    //     // Reset cart
    //     localStorage.setItem("cartProduct", "[]");
    // };

    // const handleClick = () => {
    //     if (viewType === "carShop") {
    //         handleCartClick();
    //     }
    // };

    return (
        <>
            {viewType === "carShop" && (
                <button className={styles.Order} disabled={isDisabled}>
                    Order now
                </button>
            )}
        </>
    );
};


export default ButtonCar;
