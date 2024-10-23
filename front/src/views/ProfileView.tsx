"use client";

import React from "react";

const ProfileView: React.FC = () => {
  const sampleCompanies = [
    {
      id: 1,
      name: "Company One",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Company Two",
      role: "User",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section with Profile and Companies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Companies List Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                My Companies
              </h3>

              {/* Companies Grid */}
              <div className="space-y-3">
                {sampleCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h5 className="font-medium text-gray-900">
                          {company.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          Role: {company.role}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {company.status}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Company Button */}
              <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4">
                ADD COMPANY
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                className="w-48 h-48 rounded-full object-cover border-4 border-black shadow-[5px_5px_0_0_rgba(0,0,0,1)]"
                src="../image_profile.png"
                alt="Profile"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                John Doe
              </h2>
              <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-8 rounded-lg transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Come Back Button */}
          <div className="flex items-start justify-end">
            <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap">
              USER COME BACK
            </button>
          </div>
        </div>

        {/* Main Content Section - Ajustado */}
        <div className="grid grid-cols-12 gap-8">
          {/* Navigation Menu - Más estrecho */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-[500px]">
              <div className="space-y-3 w-full">
                {[
                  "Personal Information",
                  "Contact Details",
                  "Security Settings",
                  "Preferences",
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area - Más ancho */}
          <div className="col-span-9">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-[500px]">
              <div className="h-full flex flex-col justify-between">
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select an option to view details
                </div>
                <div className="flex justify-end w-full">
                  <button className="bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-8 rounded-lg transition-colors">
                    CONTINUE SHOPPING
                  </button>
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
