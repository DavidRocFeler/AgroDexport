"use client";
import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import ProfileClientForm from "@/components/ProfileClientForm";

const ProfileClientView: React.FC = () => {
  const { token, user_id } = useUserStore();
  const [profileImage, setProfileImage] = useState<string>("https://media.istockphoto.com/id/1451587807/es/vector/vector-de-icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de.jpg?s=612x612&w=0&k=20&c=JZU0xsfmOHOx4UoiAITFEIwhe16aweLW3Ev4w5PgL2Y=");
  const [company_id, setCompany_id] = useState<string | null>(null);

  useEffect(() => {
    // Obtener la información de la empresa desde localStorage
    const storedProfile = localStorage.getItem("profileCompanyClient");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      if (parsedProfile?.company_logo) {
        setProfileImage(parsedProfile.company_logo); // Establecer la imagen del perfil de la empresa
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b pb-[2rem] bg-[#C4E2FF]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section with Profile and Companies */}
        <div className="mb-[2rem] mt-[2rem] flex flex-row">
          <div className="m-auto mb-[2.1rem] w-fit flex flex-col items-center space-y-4 relative">
            <img
              className="w-60 h-60 rounded-full object-cover border-4"
              src={profileImage}
              alt={company_id ? "Company Logo" : "User Profile"}
            />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="gap-8">
          <div className="col-span-9">
            <div className="rounded-2xl p-8">
              <div className="h-full flex flex-col justify-between">
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <ProfileClientForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClientView;


