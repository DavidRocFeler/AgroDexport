"use client";

import React, { useEffect, useState } from "react";
import ListCard from "@/components/ListCard";
import ProductDetail from "@/components/ProductDetail";
import { IAgriProduct } from "@/interface/types";

const AllDetailView: React.FC = () => {
  const [productData, setProductData] = useState<IAgriProduct | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null); // Cambiado a string | null

  useEffect(() => {
    const getAndClearProductData = () => {
      // Recupera el producto de `localStorage`
      const product = localStorage.getItem("selectedProduct");
      if (product !== null) {
        setProductData(JSON.parse(product) as IAgriProduct); // Parsear el producto a IAgriProduct
      }

      // Limpiar el producto después de obtenerlo

      // Recupera y limpia el ID de la empresa
      const companyId = localStorage.getItem("companyId");
      if (companyId !== null) {
        setCompanyId(companyId); // Asigna el ID de la empresa si no es null
      }

      return { product, companyId };
    };

    // Llama a la función y actualiza los estados
    getAndClearProductData();
  }, []);

  return (
    <>
      {productData && <ProductDetail {...productData} />}
      {/* {companyId && <ListCard companyId={companyId} />} */}
    </>
  );
};

export default AllDetailView;
