import React from "react";
import ListCard from "@/components/ListCard";
import ProductDetail from "@/components/ProductDetail";
import { exampleProduct } from "@/helpers/Product.helpers";

const AllDetailView: React.FC= () => {
    const product = exampleProduct;
    return(
        <>
            <ProductDetail
            key={product.id}
            {...product}
            />            
            <ListCard 
            />
        </>
    )
}

export default AllDetailView;