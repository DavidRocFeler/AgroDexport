"use client";
import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { getOrders } from "@/server/adminData";
import { IOrder } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";
import styles from "../styles/AdminOrderList.module.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AdminOrderList: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { token } = useUserStore();

  const loadOrders = async () => {
    if (token) {
      try {
        const data: IOrder[] = await getOrders(token);
        setOrders(data);
      } catch (err) {
        console.error("Error loading orders", err);
      }
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (token) {
        await loadOrders();
      }
    };
  
    fetchOrders(); 
  
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); 
  
    return () => clearInterval(interval); 
  }, [token]); 
  

  const finishedOrders = orders.filter(order => order.orderDetail?.order_status === "finished");

  const companyLabels = Array.from(
    new Set(finishedOrders.flatMap(order => [order.supplier?.company_name, order.buyer?.company_name].filter(Boolean)))
  );


  const supplierData = companyLabels.map(label => {
    const total = finishedOrders
      .filter(order => order.supplier?.company_name === label)
      .reduce((sum, order) => sum + (order.orderDetail.total || 0), 0);
    return total > 0 ? total : null; // Usa null en lugar de 0 para evitar colapso visual
  });

  const buyerData = companyLabels.map(label => {
    const total = finishedOrders
      .filter(order => order.buyer?.company_name === label)
      .reduce((sum, order) => sum + (order.orderDetail.total || 0), 0);
    return total > 0 ? total : null; // Usa null en lugar de 0 para evitar colapso visual
  });

  // Configuración de datos para el gráfico de radar
  const radarData = {
    labels: companyLabels,
    datasets: [
      {
        label: "Supplier",
        data: supplierData,
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        fill: true,
        spanGaps: true, // Permitir saltar gaps donde los valores son null
      },
      {
        label: "Buyer",
        data: buyerData,
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        fill: true,
        spanGaps: true, // Permitir saltar gaps donde los valores son null
      },
    ],
  };

  // Configuración de opciones para el gráfico de radar
  const maxTotal = Math.max(...supplierData.filter(val => val !== null), ...buyerData.filter(val => val !== null)) || 1;
  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: maxTotal,
        ticks: {
          stepSize: maxTotal / 5,
        },
      },
    },
    elements: {
      line: {
        tension: 0.1, // Ajuste de tensión bajo para mantener las líneas sin colapsar
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className={styles.orderList}>
      <div className={styles.header}>Total Value of Finished Orders by Company</div>
      <div className={styles.chartContainer}>
        <Radar data={radarData} options={radarOptions} />
      </div>
    </div>
  );  
};

export default AdminOrderList;
