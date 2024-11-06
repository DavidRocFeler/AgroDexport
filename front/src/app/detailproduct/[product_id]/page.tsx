import React from "react";
import AllDetailView from "@/views/AllDetailView";

const DetailProduct: React.FC<{params: {company_id: string}}> = ({params}) => {
    console.log(params.company_id)
    return(
        <>
            <AllDetailView/>
        </>
    )
}

export default DetailProduct;