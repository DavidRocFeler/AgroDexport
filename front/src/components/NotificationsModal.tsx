"use client"
import React, { useState } from 'react';
import styles from '../styles/Notifications.module.css';
import { INotificationsProps } from '@/interface/types';
import { useEffect } from 'react';
// import { useSocket } from '../app/useSocket';

console.log('NotificationsModal montado');


const NotificationsModal: React.FC<INotificationsProps> = ({ isVisible, onClose }) => {
  const [ modalVisible, setModalVisible ] = useState(true);
//   const { notifications } = useSocket(); 
  // No se donde se monta este componente para ver si funciona el socket.io
  
  useEffect(() => {
    if (isVisible) {
        setModalVisible(true)
        console.log("Modal is now visible");
    } else {
        console.log("Modal is now hidden");
    }
}, [isVisible]);

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
                    <h2 className={styles.modalTitle}>Welcome Notifications</h2>
                    <button 
                        onClick={onClose}
                        className={styles.modalCloseButton}
                    >
                        ×
                    </button>
                </div>
                <div className={styles.modalContent}>
                    {/* Contenido del modal aquí */}
                    <p className="p-4">Tus notificaciones aparecerán aquí</p>
                </div>
            </div>
        </>
    );
};

export default NotificationsModal;