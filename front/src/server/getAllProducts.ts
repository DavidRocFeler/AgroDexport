// import { IAgroProduct } from "@/interface/types";
// import { useUserStore } from "@/store/useUserStore";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const getAllProducts = async (): Promise<IAgroProduct[]> => {
//   const { token } = useUserStore.getState();

//   try {
//     const res = await fetch(`${API_URL}/company-products`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Error obtaining products data");
//     }

//     const data: IAgroProduct[] = await res.json();
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message || "Unexpected error");
//   }
// };

import { IAgroProduct } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async (): Promise<IAgroProduct[]> => {
  const { token } = useUserStore.getState();

  try {
    const res = await fetch(`${API_URL}/company-products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error obtaining products data");
    }

    const data: IAgroProduct[] = await res.json();

    // Verificar que las imágenes existan y sean válidas
    const processedData = data.map((product) => ({
      ...product,
      images:
        product.images?.filter((img) => img && img.trim().length > 0) || [],
    }));

    console.log("Processed products data:", processedData);
    return processedData;
  } catch (error: any) {
    console.error("Error in getAllProducts:", error);
    throw new Error(error.message || "Unexpected error");
  }
};
