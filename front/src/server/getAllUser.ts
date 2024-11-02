import { ISettingsUserProps } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserFilters {
  role?: string;
  country?: string;
  lastname?: string;
  name?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const getAllUsers = async (filters: UserFilters = {}): Promise<ISettingsUserProps[]> => {
  const { token } = useUserStore.getState();

  // Construir los parámetros de consulta a partir de los filtros
  const queryParams = new URLSearchParams();
  
  if (filters.role) queryParams.append("role", filters.role);
  if (filters.country) queryParams.append("country", filters.country);
  if (filters.lastname) queryParams.append("lastname", filters.lastname);
  if (filters.name) queryParams.append("name", filters.name);
  if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
  if (filters.order) queryParams.append("order", filters.order);

  try {
    const res = await fetch(`${API_URL}/users?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error obtaining user data");
    }

    const data: ISettingsUserProps[] = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error");
  }
};
