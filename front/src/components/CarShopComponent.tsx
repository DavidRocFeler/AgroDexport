import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ILabelComponentProps, IAgriProduct } from '@/interface/types';
import { LabelComponent } from './LabelComponent';
import ResumeShopComponent from './ResumeShopComponent';

const MySwal = withReactContent(Swal);

interface PayPalComponentProps {
  amount: number;
  companyId: string; 
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

const PayPalButtonsComponent: React.FC<PayPalComponentProps> = ({ amount, companyId, onSuccess, onError }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE', 
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount.toString(),
                },
                custom_id: companyId, 
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            await actions.order.capture().then((details) => {
              MySwal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Your payment has been processed successfully.',
              });
              onSuccess?.(details);
            });
          }
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          onError?.(err);
        }}
      />
    </div>
  );
};

const CarShopComponent: React.FC<ILabelComponentProps> = ({ products }) => {
  const [productList, setProductList] = useState<IAgriProduct[]>(products); 
  const [selectedProduct, setSelectedProduct] = useState<IAgriProduct | null>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setProductList((prevProducts) => {
      return prevProducts.map(product => 
        product.company_product_id === productId
          ? { ...product, quantity } 
          : product
      );
    });
  };

  useEffect(() => {
    
    const storedProducts = localStorage.getItem('CartProduct');
    if (storedProducts) {
      setProductList(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    setProductList(products);
  }, [products]);

 
  const handleProductSelect = (product: IAgriProduct) => {
    setSelectedProduct((prevSelected) => {
      if (prevSelected?.company_product_id === product.company_product_id) {
        return null; 
      } else {
        return { 
          ...product, 
          quantity: product.quantity !== undefined ? product.quantity : product.minimum_order}; 
      }
    });
  };
  

  const handleRemoveProduct = (productId: string) => {
    setProductList((prevProducts) => {
      const updatedProducts = prevProducts.filter(product => product.company_product_id !== productId);
      
      localStorage.setItem('CartProduct', JSON.stringify(updatedProducts));

      if (selectedProduct?.company_product_id === productId) {
        setSelectedProduct(null);
      }
      
      return updatedProducts;
    });
  };
 
  const calculateTotals = () => {
    if (!selectedProduct || !selectedProduct.company_price_x_kg || !selectedProduct.quantity) {
      return { 
        subtotal: 0, 
        logisticsCost: 0, 
        tariff: 0, 
        tax: 0, 
        total: 0,
        productData: null 
      };
    }
  
    const subtotal = selectedProduct.company_price_x_kg * (selectedProduct.quantity * 1000);
    const logisticsCost = subtotal * 0.2;
    const tariff = (subtotal + logisticsCost) * 0.1;
    const tax = logisticsCost + (logisticsCost * 0.18);
    const suma = subtotal + logisticsCost + tariff + tax;
    const total = parseFloat(suma.toFixed(2))

    return {
      subtotal,
      logisticsCost,
      tariff,
      tax,
      total,
      productData: {
        company_id: selectedProduct.company_id,
      }
    };
  };

  const fetchCompanyData = async (companyId: string) => {
    try {
      const response = await fetch(`http://localhost:3002/companies/user/accountPaypal/${companyId}`);
      const data = await response.json()
      setCompanyData(data); 
    } catch (error) {
      console.error("Error fetching company data:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Error loading company data',
        text: 'Could not load company information. Please try again later.',
      });
    }
  };


  const handlePaymentProcess = async () => {
    if (!selectedProduct || isProcessing) return;
  
    setIsProcessing(true);
    try {
      
      await fetchCompanyData(selectedProduct.company_id);
      const companyId = selectedProduct.company_id; 
      const companyAccount = companyData.account_paypal
  
  
      if (!companyAccount) {
        throw new Error('PayPal account not found for this company');
      }
  
      const totals = calculateTotals();
      
      if (totals.productData) {
        MySwal.fire({
          title: 'Complete Your Payment',
          html: (
            <PayPalScriptProvider
              options={{
                clientId: companyAccount, 
                currency: "USD",
                intent: "capture",
              }}
            >
              <PayPalButtonsComponent
                amount={totals.total}
                companyId={totals.productData.company_id} 
                onSuccess={(details) => {
                  console.log('Payment successful:', details);
                  MySwal.close();
                }}
                onError={(error) => {
                  console.error('Payment failed:', error);
                  MySwal.fire({
                    icon: 'error',
                    title: 'Payment Failed',
                    text: 'There was an error processing your payment. Please try again.',
                  });
                }}
              />
            </PayPalScriptProvider>
          ),
          showConfirmButton: false,
          showCloseButton: true,
          customClass: {
            popup: 'paypal-popup-class',
          },
        });
      } else {
        throw new Error('Product data is not available.');
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: error instanceof Error ? error.message : 'There was an error processing your payment. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .paypal-popup-class {
        width: 500px !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex flex-row pl-[2rem] pr-[2rem] pt-[3rem] pb-[2rem]">
      <div className="w-[60%]">
      {productList.map((product) => (
          <div key={product.company_product_id}>
            <LabelComponent
              {...product}
              category_id={product.category_id || ''}
              isSelected={selectedProduct?.company_product_id === product.company_product_id}
              onSelect={() => handleProductSelect(product)}
              onRemove={() => handleRemoveProduct(product.company_product_id)}
              onQuantityChange={(quantity: number) => handleQuantityChange(product.company_product_id, quantity)} // Manejar cambio de cantidad
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