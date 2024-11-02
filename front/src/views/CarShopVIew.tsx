"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import CarShopComponent from "@/components/CarShopComponent";


const CarShopView: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Función para recuperar CartProduct de localStorage
        const loadCartProduct = () => {
            const cartProduct = localStorage.getItem("CartProduct");
            if (cartProduct) {
                // Convierte el string JSON a un objeto JavaScript
                setProducts(JSON.parse(cartProduct));
            }
            setIsLoading(false); // Cambia el estado de carga
        };

        loadCartProduct();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <CarShopComponent products={products} />
        </>
    );
}

export default CarShopView;
