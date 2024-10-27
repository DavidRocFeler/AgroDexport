"use client";
import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { fetchCompanyById } from '@/server/companiesSetting';

const Paypal = ({ companyId }: { companyId: string }) => {
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    async function getClientId() {
      try {
        // Llama a la función para obtener la compañía por ID
        const company = await fetchCompanyById(companyId);
        // Usa el campo account_paypal como client ID
        if (company.account_paypal) {
          setClientId(company.account_paypal);
        } else {
          console.error("No se encontró el Client ID en account_paypal");
        }
      } catch (error) {
        console.error("Error al obtener el Client ID:", error);
      }
    }

    if (companyId) {
      getClientId(); // Ejecuta la función cuando el companyId esté disponible
    }
  }, [companyId]);

  const initialOptions = {
    clientId: clientId || "", // Usa el clientId del estado
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
