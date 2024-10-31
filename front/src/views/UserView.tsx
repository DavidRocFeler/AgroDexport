"use client";
import React, { useEffect, useState } from "react";
import { ISettingsUserProps } from "@/interface/types";
import { getAllUsers } from "@/server/getAllUser";
import UserCard from "@/components/UserCards";
import { useUserStore } from "@/store/useUserStore";

const UserView: React.FC = () => {
  const [users, setUsers] = useState<ISettingsUserProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { role_name } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (role_name === "admin") {
          const data = await getAllUsers();
          setUsers(data);
        } else {
          setError("You do not have permissions to view this information.");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error loading users"
        );
      }
    };

    fetchUsers();
  }, [role_name]);

  const handleDelete = (id: string) => {
    console.log(`Deleting user with id: ${id}`);
    // Logic to delete the user
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!users) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-xl">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 font-inter">
      <h1 className="text-[96px] text-center mb-12 font-inter">Users List</h1>
      <div
        className={`${
          users.length === 0
            ? "border border-black w-full h-64 flex items-center justify-center"
            : ""
        }`}
      >
        {users.length === 0 ? (
          <p className="text-gray-500">There are no registered users</p>
        ) : (
          users.map((user) => (
            <UserCard key={user.id} {...user} onDelete={handleDelete} />
          ))
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="font-inter border border-black px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          Come back
        </button>
      </div>
    </div>
  );
};

export default UserView;
