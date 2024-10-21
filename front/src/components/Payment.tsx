"use client"

import Image from 'next/image';

const Payment = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Agro Dexports</h1>
          <Image src="" alt="Agro Dexports Logo" width={40} height={40} />
        </div>

        <h2 className="text-xl font-bold mb-4">Review and confirm your order</h2>

        {/* Resumen del producto */}
        <div className="flex items-center mb-4">
          <Image 
            src="/[col.jpg]" 
            alt="col " 
            width={60} 
            height={60} 
            className="rounded-lg"
          />
          <div className="ml-4">
            <h3 className="font-bold">col organica </h3>
            <p className="text-sm text-gray-500">Quantity: 1 ton  $4.000</p>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum cumque reiciendis voluptates consectetur odio nemo voluptatem, consequuntur quisquam aliquam laudantium assumenda inventore qui non mollitia ut? Quasi dolor doloribus laborum!</p>
          </div>
        </div>

        {/* Detalles del pedido */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-700">
            <p>Subtotal</p>
            <p>$7.000</p>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <p>Shipping</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <p>Tax</p>
            <p>$3.60</p>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4">
            <p>Total</p>
            <p>$43.60</p>
          </div>
        </div>

        {/* Forma de pago */}
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>

        <div className="flex items-center mb-6">
          <div className="border border-gray-300 rounded-lg p-2 w-24 flex items-center justify-center">
            <Image 
              src="/paypal-logo.png" 
              alt="PayPal" 
              width={50} 
              height={50} 
            />
          </div>
          <p className="ml-4">PayPal</p>
        </div>

        {/* Botón de PayPal */}
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={() => alert('Redirecting to PayPal...')}
        >
          Pay with PayPal
        </button>
      </div>
    </div>
  );
};

export default Payment;
