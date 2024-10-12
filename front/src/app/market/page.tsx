import React from 'react';
import MarketView from "@/views/MarketView";
import Footer from "@/components/Footer";
import ProductCard from '@/components/ProductCard';

const Market: React.FC = () => {
  return (
    <>
      <div><MarketView /></div>
      <div>Vista del catalogo de productos</div>
      <ProductCard />
      <Footer />
    </>
  )
};

export default Market;
