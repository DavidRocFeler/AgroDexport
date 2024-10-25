import React from "react";
import styles from "../styles/CarShopComponent.module.css";
import ResumeShopComponent from "@/components/ResumeShopComponent";
import LabelComponent from "./LabelComponent";
import { IAgriProduct, IOrder } from "@/interface/types";

export interface OrderCarWishProps {
    order?: IOrder;
    products?: IAgriProduct[];
    viewType: 'carShop' | 'ordersView' | 'wishListView';
}

const OrderCarWish: React.FC<OrderCarWishProps> = ({ order, products, viewType }) => {
    const productMap: { [key: string]: { product: IAgriProduct; units: number } } = {};

    const itemsToRender = order?.products || products || [];

    // Modificamos este if para renderizar los componentes vacíos
    if (itemsToRender.length === 0) {
        return (
            <div className={styles.MainContent}>
                <div className={styles.LabelContent}>
                    <LabelComponent 
                        product={undefined} // Pasamos undefined como producto
                        units={0} 
                        viewType={viewType}
                        orderStatus={undefined}
                    />
                    <hr />
                </div>
                <ResumeShopComponent products={[]} /> {/* Pasamos productos vacíos */}
            </div>
        );
    }

    // Mapeamos los productos solo si hay items en `itemsToRender`
    itemsToRender.forEach((product) => {
        // Convertimos `company_id` a string para garantizar que la clave sea de tipo string
        const companyId = String(product.company_id);
    
        if (productMap[companyId]) {
            productMap[companyId].units += 1;
        } else {
            productMap[companyId] = { product, units: 1 };
        }
    });
    

    return (
        <div className={styles.MainContent}>
            <div className={styles.LabelContent}>
                {Object.values(productMap).map(({ product, units }) => (
                    <React.Fragment key={product.company_id}>
                        <LabelComponent 
                            product={product} 
                            units={units} 
                            viewType={viewType}
                            orderStatus={viewType === 'ordersView' && order ? {
                                status: order.status,
                                date: new Date(order.date).toDateString()
                            } : undefined}
                        />
                        <hr />
                    </React.Fragment>
                ))}
            </div>
            <ResumeShopComponent products={itemsToRender} />
        </div>
    );
};

export default OrderCarWish;
