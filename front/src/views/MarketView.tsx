import React from 'react'
import ProductSearch from "@/components/ProductSearch"
import Image from 'next/image'
import ProductCard from '@/components/ProductCard';

const MarketView: React.FC = () => {
  return (
    <>
      <Image src="/ImgMarketView.png" alt="Market View" layout="responsive" width={500} height={300} />
      <div>barra de busqueda</div>
      <ProductSearch />
      <ProductCard />
    </>
  )
}

export default MarketView
