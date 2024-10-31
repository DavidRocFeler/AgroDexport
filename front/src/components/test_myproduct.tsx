"use client";
import React, { useEffect, useState } from "react";
import { getProductDB } from "@/server/getProduct"; // Asegúrate de que la ruta sea correcta
import { IAgriProduct } from "@/interface/types";

const TestFetchComponent: React.FC = () => {
  const [products, setProducts] = useState<IAgriProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductDB();
        console.log("Fetched data:", data); // Verificar los datos en la consola
        setProducts(data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li> // Asegúrate de que `name` sea una propiedad válida
        ))}
      </ul>
    </div>
  );
};

export default TestFetchComponent;
