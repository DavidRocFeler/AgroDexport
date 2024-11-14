"use client"
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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [lastFilters, setLastFilters] = useState({}); // Guardar los últimos filtros aplicados

  const ROWS = 3;
  const COLS = 4;
  const PRODUCTS_PER_PAGE = ROWS * COLS;

  const loadProducts = useCallback(async (filters = {}, page = 1, limit = PRODUCTS_PER_PAGE) => {
    setIsLoading(true);
    try {
      const data: IAgriProduct[] = await getProductDB(filters, limit, page);

      setProducts((prevProducts) => {
        const newProducts = data.filter((product) => product.isActive);
        return JSON.stringify(prevProducts) === JSON.stringify(newProducts) ? prevProducts : newProducts;
      });
      setError(null);

      setHasMoreProducts(data.length === limit);
      if (data.length === 0 && page > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Products could not be loaded");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const goLeft = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const goRight = () => {
    if (hasMoreProducts) {
      setCurrentPage((page) => page + 1);
    }
  };

  const handleFilterChange = (filters: any) => {
    if (JSON.stringify(filters) !== JSON.stringify(lastFilters)) {
      setLastFilters(filters);
      setCurrentPage(1);
      loadProducts(filters, 1, PRODUCTS_PER_PAGE);
    }
  };

  useEffect(() => {
    loadProducts(lastFilters, currentPage, PRODUCTS_PER_PAGE);
  }, [currentPage, loadProducts, lastFilters]);

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
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded flex flex-row bg-[#5c8b1b] text-white ${currentPage === 1 ? 'opacity-50' : 'hover:bg-[#6ea520]'}`}
                  >
                    <ArrowLeft/> Prev
                  </button>
                  <span className="py-2">
                    {currentPage} - {Math.ceil(120 / PRODUCTS_PER_PAGE)}
                  </span>
                  <button 
                    onClick={goRight} 
                    disabled={!hasMoreProducts}
                    className={`px-4 py-2 rounded flex flex-row bg-[#5c8b1b] text-white ${!hasMoreProducts ? 'opacity-50' : 'hover:bg-[#6ea520]'}`}
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
