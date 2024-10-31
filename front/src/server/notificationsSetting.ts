import { INotification } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener todas las notificaciones de un usuario
export const getNotifications = async (user_id: string, token: string): Promise<INotification[]> => {
  try {
    const response = await fetch(`${API_URL}/notifications/unread/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Token para autenticación
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las notificaciones del usuario");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error en la obtención de notificaciones:", error.message);
    throw new Error(error.message || "Error inesperado");
  }
};


export const markNotificationAsRead = async (notification_id: string, token: string): Promise<INotification | null> => {
    try {
      const response = await fetch(`${API_URL}/notifications/${notification_id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error al marcar la notificación como leída");
        return null;
      }
  
      const updatedNotification = await response.json(); // Obtener la notificación actualizada
      return updatedNotification;
    } catch (error: any) {
      console.error("Error al actualizar la notificación:", error.message);
      return null;
    }
  };
  
  
  
