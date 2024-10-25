import React, { useEffect, useState } from "react";
import styles from "../styles/ResumeShop.module.css";
import PriceProduct from "./ProductPrice";
import { IAgriProduct, IUserSession } from "@/interface/types";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ButtonCar from "./ButtonCar";

const ResumeShopComponent: React.FC<{ products: IAgriProduct[] }> = ({ products }) => {
 
    const subtotal = products.reduce((acc, product) => acc + product.company_price_x_kg, 0);
    const [ cart, setCart ] = useState<IAgriProduct[]>([]);
    const [ totalCart, setTotalCart ] = useState<number>(0)
    const [ userData, setUserData ] = useState<IUserSession>();
    const router = useRouter();
    const pathname = usePathname(); 

    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage) {
            const storedCart = JSON.parse(localStorage.getItem("cartProduct") || "[]")
            if(storedCart) {
                let totalCart = 0; 
                storedCart?.map((item: IAgriProduct) => {
                    totalCart = totalCart + item.company_price_x_kg
                })
                setTotalCart(totalCart);
                setCart(storedCart);
            }
        }
    }, [])

    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage) {
            const userData = JSON.parse(localStorage.getItem("userSession")!)
            setUserData(userData);
        }
    }, [])
    
    const subtotalProduct: IAgriProduct = {
        company_id: "", 
        company_product_name: "Subtotal",
        company_product_description: "",  
        company_price_x_kg: subtotal, 
        company_product_img: ""
    };

    const isCarShop = pathname === "/carshop";

    return (
        <div className={styles.Resumen}>
            <h1 className="">Resume</h1>
            <div className={styles.SubTotal}>
                <h2>Subtotal</h2>
                <PriceProduct {...subtotalProduct} />
            </div>
            <div className={styles.Total}>
                <h2>Total</h2>
                <PriceProduct {...subtotalProduct} />
            </div>
            <div className={styles.Description}>
                Lorem ipsum Lorem ipsum Lorem ipsum
            </div>
            {isCarShop && (
                <ButtonCar viewType="carShop" product={undefined} units={0} orderStatus={undefined} />
            )}
        </div>
    );
};

export default ResumeShopComponent;
