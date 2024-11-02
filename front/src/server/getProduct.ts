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

export const getCategories = async (): Promise<any[]> => {
  try {
      const res = await fetch(`${APIURL}/categories`, {
          method: "GET",
          headers: {
              "Content-type": "application/json",
          },
      });

      if (!res.ok) {
          throw new Error("Error fetching categories");
      }

      return await res.json();
  } catch (error: any) {
      throw new Error(error.message || "Unexpected error");
  }
};

export const getCompanyProducts = async (companyId: string): Promise<any[]> => {
  try {
    const res = await fetch(`${APIURL}/company-products/company/${companyId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("You currently have no products loaded for this company.");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error fetching company products");
  }
};


export const deleteCompanyProduct = async (productId: string, token: string): Promise<void> => {
  try {
    const res = await fetch(`${APIURL}/company-products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error deleting company product");
    }
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error deleting company product");
  }
};

export const updateCompanyProduct = async (productId: string, productData: Record<string, any>, token: string): Promise<void> => {
  try {
    const res = await fetch(`${APIURL}/company-products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      throw new Error("Error updating company product");
    }
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error updating company product");
  }
};

// Suponiendo que el tipo devuelto es un objeto con company_product_id
export const createCompanyProduct = async (
  productData: any,
  token: string
): Promise<{ company_product_id: string }> => {
  try {
    const res = await fetch(`${APIURL}/company-products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      throw new Error("Error creating company product");
    }

    const data = await res.json();
    return { company_product_id: data.company_product_id }; // Devuelve el ID en la estructura correcta
  } catch (error) {
    throw new Error("Unexpected error creating company product");
  }
};

export const getProductById = async (companyId: string, productId: string): Promise<IAgriProduct> => {
  try {
    const url = `${APIURL}/company-products/company/${companyId}/product/${productId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    if (!res.ok) throw new Error("Error fetching product by ID");

    const product: IAgriProduct = await res.json();
    return product;
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error fetching product by ID");
  }
};





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