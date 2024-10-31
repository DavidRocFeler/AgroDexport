"use client"
import React, { useState, useEffect } from 'react';
import ProductSearch from "@/components/ProductSearch";
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getProductDB } from '@/server/getProduct';
import { IAgriProduct } from '@/interface/types';

const MarketView: React.FC = () => {
  const [products, setProducts] = useState<IAgriProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const ROWS = 3;
  const COLS = 4;
  const PRODUCTS_PER_PAGE = ROWS * COLS;

  const loadProducts = async (filters = {}) => {
    try {
      const data: IAgriProduct[] = await getProductDB(filters);
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("No se pudieron cargar los productos");
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

    // Nueva función para manejar el cambio de filtros
    const handleFilterChange = (filters: any) => {
      setCurrentPage(0); // Reiniciar la página al aplicar filtros
      loadProducts(filters); // Cargar productos con los nuevos filtros
    };

  return (
    <div className='pb-[3rem]' style={{ background: "white" }}>
      <Image src="/ImgMarketView.png" alt="Market View" layout="responsive" width={500} height={300} />
      <ProductSearch onFilterChange={handleFilterChange} />
      
      <div className='w-[95%] m-auto'>
        {error ? (
          <div>{error}</div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className='border-black border-[1px] border-solid relative overflow-hidden'>
                <div className='flex transition-transform duration-500 ease-in-out' 
                     style={{ transform: `translateX(-${currentPage * 100}%)` }}>
                  {Array.from({ length: Math.ceil(products.length / PRODUCTS_PER_PAGE) }).map((_, pageIndex) => (
                    <div 
                      key={pageIndex}
                      className='w-full flex-shrink-0'
                      style={{ minWidth: '100%' }}
                    >
                      <div className='grid grid-cols-4 gap-y-[3rem] gap-x-[3rem] p-6'>
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

                <div className="flex justify-between px-8 mt-6">
                  <button 
                    onClick={goLeft} 
                    disabled={!canGoLeft}
                    className={`px-4 py-2 rounded bg-green-500 text-white ${!canGoLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                  >
                    ← Prev
                  </button>
                  <span className="py-2">
                    {currentPage + 1} - {Math.ceil(products.length / PRODUCTS_PER_PAGE)}
                  </span>
                  <button 
                    onClick={goRight} 
                    disabled={!canGoRight}
                    className={`px-4 py-2 rounded bg-green-500 text-white ${!canGoRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">No se encontraron productos.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarketView;
