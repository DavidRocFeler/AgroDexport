import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { useUserStore } from '@/store/useUserStore';
import { getCompanyByUser } from '@/server/getCompanyByUser';
import { ICompany } from '@/interface/types';

const StackedCompanyCards: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [companiesData, setCompaniesData] = useState<ICompany[]>([]);
  const [message, setMessage] = useState<string>("Select a company to see details");

  const { user_id, token, role_name } = useUserStore();

  useEffect(() => {
    // Guardar user_id en localStorage al montar el componente
    if (user_id) {
      localStorage.setItem("user_id", user_id);
    }

    const fetchCompanies = async () => {
      if (user_id && token) {
        try {
          const companies: ICompany[] = await getCompanyByUser(user_id, token);
          setCompaniesData(companies);
        } catch (error) {
          console.error("Error fetching companies:", error);
          setMessage("Failed to load companies.");
        }
      }
    };

    fetchCompanies();
  }, [user_id, token]);

  const selectedCompanyData = companiesData.find(company => company.company_id.toString() === selectedCompany);

  const handleAddCompany = async () => {
    const result = await Swal.fire({
      title: 'Do you want to add a new company?',
      input: 'text',
      inputLabel: 'Enter your company name',
      inputPlaceholder: 'Company name',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed && result.value) {
      const newCompanyName = result.value;
      Swal.fire(`Company "${newCompanyName}" added successfully!`, '', 'success');
    }
  };

  const handleRemoveCompany = async () => {
    const result = await Swal.fire({
      title: 'Do you want to remove this company?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      Swal.fire('Company removed!', '', 'success');
    }
  };

  // Actualiza el localStorage cuando se selecciona una compañía
  useEffect(() => {
    if (selectedCompany) {
      // Elimina el user_id si existe y añade el company_id
      localStorage.removeItem("user_id");
      localStorage.setItem("company_id", selectedCompany);
    }
  }, [selectedCompany]);

  // Maneja el clic en el botón User
  const handleUserButtonClick = () => {
    // Elimina el company_id si existe y establece el user_id
    localStorage.removeItem("company_id");
    localStorage.setItem("user_id", user_id!);
    
    // Resetea la selección de compañía y el mensaje
    setSelectedCompany(""); // Limpia la selección de compañía
    setMessage("Select a company to see details"); // Resetea el mensaje
  };

  return (
    <div className="relative w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleUserButtonClick} className="text-xl font-semibold text-gray-800 mr-[2rem]">User</button>
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            {companiesData.map((company) => (
              <SelectItem key={company.company_id} value={company.company_id.toString()}>
                {company.company_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative h-72">
        {selectedCompanyData ? (
          <div className="absolute w-full transition-all duration-300 ease-in-out z-30 translate-y-0 opacity-100 hover:translate-y-0 hover:z-40">
            <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 shadow-md">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h5 className="font-medium text-gray-900">{selectedCompanyData.company_name}</h5>
                  <p className="text-sm text-gray-600">{role_name}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleAddCompany}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Add
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={handleRemoveCompany}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">{message}</p> // Muestra el mensaje de selección
        )}
      </div>
    </div>
  );
};

export default StackedCompanyCards;
