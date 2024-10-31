import React, { useState } from "react";
import { TrashIcon, ShoppingCart } from "lucide-react";
import Swal from "sweetalert2"; // Importa SweetAlert
import { IOrderCarWishProps } from "@/interface/types";

const Accountant: React.FC<IOrderCarWishProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => {
        if (quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (quantity > 0) {
            const cartProducts = JSON.parse(localStorage.getItem("cartProduct") || "[]");
    
            // Crear un nuevo objeto del producto con la cantidad actual
            const newProduct = { ...product, quantity }; // Aquí se usa el quantity actual
    
            // Añadir el nuevo objeto al carrito
            cartProducts.push(newProduct);
    
            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("cartProduct", JSON.stringify(cartProducts));
            setQuantity(0); // Resetea la cantidad después de añadir
    
            Swal.fire({
                icon: 'success',
                title: 'Added product',
                text: `${quantity} unit(s) of ${product.name} added to the cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No units selected',
                text: `Please select a quantity before adding to the cart.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleRemoveFromCart = () => {
        if (quantity > 0) {
            const cartProducts = JSON.parse(localStorage.getItem("cartProduct") || "[]");
            const existingProductIndex = cartProducts.findIndex((item: any) => item.id === product.id);

            if (existingProductIndex > -1 && cartProducts[existingProductIndex].quantity > quantity) {
                // Restar la cantidad eliminada
                cartProducts[existingProductIndex].quantity -= quantity;
                localStorage.setItem("cartProduct", JSON.stringify(cartProducts));

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted product',
                    text: `${quantity} unit(s) of ${product.name} removed from the cart!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // Elimina el producto completamente si la cantidad es 0
                const updatedProducts = cartProducts.filter((item: any) => item.id !== product.id);
                localStorage.setItem("cartProduct", JSON.stringify(updatedProducts));

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted product',
                    text: `${product.name} removed from the cart!`,
                    showConfirmButton: false,
                    timer: 1000
                });
            }

            setQuantity(0); // Restablecer la cantidad a 0
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No units available',
                text: `There are no units to remove.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="flex flex-row items-center mt-5">
            <p className="mr-2"> Accountant:</p>
            <button onClick={handleDecrease} className="pt-1 pr-3 pb-1 pl-3 border-2 border-[#F6F6F6] text-[1rem] font-bold"> - </button>
            <span className="pt-1 pr-3 pb-1 pl-3 text-[0.9rem]">
                {quantity}
            </span>
            <button onClick={handleIncrease} className="pt-1 pr-3 pb-1 pl-3 border-2 border-[#F6F6F6] font-bold"> + </button>
            <button onClick={handleRemoveFromCart}> <TrashIcon className="h-6 w-6 text-black ml-3" /> </button>
            <button onClick={handleAddToCart}> <ShoppingCart className="h-6 w-6 text-black ml-3"/> </button>
        </div>
    );
};

export default Accountant;
