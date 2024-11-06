"use client";
import React, { useEffect, useState, useRef } from "react";
import FormPublishProduct from "@/components/FormPublishProduct";
import FarmerCertificationsForm from "@/components/FarmerCertificationsForm";
import { getCategories, getProductById } from "@/server/getProduct";
import { getUserSettings } from "@/server/getUserSettings";
import { useUserStore } from "@/store/useUserStore";
import { ISettingsUserProps } from "@/interface/types";

const PublishProductView: React.FC = () => {
  const [companyParam, setCompanyParam] = useState<string | null>(null);
  const [companyProductIdParam, setCompanyProductIdParam] = useState<string | null>(null);
  const [showCertifications, setShowCertifications] = useState(false);
  const [userCompanies, setUserCompanies] = useState<{ company_id: string; company_name: string }[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ category_id: string; name_category: string }[]>([]);
  const [companyProductId, setCompanyProductId] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token, user_id } = useUserStore();

  const isSelectDisabled = Boolean(companyProductIdParam);
  const didSetCompany = useRef(false); // Controla que `selectedCompany` solo se configure una vez

  // Obtener los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const companyParamFromURL = params.get("company_id");
    const companyProductIdParamFromURL = params.get("company_product_id");
    setCompanyParam(companyParamFromURL);
    setCompanyProductIdParam(companyProductIdParamFromURL);

    // console.log(
    //   "URL Params - company_id:", companyParamFromURL, 
    //   "company_product_id:", companyProductIdParamFromURL
    // );
  }, []);

  // Cargar configuración de usuario y categorías
  useEffect(() => {
    const fetchUserSettingsAndCategories = async () => {
      // console.log("Fetching user settings and categories...");
      try {
        if (token && user_id) {
          const userData: ISettingsUserProps = await getUserSettings(user_id, token);

          const validCompanies = (userData.companies || []).map((company) => ({
            company_id: company.company_id as string,
            company_name: company.company_name as string,
          }));
          setUserCompanies(validCompanies);
          // console.log("Valid companies:", validCompanies);

          if (!didSetCompany.current && companyParam) {
            const isValidCompany = validCompanies.some((c) => c.company_id === companyParam);
            setSelectedCompany(isValidCompany ? companyParam : validCompanies[0].company_id);
            // console.log("Setting selectedCompany from companyParam or first valid company:", selectedCompany);
            didSetCompany.current = true;
          }

          const categoryData = await getCategories();
          setCategories(categoryData);
          // console.log("Categories:", categoryData);
        }
      } catch (err: any) {
        console.error("Error loading user settings or categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSettingsAndCategories();
  }, [token, user_id, companyParam]);

  // Cargar datos del producto si hay `companyProductIdParam` y `selectedCompany`
  useEffect(() => {
    const fetchProductData = async () => {
      if (companyProductIdParam && selectedCompany) {
        // console.log("Fetching product data...");
        try {
          const productData = await getProductById(selectedCompany, companyProductIdParam);
          if (productData) {
            setCompanyProductId(companyProductIdParam);
            setIsImageUploaded(Boolean(productData.company_product_img));
            // console.log("Product data loaded. Image uploaded:", Boolean(productData.company_product_img));
          }
        } catch (error) {
          console.error("Error loading product data:", error);
        }
      }
    };

    fetchProductData();
  }, [companyProductIdParam, selectedCompany]);

  const handleProductCreated = (productId: string, companyId: string) => {
    setCompanyProductId(productId);
    setIsImageUploaded(true);
    setShowCertifications(true);
    // console.log("Product created - ID:", productId, "Company ID:", companyId);
  };

  const handleCancel = () => {
    setShowCertifications(false);
    // console.log("Certifications view cancelled");
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isSelectDisabled) {
      setSelectedCompany(event.target.value);
      // console.log("Company changed to:", event.target.value);
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
    <div className="container mx-auto py-5 font-inter">
      <h1 className="text-[48px] md:text-[42px] text-center mb-4 font-inter">Publish Products</h1>

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
            disabled={isSelectDisabled}
          >
            {userCompanies.map((company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="border border-black max-w-3xl mx-auto p-8 bg-white">
        {!showCertifications ? (
          <>
            <FormPublishProduct
              onUpdateClick={handleProductCreated}
              selectedCompany={selectedCompany}
              categories={categories}
            />
            {isImageUploaded && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowCertifications(true)}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Add or update Farmer Certifications
                </button>
              </div>
            )}
          </>
        ) : (
          <FarmerCertificationsForm
            onCancel={handleCancel}
            companyId={selectedCompany || ""}
            productId={companyProductId || ""}
          />
        )}
      </div>
    </div>
  );
};

export default PublishProductView;
