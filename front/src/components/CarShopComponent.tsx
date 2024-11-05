import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ILabelComponentProps, IAgriProduct, IOrderDetail } from '@/interface/types';
import { LabelComponent } from './LabelComponent';
import ResumeShopComponent from './ResumeShopComponent';
import { useUserStore } from "@/store/useUserStore";
import { cancelOrder, createOrder, fetchCompanyData, finishedOrder } from '@/server/postOrder';
import { useRouter } from 'next/navigation'; 


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
  const { role_name, token, user_id } = useUserStore();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const handleCompanySelect = (companyId: string) => {setSelectedCompanyId(companyId); };
  const [totals, setTotals] = useState<any>(null);
  const router = useRouter();
 
  

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

  useEffect(() => {
    setTotals(calculateTotals());
  }, [selectedProduct]);

 
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
        discount: 0, 
        total: 0,
        productData: null 
      };
    }
  
    const subtotal = selectedProduct.company_price_x_kg * (selectedProduct.quantity * 1000);
    const logisticsCost = subtotal * 0.2;
    const tariff = (subtotal + logisticsCost) * 0.1;
    const tax = logisticsCost + (logisticsCost * 0.18);
    const discount = (selectedProduct.discount / 100) * subtotal; 
    const suma = subtotal + logisticsCost + tariff + tax - discount ;
    const total = parseFloat(suma.toFixed(2))
   
    

    return {
      subtotal,
      logisticsCost,
      tariff,
      tax,
      discount,
      total,
      productData: {
        company_id: selectedProduct.company_id,
      }
    };
  };

  const fetchCreateOrder = async () => {

    if (!selectedProduct) {
      return MySwal.fire({
        icon: 'warning',
        title: 'No Product Selected',
        text: 'Please select a product before placing the order.',
      });
    }
    
    const totals = calculateTotals();
   
  
    const orderDetail: IOrderDetail = {
      company_buyer_id: selectedCompanyId,
      company_supplier_id: selectedProduct.company_id,
      product_one_id: selectedProduct.company_product_id,
      quantity_product_one: selectedProduct.quantity,
      subtotal: totals.subtotal,
      logistic_cost: totals.logisticsCost,
      tariff: totals.tariff,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
    };

    try {

      const createdOrder = await createOrder (orderDetail, token);
      const orderId = createdOrder.order.order_id
      


      await MySwal.fire({
        icon: 'success',
        title: 'Order Successful',
        text: 'Your order has been created successfully.',
      });
      handlePaymentProcess(orderId, token);
    } catch (error) {
      console.error('Error creating order:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Order Error',
        text: 'There was an error creating your order. Please try again later.',
      });
    }
    
  }

      
  const handlePaymentProcess = async (orderId: string, token: any ) => {
    if (!selectedProduct || isProcessing) return;
  
    setIsProcessing(true);
    let isPaymentSuccessful = false;
    try {
      
      const paypal = await fetchCompanyData(selectedProduct.company_id);
      const companyAccount = paypal;
  
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
                onSuccess={async (details) => {
                  console.log(details)
                  isPaymentSuccessful = true; // Marcar el pago como exitoso
                  await finishedOrder(orderId, token);
                  handleRemoveProduct(selectedProduct.company_product_id);
                  await MySwal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    text: 'The payment was completed successfully',
                  });
                  MySwal.close();
                  router.push("/orderstatus")
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
          showCancelButton: true, 
          cancelButtonText: 'Cancel Payment',
          showConfirmButton: false, 
          showCloseButton: true,
          customClass: {
            popup: 'paypal-popup-class',
          },
          didClose: async () => {
            if (!isPaymentSuccessful) {
              await cancelOrder(orderId, token);
            }
            setIsProcessing(false);
          }
        }).then(async (result) => {
          if (result.isDismissed && !isPaymentSuccessful) {
            await cancelOrder(orderId, token);
            MySwal.fire({
              icon: 'info',
              title: 'Payment Canceled',
              text: 'The payment process was canceled.',
            });
            setIsProcessing(false); 
          }
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
          onOrderClick={fetchCreateOrder}
          isProductSelected={!!selectedProduct}
          onCompanySelect={handleCompanySelect}
        />
      </div>
    </div>
  );
};

export default CarShopComponent;