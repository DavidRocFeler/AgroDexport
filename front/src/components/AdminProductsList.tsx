"use client";
import React, { useEffect, useState } from "react";
import { Line, Bar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { getProductDB } from "@/server/getProduct";
import { IAgriProduct } from "@/interface/types";
import styles from "../styles/AdminProductList.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  ArcElement
);

const AdminProductList: React.FC = () => {
  const [products, setProducts] = useState<IAgriProduct[]>([]);

  const loadProducts = async () => {
    try {
      const data: IAgriProduct[] = await getProductDB();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const harvestData = products.reduce((acc: Record<string, number>, product) => {
    if (product.harvest_date) {
      const date = new Date(product.harvest_date);
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
      acc[monthYear] = (acc[monthYear] || 0) + 1;
    }
    return acc;
  }, {});

  const harvestChartData = {
    labels: Object.keys(harvestData)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()),
    datasets: [
      {
        label: "", // Elimina la etiqueta del gráfico de líneas
        data: Object.values(harvestData),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const harvestChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Products by Harvest Date (Month/Year)",
        font: { size: 16 },
      },
      legend: {
        display: false, // Oculta el legend
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },
  };

  const categoryData = products.reduce((acc: Record<string, number>, product) => {
    const categoryName = product.category?.name_category || "Unknown";
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "", // Elimina la etiqueta del gráfico de barras
        data: Object.values(categoryData),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Products by Category",
        font: { size: 16 },
      },
      legend: {
        display: false, // Oculta el legend
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },
  };

  const companyData = products.reduce((acc: Record<string, number>, product) => {
    const companyName = product.company?.company_name || "Unknown";
    acc[companyName] = (acc[companyName] || 0) + 1;
    return acc;
  }, {});

  const companyChartData = {
    labels: Object.keys(companyData),
    datasets: [
      {
        label: "", // No necesita label en el Polar Area Chart
        data: Object.values(companyData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", 
          "rgba(54, 162, 235, 0.6)", 
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)", 
          "rgba(153, 102, 255, 0.6)", 
          "rgba(255, 159, 64, 0.6)",
          "rgba(201, 203, 207, 0.6)", 
          "rgba(255, 99, 132, 0.8)", 
          "rgba(54, 162, 235, 0.8)", 
          "rgba(255, 206, 86, 0.8)",
        ],
      },
    ],
  };

  const polarAreaChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Products by Company",
        font: { size: 16 },
        padding: { top: 10, bottom: -60 },
      },
      legend: {
        display: false, // Oculta las etiquetas
      },
    },
  };

  return (
    <section className={styles.AdminProductList}>
      <div className={styles.ChartContainer}>
        <div className={styles.LineChart}>
          <Line data={harvestChartData} options={harvestChartOptions} />
        </div>
        <div className={styles.BarChart}>
          <Bar data={categoryChartData} options={categoryChartOptions} />
        </div>
        <div className={styles.PolarAreaChart}>
          <PolarArea data={companyChartData} options={polarAreaChartOptions} />
        </div>
      </div>
    </section>
  );
};

export default AdminProductList;
