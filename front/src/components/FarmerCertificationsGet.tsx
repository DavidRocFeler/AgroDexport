import React, { useEffect, useState } from 'react';
import { getFarmerCertificationByOrderId } from '@/server/getFarmerCerrtification'; 
import Style  from "../styles/FarmerCertificationsGet.module.css";

interface FarmerCertificationsGetProps {
  orderId: string | null;
  token: string | null;
}

const FarmerCertificationsGet: React.FC<FarmerCertificationsGetProps> = ({ orderId, token }) => {
  const [certifications, setCertifications] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCertifications = async () => {
      if (!orderId) return;  // Si no hay una orden seleccionada, no hacer nada
      if (!token) {
        throw new Error('Token is required');
      }
      setLoading(true);
      try {
        const data = await getFarmerCertificationByOrderId(orderId, token);
        setCertifications(data);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [orderId, token]);

  return (
    <div className={Style.container}>
      <h2 className={Style.FarmeH2}>Farmer Certifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : certifications ? (
        <div>
          <p><a className={Style.FarmeButton} href={certifications.phytosanitary_certificate} target="_blank" rel="noopener noreferrer">Phytosanitary Certificate</a></p>
          <p><a className={Style.FarmeButton} href={certifications.agricultural_producer_cert} target="_blank" rel="noopener noreferrer">Agricultural Producer Certificate</a></p>
          <p><a className={Style.FarmeButton} href={certifications.organic_certification} target="_blank" rel="noopener noreferrer">Organic Certification</a></p>
          <p><a className={Style.FarmeButton} href={certifications.quality_certificate} target="_blank" rel="noopener noreferrer">Quality Certificate</a></p>
          <p><a className={Style.FarmeButton} href={certifications.certificate_of_origin} target="_blank" rel="noopener noreferrer">Certificate of Origin</a></p>
        </div>
      ) : (
        <p>No certifications available for this order.</p>
      )}
    </div>
  )
};

export default FarmerCertificationsGet;
