"use client";
import React, { useEffect, useState } from "react";
import UserProfileForm from "../components/UserProfileForm";
import PasswordProfileForm from "@/components/PasswordSettingConfig";
import Paypal from "@/components/Paypal";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { uploadImageToCloudinary } from "@/server/cloudinarySetting"
import { getUserSettings } from "@/server/getUserSettings"
import StackedCompanyCards from "@/components/CompanyCards";
import CompanyForms from "@/components/CompanyProfileSettings";
import ShippingAddressForm from "@/components/ShippingAddressSettings";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ProfileView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("Information contact");
  const [isHydrated, setIsHydrated] = React.useState(false);
  const { token, user_id } = useUserStore()
  const [profileImage, setProfileImage] = useState<string>("/LogoIcon.png"); 
  const [userIdExists, setUserIdExists] = useState(false);
  const [companyIdExists, setCompanyIdExists] = useState(false);
  const [ company_id, setCompany_id ] = useState<string | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const storageCompanyId = localStorage.getItem("company_id");
    setCompany_id(storageCompanyId);
  }, []);
  
  // Obtener la imagen del usuario al cargar el componente
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user_id && token) {
        try {
          const userData = await getUserSettings(user_id, token);
          if (userData.profile_picture) {
            setProfileImage(userData.profile_picture); 
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user_id, token]);

  const MySwal = withReactContent(Swal);

  const handleImageUpload = async (file: File, type: string, id: string) => {
    if (!token || !user_id) {
      console.error("Token or user ID not found");
      return;
    }
  
    try {
      const response = await uploadImageToCloudinary(file, type, id, token);
  
      if (response.secure_url) {
        setProfileImage(response.secure_url);
        MySwal.fire({
          icon: 'success',
          title: 'Image Uploaded',
          text: 'Your image has been uploaded successfully!',
        });
      } else {
        console.error("No secure URL in response:", response);
      }
    } catch (error: any) {
      
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      
      MySwal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: errorMessage,
      });
    }
  };

  // Función para manejar los cambios en localStorage
  const handleStorageChange = () => {
    const userId = localStorage.getItem("user_id");
    const companyId = localStorage.getItem("company_id");
    const wasCompany = companyIdExists;
    const isNowCompany = !!companyId;

    setUserIdExists(!!userId);
    setCompanyIdExists(!!companyId);

    // Solo cambiar la sección activa si hubo un cambio en el modo
    if (wasCompany !== isNowCompany) {
      if (companyId) {
        setActiveSection("Company information");
      } else {
        setActiveSection("Information contact");
      }
    }
  };

  useEffect(() => {
    // Verificar estado inicial
    handleStorageChange();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Crear un evento personalizado para cambios locales
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      const event = new Event('localStorageChange');
      originalSetItem.apply(this, [key, value]);
      window.dispatchEvent(event);
    };

    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, [companyIdExists]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setShowUserProfile(true); // Cambiar el estado para mostrar el componente
    }
  }, []);

  const renderButtons = () => {
    if (userIdExists && !companyIdExists) {
      // Mostrar botones si solo hay user_id
      return ["Information contact", "Security settings", "Payments method"].map((item, index) => (
        <button
          key={index}
          onClick={() => setActiveSection(item)} 
          className={`w-full ${
            activeSection === item ? 'bg-[#5c8b1b]' : 'bg-[#242424]'
          } hover:bg-[#5c8b1b] text-white font-medium py-3 px-4 rounded-lg transition-colors text-center text-sm`}
        >
          {item}
        </button>
      ));
    } else if (companyIdExists) {
      // Mostrar botones si hay company_id
      return ["Company information", "Warehouse address", "Payments method"].map((item, index) => (
        <button
          key={index}
          onClick={() => setActiveSection(item)} 
          className={`w-full ${
            activeSection === item ? 'bg-[#5c8b1b]' : 'bg-[#242424]'
          } hover:bg-[#5c8b1b] text-white font-medium py-3 px-4 rounded-lg transition-colors text-center text-sm`}
        >
          {item}
        </button>
      ));
    } else {
      // O manejar el caso en que no haya user o company
      return <p>No user or company selected</p>;
    }
  };

    useEffect(() => {
      return () => {
          // Eliminar user_id y company_id de localStorage
          localStorage.removeItem("user_id");
          localStorage.removeItem("company_id");
      };
    }, [pathname]);

    React.useEffect(() => {
    setIsHydrated(true);
    }, []);

      if (!isHydrated) {
        return (
          <div className="min-h-screen bg-gradient-to-b pb-[2rem]  bg-[#C4E2FF]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section with Profile and Companies */}
            <div className="mb-[2rem] mt-[2rem] flex flex-row">
              {/* Companies List Section */}
              <div className="bg-white  h-[15rem] rounded-2xl shadow-lg  w-[23%] ">
                <StackedCompanyCards/>
              </div>
              {/* Profile Section */}
              <div className="m-auto mb-[2.1rem] w-fit flex flex-col items-center space-y-4">
                  <img
                    className="w-60 h-60 rounded-full object-cover border-4"
                    src="/LogoIcon.png"
                    alt="Profile"
                  />
              </div>
            </div>
    
            {/* Main Content Section */}
            <div className="grid grid-cols-12 gap-8">
              {/* Navigation Menu */}
              <div className="col-span-3">
                <div className="bg-white rounded-2xl shadow-lg p-4 h-[500px] relative">
                  <div className="space-y-10 mt-1 w-full">
                    {["Information contact", "Security settings", "Payments methood"].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSection(item)} 
                        className="w-full bg-[#242424] hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center text-sm"
                      >
                        {item}
                      </button>
                    ))}
                    <img
                      src="/LogoTypographic.png"
                      alt="Logo"
                      className="absolute bottom-5 left-0 items-center flex flex-row justify-center text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    />
                  </div>
                </div>
              </div>
    
              {/* Content Area */}
              <div className="col-span-9">
                <div className="bg-white rounded-2xl shadow-lg p-8 h-[500px]">
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                      {/* Renderiza UserProfileForm por defecto, y PasswordProfileForm cuando se selecciona "Security settings" */}
                      {activeSection === "Information contact" && <UserProfileForm />}
                      {activeSection === "Security settings" && <PasswordProfileForm />}
                      {activeSection === "Payments method" && <Paypal />}
                      {activeSection === "Company information" && <CompanyForms />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      }

    return (
      <div className="min-h-screen bg-gradient-to-b pb-[2rem] bg-[#C4E2FF]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section with Profile and Companies */}
          <div className="mb-[2rem] mt-[2rem] flex flex-row">
            {/* Companies List Section */}
            <div className="bg-white h-[15rem] rounded-2xl shadow-lg w-[23%]">
              <StackedCompanyCards/>
            </div>

            {/* Profile Section */}
            <div className="m-auto mb-[2.1rem] w-fit flex flex-col items-center space-y-4 relative">
              <img
                className="w-60 h-60 rounded-full object-cover border-4"
                src={profileImage}
                alt="Profile"
              />
              {/* Pencil Icon Button */}
              <div className="absolute bottom-0 right-0 mb-4 mr-4">
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M9 13.5l3.535-3.535m0 0L6.5 21.5H3v-3.5L15.232 5.232z"
                      />
                    </svg>
                  </div>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && user_id) {
                        handleImageUpload(file, "user", user_id); 
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="grid grid-cols-12 gap-8">
            {/* Navigation Menu */}
            <div className="col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-4 h-[500px] relative">
                <div className="space-y-10 mt-1 w-full">
                  {renderButtons()}
                  <img
                    src="/LogoTypographic.png"
                    alt="Logo"
                    className="absolute bottom-5 left-0 items-center flex flex-row justify-center text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="col-span-9">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-[500px]">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    {activeSection === "Information contact" && <UserProfileForm />}
                    {activeSection === "Security settings" && <PasswordProfileForm />}
                    {activeSection === "Payments method" && <Paypal />}
                    {activeSection === "Company information" && <CompanyForms />}
                    {activeSection === "Warehouse address" && <ShippingAddressForm />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ProfileView;


