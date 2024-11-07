"use client";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormPublishProduct from "@/components/FormPublishProduct";
import FarmerCertificationsForm from "@/components/FarmerCertificationsForm";
import { getCategories, getProductById } from "@/server/getProduct";
import { getUserSettings } from "@/server/getUserSettings";
import { useUserStore } from "@/store/useUserStore";
import { ISettingsUserProps } from "@/interface/types";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

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
  const router = useRouter();

  const isSelectDisabled = Boolean(companyProductIdParam);
  const didSetCompany = useRef(false);

  // Obtener los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const companyParamFromURL = params.get("company_id");
    const companyProductIdParamFromURL = params.get("company_product_id");
    setCompanyParam(companyParamFromURL);
    setCompanyProductIdParam(companyProductIdParamFromURL);
  }, []);

  // Cargar configuración de usuario y categorías
  useEffect(() => {
    const fetchUserSettingsAndCategories = async () => {
      try {
        if (token && user_id) {
          const userData: ISettingsUserProps = await getUserSettings(user_id, token);

          const validCompanies = (userData.companies || []).map((company) => ({
            company_id: company.company_id as string,
            company_name: company.company_name as string,
          }));
          setUserCompanies(validCompanies);

          if (validCompanies.length === 0) {
            MySwal.fire({
              title: "No companies registered",
              text: "You need to have a registered company to create a product.",
              icon: "warning",
              confirmButtonText: "Go to Profile",
            }).then(() => {
              router.push("/profile");
            });
          }

          // Lógica para establecer selectedCompany
          if (!didSetCompany.current) {
            const isValidCompany = companyParam && validCompanies.some((c) => c.company_id === companyParam);
            const companyToSet = isValidCompany ? companyParam : validCompanies[0]?.company_id;

            setSelectedCompany(companyToSet);
            didSetCompany.current = true;
            // console.log("Setting selectedCompany to:", companyToSet);
          }

          const categoryData = await getCategories();
          setCategories(categoryData);
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
        try {
          const productData = await getProductById(selectedCompany, companyProductIdParam);
          if (productData) {
            setCompanyProductId(companyProductIdParam);
            setIsImageUploaded(Boolean(productData.company_product_img));
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
  };

  const handleCancel = () => {
    setShowCertifications(false);
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isSelectDisabled) {
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
