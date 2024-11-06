"use client"; 

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useUserStore } from "@/store/useUserStore";
import { getCompanyByUser } from "@/server/getCompanyByUser";
import { ICompany, IOrderHistory, IProductDetails } from "@/interface/types"; 
import { getOrderByCompany } from "@/server/getOrdersHistory";
import Style  from "../styles/SupplyChainView.module.css";
import { getCompanySettings, getProductDetails } from "@/server/getCompanyById";

const MySwal = withReactContent(Swal);

const SupplyChainViewSupplier: React.FC = () => {
    const { role_name, token, user_id } = useUserStore();
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [orders, setOrders] = useState<IOrderHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null); // Estado para manejar el orden expandido
    const [productDetails, setProductDetails] = useState<IProductDetails | null>(null);


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
            }          
            finally {
                setLoading(false); 
            }
        };

        fetchCompanies();
    }, [user_id, token]);

    
    const handleCompanyChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const companyId = event.target.value;
        setSelectedCompanyId(companyId); 

        if (companyId) {
            setLoading(true); 
            try {
                if (token) {
                    const ordersData = await getOrderByCompany(companyId, token);
                    setOrders(ordersData.sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime())); // Ordenar por fecha
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



    const handleOrderClick = async (orderId: string) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    
        if (expandedOrderId !== orderId) { 
            try {
                const orderDetailId = orderId;
    
                // Verificar si token es null
                if (!token) {
                    throw new Error("Token no disponible");
                }
    
                const details = await getProductDetails(orderDetailId, token);
                setProductDetails(details);
            } catch (error: any) {
                console.error('Error al obtener detalles del producto:', error.message);
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'No se pudieron cargar los detalles del producto.',
                });
            }
        } else {
            setProductDetails(null); // Limpiar detalles si se colapsa
        }
    };
    


    
    return (
        <main className="pl-[1.5rem] pr-[1.5rem] pt-[2rem] pb-[2rem] ">
            <div className="flex flex-row items-center mb-[2rem]">
                <h1 className="text-[6rem] "> Purchase history </h1>
                <div className="ml-auto mt-[2rem] ">
                    {loading ? (
                        <span className="mr-[1rem]  pb-[0.5rem] pr-[1rem] pl-[1rem]">Loading...</span>
                    ) : (
                        <select 
                            className={Style.DivCompany}
                            name="Order List" 
                            id="" 
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
                    )}
                </div>
            </div>
            <div >
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.order_id} className={Style.DivOrder} onClick={() => handleOrderClick(order.order_id)}>
                            <div className="flex justify-between">
                            <div>
                                 {new Date(order.order_date).toLocaleDateString('es-ES', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                })}
                            </div>
                                <div>
                                        <div>
                                            $: {new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(order.orderDetail.total)}
                                        </div>
                                </div>
                            </div>
                            <div className={Style.DivSeparate}></div>
                            <div className="flex justify-between">
                                <div>
                                    <strong>Order ID:</strong> {order.order_id}
                                </div>
                                <div>
                                    <strong>Status:</strong> {order.orderDetail.order_status}
                                </div>
                                
                            </div>
                            {expandedOrderId === order.order_id && (
                                <div className={Style.DivInfoComplete}>
                                <div className="flex justify-between">
                                    <div>
                                        <div>
                                            <strong>Company Sell:</strong>  {order.supplier.company_name} 
                                        </div>
                                        <div>
                                            <strong>Product Name:</strong>  {productDetails?.infoProduct.company_product_name} 
                                        </div>
                                        <div>
                                            <strong>Product Description:</strong>  {productDetails?.infoProduct.company_product_description} 
                                        </div>
                                        <div>
                                            <strong>Cant:</strong>  {productDetails?.orderinfo.stock} 
                                        </div>
                                        <div>
                                            <strong>Origin:</strong>  {productDetails?.infoProduct.origin} 
                                        </div>
                                        <div>
                                            <strong>Price per kilogram:</strong>  {productDetails?.infoProduct.company_price_x_kg} 
                                        </div>
                                    </div>
                                    <div className={Style.DivImage}>
                                        {productDetails?.infoProduct.company_product_img && (
                                            <img 
                                                src={productDetails.infoProduct.company_product_img} 
                                                alt={productDetails.infoProduct.company_product_name} 
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className={Style.DivNoOrders}>No orders found</div>
                )}
            </div>
        </main>
    );
};

export default SupplyChainViewSupplier;
