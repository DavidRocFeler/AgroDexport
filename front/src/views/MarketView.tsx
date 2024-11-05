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
  const [isLoading, setIsLoading] = useState(true); // Controla solo la carga de las cards
  const [currentPage, setCurrentPage] = useState(0);

  const ROWS = 3;
  const COLS = 4;
  const PRODUCTS_PER_PAGE = ROWS * COLS;

  const loadProducts = async (filters = {}) => {
    setIsLoading(true); // Inicia la carga solo para las cards
    try {
      const data: IAgriProduct[] = await getProductDB(filters);
      setProducts(data.filter(product => product.isActive));
      setError(null);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("No se pudieron cargar los productos");
    } finally {
      setIsLoading(false); // Finaliza la carga solo para las cards
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const canGoLeft = currentPage > 0;
  const canGoRight = currentPage < totalPages - 1;

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
    setCurrentPage(0);
    loadProducts(filters);
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
        ) : isLoading ? ( // Muestra Loading solo para las cards
          <Loading />
        ) : (
          <>
            {products.length > 0 ? (
              <div className='relative overflow-hidden'>
                <div className='flex transition-transform duration-500 ease-in-out' 
                     style={{ transform: `translateX(-${currentPage * 100}%)` }}>
                  {Array.from({ length: Math.ceil(products.length / PRODUCTS_PER_PAGE) }).map((_, pageIndex) => (
                    <div 
                      key={pageIndex}
                      className='w-full flex-shrink-0'
                      style={{ minWidth: '100%' }}
                    >
                      <div className='grid grid-cols-4 gap-y-[3rem] gap-x-[3rem]'>
                        {products
                          .slice(pageIndex * PRODUCTS_PER_PAGE, (pageIndex + 1) * PRODUCTS_PER_PAGE)
                          .map((product) => (
                            <ProductCard 
                              key={String(product.company_product_id)}
                              {...product}
                            />
                          ))}
                      </div>
                    </div>
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
                    {currentPage + 1} - {Math.ceil(products.length / PRODUCTS_PER_PAGE)}
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
              <div>No hay productos disponibles</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarketView;
