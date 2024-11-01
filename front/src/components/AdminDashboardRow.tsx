"use client";
import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement } from "chart.js";
import { getUsers, getOrders } from "@/server/adminData"; 
import { getProductDB } from "@/server/getProduct";
import { ISettingsUserProps, IAgriProduct, IOrder } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";
import styles from "../styles/DashboardRow.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement);

const AdminDashboardRow: React.FC = () => {
  const [users, setUsers] = useState<ISettingsUserProps[]>([]);
  const [products, setProducts] = useState<IAgriProduct[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { token } = useUserStore();


  const loadUsers = async () => {
    if (token) {
      try {
        const data: ISettingsUserProps[] = await getUsers({}, token);
        setUsers(data);
      } catch (err) {
        console.error("Error loading users", err);
      }
    }
  };

  const loadProducts = async () => {
    try {
      const data: IAgriProduct[] = await getProductDB();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products", err);
    }
  };

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
    loadUsers();
    loadProducts();
    loadOrders();
  }, []);

  const usersWithCompanies = users.filter(user => user.companies && user.companies.length > 0).length;
  const percentageWithCompanies = users.length > 0 ? ((usersWithCompanies / users.length) * 100).toFixed(1) : "0";

  const productsWithDiscount = products.filter(product => product.discount && product.discount > 0).length;
  const percentageWithDiscount = products.length > 0 ? ((productsWithDiscount / products.length) * 100).toFixed(1) : "0";
  const percentageWithoutDiscount = (100 - parseFloat(percentageWithDiscount)).toFixed(1);

  // Datos para el gráfico de barras (de ejemplo)
const barData = {
  labels: ["Fr", "Th", "We", "Tu", "Mo"],
  datasets: [
    {
      label: "Value",
      data: [1000, 750, 800, 850, 600],
      backgroundColor: ["#88c2c9", "#b8e0c4", "#f4e9a9", "#c2a2c4", "#7aadc6"],
    },
  ],
};


  // Calcular datos para el gráfico de línea (Order Status por fecha)
  const orderStatusData = orders.reduce((acc, order) => {
    const date = new Date(order.order_date).toLocaleDateString(); // Formatea la fecha
    const status = order.orderDetail?.status;

    if (!acc[date]) {
      acc[date] = { pending: 0, cancelled: 0, finished: 0 };
    }

    if (status === "pending") {
      acc[date].pending += order.orderDetail?.total || 0;
    } else if (status === "cancelled") {
      acc[date].cancelled += order.orderDetail?.total || 0;
    } else if (status === "finished") {
      acc[date].finished += order.orderDetail?.total || 0;
    }

    return acc;
  }, {} as Record<string, { pending: number; cancelled: number; finished: number }>);

  // Preparar datos para el gráfico de líneas
  const lineLabels = Object.keys(orderStatusData);
  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Pending",
        data: lineLabels.map(date => orderStatusData[date].pending),
        borderColor: "#FFCE56",
        backgroundColor: "#FFCE56",
        fill: false,
      },
      {
        label: "Cancelled",
        data: lineLabels.map(date => orderStatusData[date].cancelled),
        borderColor: "#FF6384",
        backgroundColor: "#FF6384",
        fill: false,
      },
      {
        label: "Finished",
        data: lineLabels.map(date => orderStatusData[date].finished),
        borderColor: "#36A2EB",
        backgroundColor: "#36A2EB",
        fill: false,
      },
    ],
  };

  // Datos para el gráfico de Donut (Productos con y sin descuento)
  const donutData = {
    labels: [`${percentageWithDiscount}% With Discount`, `${percentageWithoutDiscount}% Without Discount`],
    datasets: [
      {
        data: [parseFloat(percentageWithDiscount), parseFloat(percentageWithoutDiscount)],
        backgroundColor: ["#4bc0c0", "#e0e0e0"],
        hoverBackgroundColor: ["#4bc0c0", "#e0e0e0"],
      },
    ],
  };

  return (
    <div className={styles.dashboardRow}>
      <div className={styles.card}>
        <div className={styles.header}>REGISTERED USERS</div>
        <div className={styles.main}>
          <div className={styles.kpiValue}>{users.length}</div> {/* Renderiza el total de usuarios */}
          <div className={styles.kpiLabel}>USERS</div>
        </div>
        <div className={styles.footer}>{percentageWithCompanies}% WITH COMPANIES</div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>BARS</div>
        <div className={styles.chartContainer}>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className={styles.footer}>WEEKENDS ARE OFF</div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>ORDER STATUS</div>
        <div className={styles.chartContainer}>
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className={styles.footer}>UP AND RISING</div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>DISCOUNTED PRODUCTS</div>
        <div className={styles.chartContainer}>
          <Doughnut data={donutData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className={styles.footer}>{percentageWithDiscount}% OF PRODUCTS HAVE DISCOUNTS</div>
      </div>
    </div>
  );
};

export default AdminDashboardRow;
