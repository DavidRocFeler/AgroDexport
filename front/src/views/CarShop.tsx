// "use client";
// import OrderCarWish from "@/components/OrderCarWishComponent";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { IAgriProduct } from "@/interface/types";
// import Loading from "@/components/Loading";

// const CarShopView = () => {
//     const router = useRouter();
//     const [products, setProducts] = useState<IAgriProduct[]>([]);
//     const [ isLoading, setIsLoading ] = useState(true);

//     useEffect(() => {
//         const session = localStorage.getItem('userState');
//         if (!session) {
//             setIsLoading(true);
//             setTimeout(() => {
//                 router.replace('/404');
//             }, 3000)
//         } else {
//             setIsLoading(false);
//             const storedProduct = localStorage.getItem("cartProduct");
//             if (storedProduct) {
//                 const productData: IAgriProduct[] = JSON.parse(storedProduct);
//                 setProducts(productData);
//             }
//         }
//     }, []);

//     if(isLoading) {
//         return <Loading/>
//     }

//     return (
//         <>
//             <OrderCarWish products={products} viewType="carShop" />
//         </>
//     );
// }

// export default CarShopView;