"use client";
import React, { useEffect, useState } from "react";
import FormPublishProduct from "@/components/FormPublishProduct";
import FarmerCertificationsForm from "@/components/FarmerCertificationsForm";
import { getCategories, getProductById } from "@/server/getProduct";
import { getUserSettings } from "@/server/getUserSettings";
import { useUserStore } from "@/store/useUserStore";
import { ISettingsUserProps } from "@/interface/types";

interface PublishProductViewProps {
  companyParam?: string | null;
  companyProductIdParam?: string | null;
}

const PublishProductView: React.FC<PublishProductViewProps> = ({
  companyParam = null,
  companyProductIdParam = null,
}) => {
  const [showCertifications, setShowCertifications] = useState(false);
  const [userCompanies, setUserCompanies] = useState<{ company_id: string; company_name: string }[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(companyParam);
  const [categories, setCategories] = useState<{ category_id: string; name_category: string }[]>([]);
  const [companyProductId, setCompanyProductId] = useState<string | null>(companyProductIdParam);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user_id } = useUserStore();

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        if (token && user_id) {
          const userData: ISettingsUserProps = await getUserSettings(user_id, token);

          const validCompanies = (userData.companies || [])
            .filter((company): company is { company_id: string; company_name: string } =>
              company.company_id !== undefined && company.company_name !== undefined
            )
            .map((company) => ({
              company_id: company.company_id as string,
              company_name: company.company_name as string,
            }));

          setUserCompanies(validCompanies);

          if (companyProductIdParam) {
            setSelectedCompany(companyParam || validCompanies[0]?.company_id);
          } else if (!selectedCompany && companyParam) {
            setSelectedCompany(companyParam);
          } else if (!selectedCompany && validCompanies.length > 0) {
            setSelectedCompany(validCompanies[0].company_id);
          }
        }
      } catch (err: any) {
        setError("Error loading user settings.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err: any) {
        setError("Error loading categories.");
      }
    };

    const fetchProductData = async () => {
      if (companyProductIdParam && selectedCompany) {
        try {
          const productData = await getProductById(selectedCompany, companyProductIdParam);
          if (productData) {
            setCompanyProductId(companyProductIdParam);
            setSelectedCompanyId(selectedCompany);
            setIsImageUploaded(!!productData.company_product_img);
          }
        } catch (error) {
          console.error("Error loading product data:", error);
        }
      }
    };

    fetchUserSettings();
    fetchCategories();
    fetchProductData();
  }, [token, user_id, companyParam, companyProductIdParam, selectedCompany]);

  const handleProductCreated = (productId: string, companyId: string) => {
    setCompanyProductId(productId);
    setSelectedCompanyId(companyId);
    setIsImageUploaded(true);
    setShowCertifications(true);
  };

  const handleCancel = () => {
    setShowCertifications(false);
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!companyProductIdParam) {
      setSelectedCompany(event.target.value);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 font-inter">
        <h1 className="text-[96px] text-center mb-12 font-inter">Publish Products</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 font-inter">
      <h1 className="text-[48px] md:text-[96px] text-center mb-12 font-inter">
        Publish Products
      </h1>

      {userCompanies.length === 0 ? (
        <div className="text-center text-gray-500">No companies registered</div>
      ) : (
        <div className="mb-4 text-center">
          <label htmlFor="companySelect" className="mr-2">Select Company:</label>
          <select
            id="companySelect"
            value={selectedCompany || ""}
            onChange={handleCompanyChange}
            className="border border-black px-4 py-2"
            disabled={!!companyProductIdParam} // Deshabilita solo en modo de actualización
          >
            {userCompanies.map((company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="border border-black max-w-3xl mx-auto p-8">
        {!showCertifications ? (
          <>
            <FormPublishProduct 
              onUpdateClick={handleProductCreated} 
              selectedCompany={selectedCompany} 
              categories={categories} 
            />
            {isImageUploaded && (
              <div className="flex justify-end mt-4">
                <button onClick={() => setShowCertifications(true)} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
                  Add or update Farmer Certifications
                </button>
              </div>
            )}
          </>
        ) : (
          <FarmerCertificationsForm 
            onCancel={handleCancel} 
            companyId={selectedCompanyId || ""} 
            productId={companyProductId || ""} 
          />
        )}
      </div>
    </div>
  );
};

export default PublishProductView;
