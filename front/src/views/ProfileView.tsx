"use client";
import React, { useState } from "react";
import UserProfileForm from "../components/UserProfileForm"; // Importa el componente
import PasswordProfileForm from "@/components/PasswordSettingCongif"; // Importa el componente para la seguridad
import { useRouter } from "next/navigation";
import { companiesData } from "@/helpers/companiesData";
import Paypal from "@/components/Paypal";
import { useUserStore } from "@/store/useUserStore";

const ProfileView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("Information contact"); // Por defecto muestra UserProfileForm
  const [isHydrated, setIsHydrated] = React.useState(false);
  const { role_name, token } = useUserStore()

  const capitalizeFirstLetter = (role_name: string | null) => {
    if (!role_name) return ""; 
    return role_name.charAt(0).toUpperCase() + role_name.slice(1);
  };

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  // const handleRedirectPanel = () => {
  //   router.push("/profilecompany");
  // };

   if (!isHydrated) {
        return (
          <div className="min-h-screen bg-gradient-to-b pb-[2rem] from-blue-100 to-blue-200">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section with Profile and Companies */}
            <div className="mb-[2rem] mt-[2rem] flex flex-row">
              {/* Companies List Section */}
              <div className="bg-white h-fit rounded-2xl shadow-lg p-6 w-[23%] ">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">My Companies</h3>
                  <div className="space-y-3">
                    {companiesData.map((company) => (
                      <div
                        key={company.id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h5 className="font-medium text-gray-900">{company.name}</h5>
                            <p className="text-sm text-gray-600"></p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Add</button>
                          <span className="text-gray-300">|</span>
                          <button className="text-sm text-red-600 hover:text-red-800 font-medium">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
    
              {/* Profile Section */}
              <div className="m-auto mb-[2.1rem] w-fit flex flex-col items-center space-y-4">
                  <img
                    className="w-60 h-60 rounded-full object-cover border-4 border-black"
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
                      {activeSection === "Information contact" ? (
                        <UserProfileForm />
                      ) : activeSection === "Security settings" ? (
                        <PasswordProfileForm />
                      ) : activeSection === "Payments methood" ? (
                        <Paypal/>
                      ) : (
                        <span></span>
                      )}
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
    <div className="min-h-screen bg-gradient-to-b pb-[2rem] from-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section with Profile and Companies */}
        <div className="mb-[2rem] mt-[2rem] flex flex-row">
          {/* Companies List Section */}
          <div className="bg-white h-fit rounded-2xl shadow-lg p-6 w-[23%] ">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">My Companies</h3>
              <div className="space-y-3">
                {companiesData.map((company) => (
                  <div
                    key={company.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h5 className="font-medium text-gray-900">{company.name}</h5>
                        <p className="text-sm text-gray-600">{capitalizeFirstLetter(role_name)}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Add</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-red-600 hover:text-red-800 font-medium">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="m-auto mb-[2.1rem] w-fit flex flex-col items-center space-y-4">
              <img
                className="w-60 h-60 rounded-full object-cover border-4 border-black"
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
                  {activeSection === "Information contact" ? (
                    <UserProfileForm />
                  ) : activeSection === "Security settings" ? (
                    <PasswordProfileForm />
                  ) : activeSection === "Payments methood" ? (
                    <Paypal/>
                  ) : (
                    <span>{activeSection}</span>
                  )}
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
