"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { getCompanies } from "@/server/adminData";
import { ICompany } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";
import styles from "../styles/AdminCompanyList.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminCompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const { token } = useUserStore();

  const loadCompanies = async () => {
    if (token) {
      try {
        const data: ICompany[] = await getCompanies({}, token);
        setCompanies(data);
      } catch (err) {
        console.error("Error loading companies", err);
      }
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const countriesData = companies.reduce(
    (acc: Record<string, number>, company) => {
      acc[company.country] = (acc[company.country] || 0) + 1;
      return acc;
    },
    {}
  );

  const countryChartData = {
    labels: Object.keys(countriesData),
    datasets: [
      {
        label: "Companies by Country",
        data: Object.values(countriesData),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Companies by Country",
        font: { size: 16 },
      },
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...Object.values(countriesData)) + 2,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const activeCompanies = companies.filter(
    (company) => company.isActive
  ).length;
  const inactiveCompanies = companies.length - activeCompanies;

  const activityChartData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [activeCompanies, inactiveCompanies],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  const roleData = companies.reduce((acc: Record<string, number>, company) => {
    const role = company.user?.role?.role_name || "Unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const roleChartData = {
    labels: Object.keys(roleData),
    datasets: [
      {
        data: Object.values(roleData),
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
      },
    ],
  };

  const pieChartOptions = (title: string) => ({
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        },
      },
    },
  });

  return (
    <section
      className={`${styles.AdminCompanyList} max-h-[250px] overflow-hidden`}
    >
      <div className={styles.ChartContainer}>
        <div className={styles.BarChart}>
          <Bar data={countryChartData} options={barChartOptions} />
        </div>
        <div className={styles.PieChart}>
          <Pie
            data={activityChartData}
            options={pieChartOptions("Company Activity Status")}
          />
        </div>
        <div className={styles.PieChart}>
          <Pie
            data={roleChartData}
            options={pieChartOptions("Company Types")}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminCompanyList;
