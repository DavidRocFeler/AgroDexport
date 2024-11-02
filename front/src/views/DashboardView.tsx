"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/app/ProtectedRoute";
import AdminDashboardRow from "@/components/AdminDashboardRow";
import AdminProductList from "@/components/AdminProductsList";
import AdminUserList from "@/components/AdminUserList";
import AdminCompanyList from "@/components/AdminCompanyList";
import { X } from "lucide-react";

const DashboardView: React.FC = () => {
  // Ejemplo de datos de usuarios - En un caso real vendría de una API
  const [users] = useState([
    {
      id: 1,
      name: "John",
      lastName: "Doe",
      user_name: "johndoe",
      email: "john@example.com",
      companies: ["Company A", "Company B"],
      ordersReceived: 15,
    },
    {
      id: 2,
      name: "Jane",
      lastName: "Smith",
      user_name: "janesmith",
      email: "jane@example.com",
      companies: ["Company C"],
      ordersReceived: 8,
    },
  ]);

  const handleDeleteUser = (userId: number) => {
    console.log(`Deleting user with ID: ${userId}`);
    // Aquí iría la lógica para eliminar el usuario
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <section className="min-h-screen bg-gray-100">
        <div className="bg-[#C4E2FF] pt-8 pb-16">
          <div className="max-w-9xl mx-8 px-4 sm:px-6 lg:px-8">
            {/* Primera Fila - KPIs */}
            <div className="mb-6 h-[400px]">
              <div className="bg-white rounded-lg shadow p-6 h-full">
                <AdminDashboardRow />
              </div>
            </div>

            {/* Segunda Fila - Users y Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Users List */}
              <div className="bg-white rounded-lg shadow p-6  h-[200px] overflow-auto">
                <AdminUserList />
              </div>

              {/* Products List */}
              <div className="bg-white rounded-lg shadow p-6 h-[200px]  overflow-auto">
                <AdminCompanyList />
              </div>
            </div>

            {/* Tercera Fila - Companies y Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Companies List */}
              <div className="col-span-2 bg-white rounded-lg shadow p-2 h-[400px] overflow-auto">
                <AdminProductList />
              </div>

              {/* Orders List */}
              <div className="bg-white rounded-lg shadow p-6 h-[400px] overflow-auto">
                <h2>AdminOrdersList</h2>
              </div>
            </div>

            {/* Nueva Tabla de Usuarios */}
            <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">User Table</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      LastName
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Companies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders Received
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.companies.join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.ordersReceived}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default DashboardView;
