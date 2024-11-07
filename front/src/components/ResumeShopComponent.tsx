import React, { useEffect, useState } from "react";
import styles from "../styles/ResumeShop.module.css";
import { useUserStore } from "@/store/useUserStore";
import { getCompaniesById } from "@/server/postOrder";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

interface Company {
  company_id: string;
  company_name: string;
}

interface ResumeShopProps {
  totals: {
    subtotal: number;
    logisticsCost: number;
    tariff: number;
    tax: number;
    discount: number;
    total: number;
    productData: {
      company_id?: string;
      company_product_id?: string;
    } | null;
  };
  onOrderClick: () => void;
  isProductSelected: boolean;
  onCompanySelect: (companyId: string) => void;
}

const ResumeShopComponent: React.FC<ResumeShopProps> = ({
  totals,
  onOrderClick,
  isProductSelected,
  onCompanySelect,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const { role_name, token, user_id } = useUserStore();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return `$ ${price.toFixed(2)}`;
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompaniesById(user_id, token);
        if (!Array.isArray(response) || response.length === 0) {
          MySwal.fire({
            icon: 'error',
            title: 'No companies found',
            text: 'Please add a company first.',
            
          });
          router.push("/profile");
          return;
        }
        setCompanies(response);
      } catch (error) {
        await MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching companies. Please try again.',
        });
      }
    };

    fetchCompanies();
  }, [user_id, token]);

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = event.target.value;
    setSelectedCompanyId(companyId);
    onCompanySelect(companyId);
  };

  const handleOrderClick = () => {
    if (!isProductSelected) {
      return MySwal.fire({
        icon: 'warning',
        title: 'No Product Selected',
        text: 'Please select a product before placing the order.',
      });
    }
    // console.log("este es mi consolelog")
    if (!selectedCompanyId) {
      return MySwal.fire({
        icon: 'warning',
        title: 'No Company Selected',
        text: 'Please select a company before placing the order.',
      });
    }
    onOrderClick();
  };

  return (
    <div className={styles.Resumen}>
      <h1>Resume</h1>
      <div>
        <select onChange={handleCompanyChange} value={selectedCompanyId || ""}>
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.SubTotal}>
        <h2>Subtotal</h2>
        <p>{formatPrice(totals.subtotal)}</p>
      </div>
      <div className={styles.SubTotal}>
        <h2>Logistics cost</h2>
        <p>{formatPrice(totals.logisticsCost)}</p>
      </div>
      <div className={styles.SubTotal}>
        <h2>Tariff</h2>
        <p>{formatPrice(totals.tariff)}</p>
      </div>
      <div className={styles.SubTotal}>
        <h2>Tax</h2>
        <p>{formatPrice(totals.tax)}</p>
      </div>
      <div className={styles.SubTotal}>
        <h2>Discount</h2>
        <p>- {formatPrice(totals.discount)}</p>
      </div>
      <div className={styles.Total}>
        <h2>Total</h2>
        <p>{formatPrice(totals.total)}</p>
      </div>
      <div className={styles.Description}>
        {/* Puedes agregar más detalles o descripciones aquí */}
      </div>
      <button
        className={styles.Order}
        onClick={handleOrderClick}
      >
        Order now
      </button>
    </div>
  );
};

export default ResumeShopComponent;
