"use client";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { ICompany, IOrderHistory } from '@/interface/types';
import { getCompanyByUser } from '@/server/getCompanyByUser';
import { getOrderByCompany } from '@/server/getOrdersHistory';
import Style from "../styles/SupplyChainView.module.css";
import FarmerCertificationsGet from '@/components/FarmerCertificationsGet';
import InternalLogisticGet from '@/components/InternalLogisticGet';
import { ICustomOfDestiny, ICustomOfOrigin, IDestinyLogistic, IInternalLogistic, IInternationalLogistic } from '@/interface/certificationsTypes';
import { customOfDestiny, customOfOrigin, destinyLogistic, internalLogistic, internationalLogistic } from '@/helpers/certificationsHelpers';
import CustomOfOriginGet from '@/components/CustomOfOriginGet';
import InternationalLogisticGet from '@/components/InternationalLogisticGet';
import CustomOfDestinyGet from '@/components/CustomOfDestinyGet';
import DestinyLogisticGet from '@/components/DestinyLogisticGet';

const MySwal = withReactContent(Swal);

const SupplyChainView: React.FC = () => {
    const { role_name, token, user_id } = useUserStore();
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [orders, setOrders] = useState<IOrderHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string>("Information contact");
    const [internalLogisticState, setInternalLogisticState] = useState<IInternalLogistic | null>(null);
    const [customOriginState, setCustomOriginState] = useState<ICustomOfOrigin | null>(null);
    const [internationalLogisticState, setInternationalLogisticState] = useState<IInternationalLogistic | null>(null);
    const [customDetinyState, setCustomDestinyState] = useState<ICustomOfDestiny | null>(null);
    const [destinyLogisticState, setdestinyLogisticState] = useState<IDestinyLogistic | null>(null);

    useEffect(() => {
        const data = destinyLogistic;
        setdestinyLogisticState(data); 
      }, []);

    useEffect(() => {
        const data = customOfDestiny;
        setCustomDestinyState(data); 
      }, []);

    useEffect(() => {
        const data = internationalLogistic;
        setInternationalLogisticState(data); 
      }, []);

    useEffect(() => {
        const data = customOfOrigin;
        setCustomOriginState(data); 
      }, []);

    useEffect(() => {
        const data = internalLogistic;
        setInternalLogisticState(data); 
      }, []);

    useEffect(() => {
        const fetchCompanies = async () => {
            if (!user_id || !token) { 
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo obtener la información del usuario.',
                });
                setLoading(false);
                return; 
            }

            try {
                const data: ICompany[] = await getCompanyByUser(user_id, token);
                setCompanies(data);
            } catch (error: any) {
                console.error('Error:', error.message);
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar las compañías.',
                });
            } finally {
                setLoading(false); 
            }
        };

        fetchCompanies();
    }, [user_id, token]);

    const handleCompanyChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const companyId = event.target.value;
        setSelectedCompanyId(companyId); 
        setSelectedOrderId(null); 

        if (companyId) {
            setLoading(true); 
            try {
                if (token) {
                    const ordersData = await getOrderByCompany(companyId, token);
                    const finishedOrders = ordersData.filter(order => order.orderDetail.order_status === 'finished');
                    setOrders(finishedOrders.sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime()));
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Token no disponible. Por favor, inicia sesión nuevamente.',
                    });
                }
            } catch (error: any) {
                console.error('Error al obtener órdenes:', error.message);
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar las órdenes.',
                });
            } finally {
                setLoading(false); 
            }
        } else {
            setOrders([]); 
        }
    };

    const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOrderId(event.target.value);
    };

    const renderButtons = () => {
        if (user_id) {
          return ["Farmer", "Internal logistic", "Custom of Origin", "International Logistic", "Custom of destiny", "Destiny logistic"].map((item, index) => (
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
          return <p>No user or company selected</p>;
        }
      };

    return (
        <main className="pl-[1.5rem] pr-[1.5rem] pt-[2rem] pb-[2rem] ">
            <div className="flex flex-row items-center mb-[2rem]">
                <h1 className="text-[6rem] "> Send Status </h1>
                <div className="ml-auto mt-[2rem] flex items-center">
                    {loading ? (
                        <span className="mr-[1rem] pb-[0.5rem] pr-[1rem] pl-[1rem]">Loading...</span>
                    ) : (
                        <>
                            <select
                                className={Style.DivCompany}
                                name="Order List"
                                onChange={handleCompanyChange}
                                value={selectedCompanyId || ""}
                            >
                                <option value=""> My companies</option>
                                {companies.map(company => (
                                    <option key={company.company_id} value={company.company_id}>
                                        {company.company_name}
                                    </option>
                                ))}
                            </select>

                
                            <select
                                className={`${Style.DivCompany} ml-[1rem]`}
                                name="Order Select"
                                onChange={handleOrderChange}
                                value={selectedOrderId || ""}
                                disabled={!selectedCompanyId} 
                            >
                                <option value="">Select an order</option>
                                {selectedCompanyId && orders.map(order => (
                                    <option key={order.order_id} value={order.order_id}>
                                        {order.order_id} 
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                </div>
            </div>
            <section className="flex flex-row  ">
                
                {/* Main Content Section */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-4 h-[680px] relative">
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
              <div className="bg-white rounded-2xl shadow-lg p-8 h-[680px]">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    {activeSection === "Farmer" && <FarmerCertificationsGet orderId ={selectedOrderId} token={token}/>}
                    {activeSection === "Internal logistic" && internalLogistic && (
                        <InternalLogisticGet internalLogistic={internalLogistic} />
                    )}
                    {activeSection === "Custom of Origin" && customOfOrigin && (
                        <CustomOfOriginGet customOfOrigin={customOfOrigin} />
                    )}
                    {activeSection === "International Logistic" && internationalLogistic && (
                        <InternationalLogisticGet internationalLogistic={internationalLogistic} />
                    )}
                     {activeSection === "Custom of destiny" && customOfDestiny && (
                        <CustomOfDestinyGet customOfDestiny={customOfDestiny} />
                    )}
                    {activeSection === "Destiny logistic" && destinyLogistic && (
                        <DestinyLogisticGet destinyLogistic={destinyLogistic} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
            </section>
        </main>
    );
};

export default SupplyChainView;
