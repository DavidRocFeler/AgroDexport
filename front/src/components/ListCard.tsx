import React from 'react'
import { useState } from 'react';
import { IAgriProduct, ICompany } from '@/interface/types';
import { getProductByCompanyId} from '@/server/getProduct';
import { useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Loading from '@/components/Loading';
import ProductCard from './ProductCard';
import { IListCardProps } from '@/interface/companyTypes';
import { getCompanySettings } from '@/server/getCompanyById';
import { useUserStore } from '@/store/useUserStore';

const ListCard: React.FC<IListCardProps> = ({companyId}) => {
  const [products, setProducts] = useState<IAgriProduct[]>([]);
  const [companyData, setCompanyData] = useState<ICompany | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(0);
  const [companyName, setCompanyName] = useState<string>('');
  const { token } = useUserStore();

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selectedProduct = localStorage.getItem('selectedProduct');

      if (selectedProduct) {
        try {
          const product: IAgriProduct = JSON.parse(selectedProduct);

          // Verifica que el objeto tenga el formato correcto
          if (product && product.company && product.company.company_name) {
            setCompanyName(product.company.company_name);
          } else {
            console.warn("El formato de selectedProduct no es el esperado.");
          }
        } catch (error) {
          console.error("Error al parsear el JSON de localStorage:", error);
        }
      }
    }
  }, []);

  const ROWS = 1;
  const COLS = 4;
  const PRODUCTS_PER_PAGE = ROWS * COLS;

  const getSupplier = async () => {
    if(token) {
      try {
        const data = await getCompanySettings(companyId, token)
        setCompanyData(data)
        // console.log(data)
      } catch (error) {
        console.error("failled to get company")
      }
    }
  }

  useEffect(() => {
    getSupplier();
  }, [])

  useEffect(() => {
    if (companyData) {
      // Aseguramos que solo se ejecute en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('profileCompanyClient', JSON.stringify(companyData));
      }
    }
  }, [companyData]);
  
  const loadProducts = async () => {
    setIsLoading(true); 
    try {
      const data: IAgriProduct[] = await getProductByCompanyId(companyId);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("No se pudieron cargar los productos");
    } finally {
      setIsLoading(false); 
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

  return (
    <div className='w-[95%] m-auto bg-gray-50'>
      <p style={{fontFamily: "Times New Roman"}} className='text-[3rem] mb-[3rem] w-fit m-auto'> More products from {companyName} </p>
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
              <div>No there products available</div>
            )}
          </>
        )}
      </div>
  )
}

export default ListCard
