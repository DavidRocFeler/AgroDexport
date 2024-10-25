"use client"
import Image from 'next/image';
import { useState } from 'react';

const Paypal = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="rounded-lg w-[100%] ">
      <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex justify-between items-center mb-[0rem">
          <Image src={"/PayPal-logo.png"} alt="PayPal Logo" width={100} height={50} />
          {/* <h2 className="text-xl font-semibold">Total a pagar: 95,00 EUR</h2> */}
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Log in to PayPal</h3>
          
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
              Save Login with my Agro Dexports account to pay faster.
              </span>
            </div>
            <button className="w-full p-2 bg-black text-white rounded">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Paypal;
