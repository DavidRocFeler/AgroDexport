"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Error404Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-500 mb-4">404</h1>
      <p className="text-2xl text-gray-500 mb-8">Oops, the page you re looking for doesn t exist.</p>
      <button
        className=" bg-[#5c8b1b] hover:bg-[#6ea520] text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push('/')}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error404Page;