import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { useUserStore } from '@/store/useUserStore';
import { getCompanyByUser } from '@/server/getCompanyByUser';
import { ICompany } from '@/interface/types';
import { updateNewCompany } from '@/server/updateNewCompany';
import useUserSettingsStore from '@/store/useUserSettingsStore';
import { newShippingAddress } from '@/server/NewShippingAddress';
import { IShippingAddress } from '@/interface/types';

const StackedCompanyCards: React.FC = () => {

  const [showInitialView, setShowInitialView] = useState<boolean>(true);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [companiesData, setCompaniesData] = useState<ICompany[]>([]);
  const [message, setMessage] = useState<string>("Add a new company");
  const { user_id, token, role_name } = useUserStore();
  const userSettingsStore = useUserSettingsStore((state) => state.userSettings);
  const [isClient, setIsClient] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const capitalizeFirstLetter = (role_name: string | null) => {
    if (!role_name) return ""; 
    return role_name.charAt(0).toUpperCase() + role_name.slice(1);
  };

  const getFirstName = (fullName: string | undefined) => {
    if (!fullName) return ''; 
    return fullName.split(' ')[0];
  };

  useEffect(() => {
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

  const fetchShippingAddress = async (companyId: string | null, token: string) => {
    if (companyId && token) {
      try {
        // Crea un objeto de tipo Partial<IShippingAddress> que solo incluye company_id
        const requestData: Partial<IShippingAddress> = { company_id: companyId };
  
        const data = await newShippingAddress(requestData, token);
        // console.log('Dirección de envío:', data);
      } catch (error) {
        console.error('Error al obtener la dirección de envío:', error);
      }
    }
  };
  
  const handleAddCompany = async () => {
    if (!user_id || !token) {
      await Swal.fire('Error', 'User ID is required', 'error');
      return;
    }
  
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
      try {
        const newCompanyData = {
          user_id: user_id,
          company_name: result.value
        };
  
        const response = await updateNewCompany(newCompanyData, token);
        // console.log("Respuesta al crear la compañía:", response);
  
        const { company_id, company_name } = response.data;
  
        if (company_id) {
          
          setCompaniesData(prevCompaniesData => [
            ...prevCompaniesData,
            { company_id, company_name } as ICompany 
          ]);
          setSelectedCompany(company_id.toString());
  
          await fetchShippingAddress(company_id, token);
  
          await Swal.fire(
            `Company "${company_name}" added successfully!`,
            '',
            'success'
          );
        } else {
          console.error("company_id no encontrado en la respuesta");
        }
      } catch (error) {
        console.error('Error al crear la compañía:', error);
        await Swal.fire(
          'Error',
          'There was an error creating the company',
          'error'
        );
      }
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

  useEffect(() => {
    if (selectedCompany) {
      setShowInitialView(false); // Ocultar la vista inicial cuando se selecciona una compañía
      localStorage.removeItem("user_id");
      localStorage.setItem("company_id", selectedCompany);
    }
  }, [selectedCompany]);

  const handleUserButtonClick = () => {
    localStorage.removeItem("company_id");
    localStorage.setItem("user_id", user_id!);
    setSelectedCompany("");
    setMessage("Add a new company");
    setShowInitialView(true); // Mostrar la vista inicial al hacer clic en User
  };
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extraemos la vista inicial a un componente separado para mejor organización
  const InitialView = () => (
    <div>  
      <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 shadow-md">
          {isClient && (
            <div className='flex flex-row'>
              <p className='font-medium text-gray-900 mr-[0.5rem] '>{getFirstName(userSettingsStore?.user_name)}</p>
              <p className='font-medium text-gray-900'>{getFirstName(userSettingsStore?.user_lastname)}</p>
            </div>
          )}
          <p className="text-gray-500 mb-2">{message}</p> 
        <button
          onClick={handleAddCompany}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Add
        </button>
        
      </div>
    </div>
  );

  // Extraemos la vista de la compañía seleccionada a un componente separado
  const CompanyView = () => (
    <div className="absolute w-full transition-all duration-300 ease-in-out z-30 translate-y-0 opacity-100 hover:translate-y-0 hover:z-40">
      <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 shadow-md">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h5 className="font-medium text-gray-900">{selectedCompanyData?.company_name}</h5>
            <p className="text-sm text-gray-600">{capitalizeFirstLetter(role_name)}</p>
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
  );

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
        {showInitialView ? <InitialView /> : <CompanyView />}
      </div>
    </div>
  );
};

export default StackedCompanyCards;
