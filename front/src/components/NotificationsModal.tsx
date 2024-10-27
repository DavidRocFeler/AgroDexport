"use client"
import React, { useState } from 'react';
import styles from '../styles/Notifications.module.css';
import { INotificationsProps } from '@/interface/types';
import { useEffect } from 'react';
import { useSocket } from '../app/useSocket';
import { useUserStore } from '@/store/useUserStore';

console.log('NotificationsModal montado');


const NotificationsModal: React.FC<INotificationsProps> = ({ isVisible, onClose }) => {
  const { user_id } = useUserStore(); // Obtener user_id del estado global
  const { socket, notifications } = useSocket(user_id || ''); // Inicializa el socket con un valor seguro
  const [modalVisible, setModalVisible] = useState(false);

  // Efecto para manejar la visibilidad del modal
  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  // Efecto para manejar el evento 'newNotification'
  useEffect(() => {
    if (!socket || !user_id) return; // Verifica si socket y user_id están definidos

    socket.on('newNotification', (notification) => {
      console.log('Nueva notificación recibida:', notification);
    });

    return () => {
      socket.off('newNotification'); // Desconectar el evento al desmontar
    };
  }, [socket, user_id]);
  
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
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    visibility: isVisible ? 'visible' : 'hidden',
                    zIndex: 999,
                }}
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Notifications</h2>
                    <button 
                        onClick={onClose}
                        className={styles.modalCloseButton}
                    >
                        ×
                    </button>
                    </div>
        <div className={styles.modalContent}>
          {/* Mostrar notificaciones recibidas */}
          {notifications.length > 0 ? (
            <ul className={styles.notificationsList}>
              {notifications.map((notification, index) => (
                <li key={index} className={styles.notificationItem}>
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