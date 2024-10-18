"use client"
import Image from 'next/image';
import { useState } from 'react';

const PaypalView = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex justify-center items-center">
            1
          </div>
          <p className="mt-2 text-xs text-gray-600">Shopping Cart</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex justify-center items-center">
            2
          </div>
          <p className="mt-2 text-xs text-gray-600">Delivery Address</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex justify-center items-center">
            3
          </div>
          <p className="mt-2 text-xs text-gray-600">Payment Method</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-300 text-gray-500 rounded-full flex justify-center items-center">
            4
          </div>
          <p className="mt-2 text-xs text-gray-600">Preview Order</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <Image src={"/PayPal-logo.png"} alt="PayPal Logo" width={100} height={50} />
          <h2 className="text-xl font-semibold">Total a pagar: 95,00 EUR</h2>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Pagar con PayPal</h3>
          
          <form>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
                Mantener abierta la sesión para pagar con más rapidez.
                <br />
                No se recomienda en dispositivos compartidos.
              </span>
            </div>
            <button className="w-full p-3 bg-black text-white rounded hover:bg-blue-700">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaypalView;
