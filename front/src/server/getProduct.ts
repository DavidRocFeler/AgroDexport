import { IAgriProduct } from "@/interface/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getProductDB(): Promise<IAgriProduct[]> {
    try {
        const res = await fetch(`${APIURL}/company-products`, {
            next: { revalidate: 1200}
        })
        const products: IAgriProduct[] = await res.json();
        return products;
    } catch (error: any) {
        throw Error(error)
    }
}

// export async function getProductByCategorieId(categoryId: string): Promise<IAgroProduct[]> {
//     try {
//         const product: IAgroProduct[] = await getProductDB();
//         const productFiltered = product.filter((product) => product.categoryId.toString() === categoryId);
//         if(!productFiltered.length) throw new Error("Product by id not found")
//             return productFiltered;
//     } catch (error: any) {
//         throw new Error(error)
//     }
// };