"use client"
import React, { useState } from 'react';
import styles from '../styles/Notifications.module.css';
import { INotificationsProps } from '@/interface/types';
import { useEffect } from 'react';
import { useSocket } from '../server/useSocket';
import { useUserStore } from '@/store/useUserStore';
import { INotification } from '@/interface/types';
import { getNotifications, markNotificationAsRead } from "@/server/notificationsSetting"


console.log('NotificationsModal montado');

  const NotificationsModal: React.FC<INotificationsProps> = ({ isVisible, onClose }) => {
    const { user_id, token } = useUserStore(); // Obtener user_id y token del estado global
    const { socket, notifications } = useSocket(user_id || ''); // Hook siempre se llama sin condiciones
    const [modalVisible, setModalVisible] = useState(false);
    const [allNotifications, setAllNotifications] = useState<INotification[]>([]); // Estado para todas las notificaciones
  
    useEffect(() => {
      setModalVisible(isVisible);
    }, [isVisible]);
  

    useEffect(() => {
      const fetchNotifications = async () => {
        if (user_id && token) {
          try {
            const data = await getNotifications(user_id, token);
            setAllNotifications(data);
          } catch (error) {
            console.error('Error al cargar notificaciones:', error);
          }
        }
      };
  
      fetchNotifications();
    }, [user_id, token]);
  

    useEffect(() => {
      if (socket && user_id) {
        socket.on('newNotification', (notification) => {
          console.log('Nueva notificación recibida:', notification);
          setAllNotifications((prev) => [notification, ...prev]); // Insertar al inicio
        });
  
        return () => {
          socket.off('newNotification'); // Desconectar el evento al desmontar
        };
      }
    }, [socket, user_id]);
  
// Marcar todas las notificaciones como leídas al cerrar el modal
const handleMarkAllAsRead = async () => {
  if (!token) {
    console.error('Token no disponible');
    return;
  }

  const unreadNotifications = allNotifications.filter(notification => !notification.isRead);

  for (const notification of unreadNotifications) {
    // Llamar a la API sin enviar isRead en el cuerpo, solo con el ID
    await markNotificationAsRead(notification.notification_id, token);
  }

  // Actualizar el estado para reflejar que todas están leídas
  setAllNotifications(prev => 
    prev.map(notification => ({ ...notification, isRead: true }))
  );
};

const handleCloseModal = () => {
  setModalVisible(false);
  handleMarkAllAsRead(); // Ejecutar al cerrar el modal
  onClose(); // Llamar a la función de cierre original
};
    
  
    if (!user_id) {
      console.error('El user_id está indefinido en NotificationsModal');
      return null;
    }
  
    return (
      <>
        {/* Overlay/Fondo oscuro */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: modalVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
            visibility: modalVisible ? 'visible' : 'hidden',
            zIndex: 999,
          }}
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`${styles.modal} ${modalVisible ? styles.modalVisible : ''}`}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Notifications</h2>
          {/* Botón de cierre del modal */}
          <button 
            onClick={handleCloseModal} // Cambiar a handleCloseModal
            className={styles.modalCloseButton}
            >
            ×
          </button>
          </div>
          <div className={styles.modalContent}>
            {/* Mostrar notificaciones recibidas */}
            {allNotifications.length > 0 ? (
              <ul className={styles.notificationsList}>
                {allNotifications.map((notification, index) => (
                  <li key={index} 
                    className={`${styles.notificationItem} ${notification.isRead ? styles.read : ''}`}>
                    {notification.message}
                  </li>                
                ))}
              </ul>
            ) : (
              <p className="p-4">No hay notificaciones nuevas</p>
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default NotificationsModal;
  