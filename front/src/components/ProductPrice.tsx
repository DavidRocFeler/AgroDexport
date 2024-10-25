import React from "react";

const PriceProduct: React.FC<{ company_price_x_kg?: number | any}> = ({company_price_x_kg}) => {
    return(
        <>
            <p className="text-end"> $ {company_price_x_kg}.00 </p>
        </>
    )
}

export default PriceProduct;