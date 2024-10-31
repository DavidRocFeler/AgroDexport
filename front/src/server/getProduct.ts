import { IAgriProduct } from "@/interface/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductDB(filters: any = {}): Promise<IAgriProduct[]> {
  try {
    // Construir query params desde el objeto de filtros
    const queryParams = new URLSearchParams();

    // Iterar sobre los filtros y agregar al queryParams
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = `${APIURL}/company-products?${queryParams.toString()}`;

    const res = await fetch(url, {
      next: { revalidate: 1200 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products: IAgriProduct[] = await res.json();
    return products;
  } catch (error: any) {
    throw Error(error.message || "Unexpected error while fetching products");
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