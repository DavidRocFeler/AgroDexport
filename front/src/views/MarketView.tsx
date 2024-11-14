"use client"
import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const ROWS = 3;
  const COLS = 4;
  const PRODUCTS_PER_PAGE = ROWS * COLS;

  const loadProducts = async (filters = {}, page = 1, limit = PRODUCTS_PER_PAGE) => {
    setIsLoading(true);
    try {
      const data: IAgriProduct[] = await getProductDB(filters, limit, page);

      // Actualizar productos solo si hay datos en la respuesta
      setProducts(data.filter(product => product.isActive));
      setError(null);

      // Verificar si hay más productos en la página actual
      setHasMoreProducts(data.length === limit);
      
      // Si no hay productos y no es la primera página, volver a la página anterior
      if (data.length === 0 && page > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Products could not be loaded");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts({}, currentPage, PRODUCTS_PER_PAGE);
  }, [currentPage]); // Asegura la recarga cada vez que cambia `currentPage`

  const canGoLeft = currentPage > 1;
  const canGoRight = hasMoreProducts;

  const goLeft = () => {
    if (canGoLeft) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goRight = () => {
    if (canGoRight) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (filters: any) => {
    setCurrentPage(1);
    loadProducts(filters, 1, PRODUCTS_PER_PAGE);
  };

  return (
    <div className='pb-[3rem]' style={{ background: "white" }}>
      <div className='relative'>
        <Image src="https://res.cloudinary.com/deflfnoba/image/upload/v1730597274/Front/zacjtoy7yhx5bbms8ckg.png" alt="Market View" layout="responsive" width={500} height={300} />
        <p className='text-[5rem] text-white w-[30rem] leading-[5rem] absolute top-[5rem] left-[4rem]' style={{ fontFamily: 'Times New Roman' }}> Track your product in real time </p>
      </div>
      <ProductSearch onFilterChange={handleFilterChange} />

      <div className='w-[95%] m-auto'>
        {error ? (
          <div>{error}</div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            {products.length > 0 ? (
              <div className='relative overflow-hidden'>
                <div className='grid grid-cols-4 gap-y-[3rem] gap-x-[3rem]'>
                  {products.map((product) => (
                    <ProductCard 
                      key={String(product.company_product_id)}
                      {...product}
                    />
                  ))}
                </div>

                <div className="flex justify-between px-8 mt-[4rem]">
                  <button 
                    onClick={goLeft} 
                    disabled={!canGoLeft}
                    className={`px-4 py-2 rounded flex flex-row bg-[#5c8b1b] text-white ${!canGoLeft ? 'opacity-50' : 'hover:bg-[#6ea520]'}`}
                  >
                    <ArrowLeft/> Prev
                  </button>
                  <span className="py-2">
                    {currentPage} - {Math.ceil(120 / PRODUCTS_PER_PAGE)}
                  </span>
                  <button 
                    onClick={goRight} 
                    disabled={!canGoRight}
                    className={`px-4 py-2 rounded flex flex-row bg-[#5c8b1b] text-white ${!canGoRight ? 'opacity-50' : 'hover:bg-[#6ea520]'}`}
                  >
                    Next <ArrowRight/>
                  </button>
                </div>
              </div>
            ) : (
              <div>Products could not be loaded</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarketView;
