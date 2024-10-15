import React from 'react';
import MarketView from "@/views/MarketView";
import Footer from "@/components/Footer";

const Market: React.FC = () => {
  return (
    <>
      <div><MarketView /></div>
      <div>Vista del catalogo de productos</div>
      <Footer />
    </>
  )
};

export default Market;
