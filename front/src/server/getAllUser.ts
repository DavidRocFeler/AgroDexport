import { ISettingsUserProps } from "@/interface/types";
import { useUserStore } from "@/store/useUserStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (): Promise<ISettingsUserProps[]> => {
  const { token } = useUserStore.getState();

  try {
    const res = await fetch(`${API_URL}/users`, {
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
