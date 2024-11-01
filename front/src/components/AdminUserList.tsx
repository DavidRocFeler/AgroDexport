"use client";
import React, { useEffect, useState } from 'react';
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { getUsers } from "@/server/adminData";
import { ISettingsUserProps } from "@/interface/types";
import { useUserStore } from '@/store/useUserStore';
import styles from '../styles/AdminUserList.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminUserList: React.FC = () => {
  const [users, setUsers] = useState<ISettingsUserProps[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      loadUsers();
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000); 
  
    return () => clearInterval(interval);
  }, []);


  const countriesData = users.reduce((acc: Record<string, number>, user) => {
    if (user.country) {
      acc[user.country] = (acc[user.country] || 0) + 1;
    }
    return acc;
  }, {});

  const countryChartData = {
    labels: Object.keys(countriesData),
    datasets: [
      {
        label: "Users by Country",
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
        text: "Users by Country",
        font: { size: 16 },
      },
      legend: {
        display: true,
        position: 'top' as const,
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

  const completedProfiles = users.filter(user => user.country && user.user_name && user.user_lastname && user.nDni).length;
  const incompleteProfiles = users.length - completedProfiles;

  const profileChartData = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        data: [completedProfiles, incompleteProfiles],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  const userTypeData = users.reduce((acc: Record<string, number>, user) => {
    if (user.companies && user.companies.length > 0) {
      const roleName = user.role?.role_name || "Unknown";
      acc[roleName] = (acc[roleName] || 0) + 1;
    } else {
      acc["No Company"] = (acc["No Company"] || 0) + 1;
    }
    return acc;
  }, {});

  const userTypeChartData = {
    labels: ["Buyer", "Supplier", "No Company"],
    datasets: [
      {
        data: [userTypeData["buyer"] || 0, userTypeData["supplier"] || 0, userTypeData["No Company"] || 0],
        backgroundColor: ["rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)", "rgba(255, 205, 86, 0.6)"],
      },
    ],
  };

  const pieChartOptions = (title: string) => ({
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
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
    <section className={styles.AdminUserList}>
      <div className={styles.ChartContainer}>
        <div className={styles.BarChart}>
          <Bar data={countryChartData} options={barChartOptions} />
        </div>
        <div className={styles.PieChart}>
          <Pie data={profileChartData} options={pieChartOptions("Profile Completion Status")} />
        </div>
        <div className={styles.PieChart}>
          <Doughnut data={userTypeChartData} options={pieChartOptions("User Types")} />
        </div>
      </div>
    </section>
  );
};

export default AdminUserList;
