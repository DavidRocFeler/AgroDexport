"use client";

import React, { useEffect, useState } from "react";

import AdminDashboardRow from "@/components/AdminDashboardRow";
import AdminProductList from "@/components/AdminProductsList";
import AdminUserList from "@/components/AdminUserList";
import AdminCompanyList from "@/components/AdminCompanyList";
import { X, Check } from "lucide-react";
import { ISettingsUserProps } from "@/interface/types";
import { getAllUsers } from "@/server/getAllUser";
import { updateUserSettings } from "@/server/updateUserSettings";
import { useUserStore } from "@/store/useUserStore";
import Swal from "sweetalert2";
import AdminOrderList from "@/components/AdminOrderList";

const DashboardView: React.FC = () => {
  const [users, setUsers] = useState<ISettingsUserProps[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<ISettingsUserProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useUserStore();

  // Filtros de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>("All Roles");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    "All Countries"
  );
  const [productOrder, setProductOrder] = useState<"asc" | "desc" | null>(null);
  const [orderTotalOrder, setOrderTotalOrder] = useState<"asc" | "desc" | null>(
    null
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filteredData = [...users];

    if (searchTerm) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      filteredData = filteredData.filter((user) => {
        const hasCompany = user.companies?.some((company) =>
          company.company_name?.toLowerCase().includes(lowerCaseTerm)
        );
        const matchesUserFields =
          user.user_name?.toLowerCase().includes(lowerCaseTerm) ||
          user.user_lastname?.toLowerCase().includes(lowerCaseTerm) ||
          user.credential?.email?.toLowerCase().includes(lowerCaseTerm);

        return (
          matchesUserFields ||
          hasCompany ||
          (!user.companies?.length &&
            "no companies registered".includes(lowerCaseTerm))
        );
      });
    }

    if (selectedRole && selectedRole !== "All Roles") {
      filteredData = filteredData.filter(
        (user) => user.role?.role_name === selectedRole
      );
    }

    if (selectedCountry && selectedCountry !== "All Countries") {
      filteredData = filteredData.filter((user) =>
        user.companies?.some((company) => company.country === selectedCountry)
      );
    }

    if (productOrder) {
      filteredData = filteredData.sort((a, b) => {
        const aProducts =
          a.companies?.reduce(
            (total, company) => total + (company.products?.length || 0),
            0
          ) || 0;
        const bProducts =
          b.companies?.reduce(
            (total, company) => total + (company.products?.length || 0),
            0
          ) || 0;
        return productOrder === "asc"
          ? aProducts - bProducts
          : bProducts - aProducts;
      });
    }

    if (orderTotalOrder) {
      filteredData = filteredData.sort((a, b) => {
        const aTotalOrders =
          a.companies?.reduce(
            (total, company) => total + getTotalCompletedOrders(company),
            0
          ) || 0;
        const bTotalOrders =
          b.companies?.reduce(
            (total, company) => total + getTotalCompletedOrders(company),
            0
          ) || 0;
        return orderTotalOrder === "asc"
          ? aTotalOrders - bTotalOrders
          : bTotalOrders - aTotalOrders;
      });
    }

    setFilteredUsers(filteredData);
  }, [
    searchTerm,
    selectedRole,
    selectedCountry,
    productOrder,
    orderTotalOrder,
    users,
  ]);

  const handleToggleActiveStatus = async (user: ISettingsUserProps) => {
    if (!token) {
      console.error("Token not found");
      return;
    }

    const updatedStatus = !user.isActive;
    const action = updatedStatus ? "enable" : "ban";
    const confirmation = await Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmation.isConfirmed) {
      try {
        await updateUserSettings(
          user.user_id,
          { isActive: updatedStatus },
          token
        );
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.user_id === user.user_id ? { ...u, isActive: updatedStatus } : u
          )
        );
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.map((u) =>
            u.user_id === user.user_id ? { ...u, isActive: updatedStatus } : u
          )
        );
        Swal.fire({
          title: "Success!",
          text: `User successfully ${updatedStatus ? "enabled" : "banned"}.`,
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "There was an issue updating the user's status.",
          icon: "error",
        });
        console.error("Error updating user status:", error);
      }
    }
  };

  const getTotalCompletedOrders = (
    company: NonNullable<ISettingsUserProps["companies"]>[0]
  ): number => {
    const completedOrders =
      company.orders_buyer?.filter(
        (
          order
        ): order is { orderDetail: { total: number; order_status: string } } =>
          order?.orderDetail?.order_status === "completed"
      ) || [];

    return completedOrders.reduce(
      (total, order) => total + (order.orderDetail.total || 0),
      0
    );
  };

  const getTotalProductsCount = (
    company: NonNullable<ISettingsUserProps["companies"]>[0],
    roleName?: string
  ): number | string => {
    if (roleName === "buyer") return "N/A";
    return company.products?.length || 0;
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="bg-[#C4E2FF] pt-8 pb-16">
        <div className="max-w-9xl mx-8 px-4 sm:px-6 lg:px-8">
          {/* KPIs */}
          <div className="mb-6 h-[400px]">
            <div className="bg-white rounded-lg shadow p-6 h-full">
              <AdminDashboardRow />
            </div>
          </div>

          {/* Users and Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6 h-[200px] overflow-auto">
              <AdminUserList />
            </div>
            <div className="bg-white rounded-lg shadow p-6 h-[200px] overflow-auto">
              <AdminCompanyList />
            </div>
          </div>

          {/* Companies and Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 bg-white rounded-lg shadow p-2 h-[400px] overflow-auto">
              <AdminProductList />
            </div>
            <div className="bg-white rounded-lg shadow p-6 h-[400px] overflow-auto">
              <AdminOrderList />
            </div>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search by name, lastname, email or company"
              className="border rounded p-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border rounded p-2"
              value={selectedRole || ""}
              onChange={(e) => setSelectedRole(e.target.value || null)}
            >
              <option value="All Roles">All Roles</option>
              <option value="admin">Admin</option>
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
            </select>
            <select
              className="border rounded p-2"
              value={selectedCountry || ""}
              onChange={(e) => setSelectedCountry(e.target.value || null)}
            >
              <option value="All Countries">All Countries</option>
              {Array.from(
                new Set(
                  users.flatMap((user) =>
                    user.companies?.map((company) => company.country)
                  )
                )
              ).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <select
              className="border rounded p-2"
              value={productOrder || ""}
              onChange={(e) =>
                setProductOrder((e.target.value as "asc" | "desc") || null)
              }
            >
              <option value="">Sort Products</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <select
              className="border rounded p-2"
              value={orderTotalOrder || ""}
              onChange={(e) =>
                setOrderTotalOrder((e.target.value as "asc" | "desc") || null)
              }
            >
              <option value="">Sort Orders</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Company Table */}
          <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">
              Users registered on the platform
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Orders Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active / Disabled
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.flatMap((user) =>
                  user.companies?.length ? (
                    user.companies.map((company) => (
                      <tr
                        key={`${user.user_id}-${company.company_id}`}
                        className={!user.isActive ? "opacity-50" : ""}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.user_name || "Pending"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.user_lastname || "Pending"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {company.company_name || "No Company"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {company.country || "Pending"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.role?.role_name || "Pending"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.credential?.email || "Pending"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getTotalProductsCount(company, user.role?.role_name)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${getTotalCompletedOrders(company).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleActiveStatus(user)}
                          >
                            {user.isActive ? (
                              <X className="w-5 h-5 text-red-600" />
                            ) : (
                              <Check className="w-5 h-5 text-green-600" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr
                      key={user.user_id}
                      className={!user.isActive ? "opacity-50" : ""}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.user_name || "Pending"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.user_lastname || "Pending"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        No Companies Registered
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">Pending</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role?.role_name || "Pending"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.credential?.email || "Pending"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">N/A</td>
                      <td className="px-6 py-4 whitespace-nowrap">$0</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => handleToggleActiveStatus(user)}>
                          {user.isActive ? (
                            <X className="w-5 h-5 text-red-600" />
                          ) : (
                            <Check className="w-5 h-5 text-green-600" />
                          )}
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardView;
