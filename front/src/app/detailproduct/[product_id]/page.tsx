import React from "react";
import AllDetailView from "@/views/AllDetailView";

const DetailProduct: React.FC<{params: {product_id: string}}> = ({params}) => {
    console.log(params.product_id)
    return(
        <>
            <AllDetailView/>
        </>
    )
}

export default DetailProduct;