"use client";

import React, { useState } from 'react';
import { ProductSearchProps } from '@/interface/types'; // Asegúrate de que esté correctamente definido

const ProductSearch: React.FC<ProductSearchProps> = ({ onFilterChange }) => {
  // Estado para cada filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [origin, setOrigin] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [companyName, setCompanyName] = useState('');

  // Manejadores de cambio para cada filtro
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrigin(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value === '' ? '' : parseFloat(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value === '' ? '' : parseFloat(e.target.value));
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Crear el objeto de filtros basado en los campos seleccionados
    const filters: any = {
      productName: searchTerm,
      category,
      origin,
      minPrice,
      maxPrice,
      companyName,
    };

    // Eliminar los filtros vacíos antes de enviarlos
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    // Llamar a la función de cambio de filtros en el componente padre
    onFilterChange(filters);
  };

  return (
    <div className="flex items-center mt-[2rem] mb-[2rem] ms-8 mr-8 px-4 pr-0 pl-0">
      <form onSubmit={handleSubmit} className="flex flex-row items-center space-x-4 w-full">
        {/* Campo de búsqueda por nombre de producto */}
        <input
          placeholder="Search for products by name..."
          className="form-input flex w-full h-12 px-4 rounded-xl text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
        />

        {/* Filtro por categoría */}
        <select
          className="rounded-xl px-3 py-2 h-12 text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Cereals">Grains and Cereals</option>
          <option value="Legumes">Dried Legumes</option>
          <option value="Spices">Herbs and Spices</option>
          <option value="Nuts">Nuts and Seeds</option>
          <option value="Others">Other</option>
        </select>

        {/* Filtro por origen */}
        <select
          className="rounded-xl px-3 py-2 h-12 text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={origin}
          onChange={handleOriginChange}
        >
          <option value="">All Countries</option>
          <option value="Argentina">Argentina</option>
          <option value="Colombia">Colombia</option>
          <option value="Peru">Peru</option>
          <option value="Brazil">Brazil</option>
          <option value="Mexico">Mexico</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Chile">Chile</option>
        </select>

        {/* Filtro por precio mínimo */}
        <input
          type="number"
          placeholder="Min Price"
          className="form-input w-24 h-12 px-4 rounded-xl text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={minPrice}
          onChange={handleMinPriceChange}
        />

        {/* Filtro por precio máximo */}
        <input
          type="number"
          placeholder="Max Price"
          className="form-input w-24 h-12 px-4 rounded-xl text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />

        {/* Filtro por nombre de compañía */}
        <input
          placeholder="Company Name"
          className="form-input w-48 h-12 px-4 rounded-xl text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={companyName}
          onChange={handleCompanyNameChange}
        />

        {/* Botón para realizar la búsqueda */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default ProductSearch;
