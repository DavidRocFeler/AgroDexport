import Image from 'next/image';
import paypalLogo from '../../public/PayPal-logo.png';
import paypalL from '../../public/paypalL.jpg';

const PaypalView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-1/5 bg-gray-200 w-full">
      </div>

      <div className="flex-grow flex">
        <div className="w-2/3 p-8">

          <Image src={paypalL} alt="Paypal" className="w-full max-h-32 object-cover" />


          <div className="text-xl font-semibold my-4">Total a pagar: $99.99</div>


          <h2 className="text-center text-2xl font-bold mb-4">Pagar con PayPal</h2>


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

            <span className="text-sm text-gray-600">
              Mantén abierta la sección para pagar con más rapidez. No se recomienda en dispositivos compartidos.
            </span>
          </div>


          <button className="w-full p-3 bg-black text-white rounded hover:bg-blue-700">
            Iniciar sesión
          </button>
        </div>

        <div className="w-1/3 p-8 flex justify-center items-center">
          <Image src={paypalLogo} alt="PayPal Logo" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default PaypalView;


