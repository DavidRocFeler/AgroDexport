// CarShopComponent.tsx
"use client"
import React, { useState } from 'react';
import LabelComponent from './LabelComponent';
import { ILabelComponentProps, IAgriProduct } from '@/interface/types';
import ResumeShopComponent from './ResumeShopComponent';
import Swal from 'sweetalert2';
import { fetchCompanyById } from '@/server/companiesSetting';

const CarShopComponent: React.FC<ILabelComponentProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<IAgriProduct | null>(null);
  const [clientId, setClientId] = useState("");
  const [showPaypal, setShowPaypal] = useState(false);

  const handleProductSelect = (product: IAgriProduct) => {
    setSelectedProduct(selectedProduct?.company_product_id === product.company_product_id ? null : product);
  };

  const calculateTotals = () => {
    if (!selectedProduct || !selectedProduct.company_price_x_kg || !selectedProduct.minimum_order) {
      return { 
        subtotal: 0, 
        logisticsCost: 0, 
        tariff: 0, 
        tax: 0, 
        total: 0,
        productData: null 
      };
    }

    const subtotal = selectedProduct.company_price_x_kg * (selectedProduct.minimum_order * 1000);
    const logisticsCost = subtotal * 0.2;
    const tariff = (subtotal + logisticsCost) * 0.1;
    const tax = logisticsCost + (logisticsCost * 0.18);
    const total = subtotal + logisticsCost + tariff + tax;

    return {
      subtotal,
      logisticsCost,
      tariff,
      tax,
      total,
      productData: {
        company_id: selectedProduct.company_id,
        company_product_id: selectedProduct.company_product_id
      }
    };
  };
  
  const handlePaymentProcess = async () => {
  const totals = calculateTotals();
  
    if (!selectedProduct || !totals.productData) { // Verifica si productData es null
      Swal.fire({
        icon: 'warning',
        title: 'No product selected',
        text: 'Please select a product before proceeding with the payment',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
  
    try {
      // Obtén el `clientId` desde la API usando `companyId`
      const companyData = await fetchCompanyById(totals.productData.company_id);
      
      if (companyData && companyData.account_paypal) {
        setClientId(companyData.account_paypal); // Configura el clientId en el estado
        setShowPaypal(true); // Habilita la vista de PayPal
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Payment Error',
          text: 'PayPal account not found for this company.',
          confirmButtonColor: '#3085d6'
        });
      }
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'There was an error processing your payment. Please try again.',
        confirmButtonColor: '#3085d6'
      });
    }
  };
  
  return (
    <div className=" flex flex-row pl-[2rem] pr-[2rem] pt-[3rem] pb-[2rem]">
      <div className=" w-[60%]">
        {products && products.map((product) => (
          <div key={product.company_product_id}>
            <LabelComponent
              {...product}
              category_id={product.category_id || ''}
              isSelected={selectedProduct?.company_product_id === product.company_product_id}
              onSelect={() => handleProductSelect(product)}
            />
          </div>
        ))}
      </div>
      <div className="ml-auto w-[30%] flex flex-row justify-center">
        <ResumeShopComponent 
          totals={calculateTotals()} 
          onOrderClick={handlePaymentProcess}
          isProductSelected={!!selectedProduct}
        />
      </div>
    </div>
  );
};

export default CarShopComponent;