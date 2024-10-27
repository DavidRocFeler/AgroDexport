"use client";
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Paypal = () => {
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "", // Verifica que el ID de cliente esté definido
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="rounded-lg w-full p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <img src="/PayPal-logo.png" alt="PayPal Logo" width={100} height={50} />
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-300">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Pagar con PayPal</h3>

        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: "95.00", // Monto total a pagar
                    },
                  },
                ],
              } as any);
            }}
            onApprove={async (data: any, actions: any): Promise<void> => {
              if (actions.order) {
                await actions.order.capture().then((details: any) => {
                  alert("Pago realizado con éxito.");
                });
              }
            }}
            onError={(err: any) => {
              console.error("Error en PayPal:", err);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Paypal;
