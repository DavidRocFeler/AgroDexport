"use client";
import React, { useState, useEffect, useCallback } from 'react';
import ProductSearch from "@/components/ProductSearch";
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getProductDB } from '@/server/getProduct';
import { IAgriProduct } from '@/interface/types';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Loading from '@/components/Loading';

const MarketView: React.FC = () => {
  const [products, setProducts] = useState<IAgriProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Evitar iniciar en `true`
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [lastFilters, setLastFilters] = useState({});

  const ROWS = 3;
  const COLS = 4;
  const PRODUCTS_PER_PAGE = ROWS * COLS;

  // Función para cargar productos
  const loadProducts = useCallback(async (filters = {}, page = 1, limit = PRODUCTS_PER_PAGE) => {
    if (isLoading) return; // Evitar múltiples solicitudes simultáneas
    setIsLoading(true);
    setProducts([]); // Limpia los productos mientras carga
    try {
      const data: IAgriProduct[] = await getProductDB(filters, limit, page);
      console.log(`Loaded products for page ${page}:`, data);

      if (data.length > 0) {
        setProducts(data.filter(product => product.isActive));
        setHasMoreProducts(data.length === limit);
      } else {
        setCurrentPage(1); // Si no hay productos, reinicia a la página 1
        setHasMoreProducts(false); // No hay más productos para cargar
      }
      setError(null);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("No se pudieron cargar los productos");
    } finally {
      setIsLoading(false); // Asegurarse de que el loading finalice
    }
  }, [isLoading]);

  // Efecto para cargar productos al cambiar de página o filtros
  useEffect(() => {
    loadProducts(lastFilters, currentPage, PRODUCTS_PER_PAGE);
  }, [currentPage, lastFilters]); // Dependencias mínimas para evitar bucles

  const goLeft = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const goRight = () => {
    if (hasMoreProducts) {
      setCurrentPage(prev => prev + 1);
    } else {
      setCurrentPage(1); // Volver a la página 1 si no hay más productos
    }
  };

  const handleFilterChange = (filters: any) => {
    setLastFilters(filters);
    setCurrentPage(1); // Reinicia la página al cambiar filtros
  };

  return (
    <div className="pb-[3rem]" style={{ background: "white" }}>
      <div className="relative">
        <Image
          src="https://res.cloudinary.com/deflfnoba/image/upload/v1730597274/Front/zacjtoy7yhx5bbms8ckg.png"
          alt="Market View"
          layout="responsive"
          width={500}
          height={300}
          priority
        />
        <p className="text-[5rem] text-white w-[30rem] leading-[5rem] absolute top-[5rem] left-[4rem]" style={{ fontFamily: 'Times New Roman' }}>
          Track your product in real time
        </p>
      </div>
      <ProductSearch onFilterChange={handleFilterChange} />

      <div className="w-[95%] m-auto">
        {error ? (
          <div>{error}</div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            {products.length > 0 ? (
              <div className="relative overflow-hidden">
                <div className="grid grid-cols-4 gap-y-[3rem] gap-x-[3rem]">
                  {products.map(product => (
                    <ProductCard key={product.company_product_id} {...product} />
                  ))}
                </div>

                <div className="flex justify-between px-8 mt-[4rem]">
                  <button
                    onClick={goLeft}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded flex flex-row bg-[#5c8b1b] text-white ${
                      currentPage === 1 ? 'opacity-50' : 'hover:bg-[#6ea520]'
                    }`}
                  >
                    <ArrowLeft /> Prev
                  </button>
                  <span className="py-2">Page {currentPage}</span>
                  <button
                    onClick={goRight}
                    disabled={!hasMoreProducts}
                    className={`px-4 py-2 rounded flex flex-row bg-[#5c8b1b] text-white ${
                      !hasMoreProducts ? 'opacity-50' : 'hover:bg-[#6ea520]'
                    }`}
                  >
                    Next <ArrowRight />
                  </button>
                </div>
              </div>
            ) : (
              <div>No hay productos disponibles</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarketView;
