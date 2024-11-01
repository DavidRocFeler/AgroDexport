"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Notifications.module.css";
import { INotificationsProps, INotification } from "@/interface/types";

const NotificationsModal: React.FC<INotificationsProps> = ({
  isVisible,
  notifications,
  onClose,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose(); // Cerrar el modal llamando a la función proporcionada por el padre
  };

  return (
    <>
      {/* Overlay/Fondo oscuro */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: modalVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          visibility: modalVisible ? "visible" : "hidden",
          zIndex: 999,
        }}
        onClick={handleCloseModal}
      />

      {/* Modal */}
      <div
        className={`${styles.modal} ${modalVisible ? styles.modalVisible : ""}`}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Notifications</h2>
          {/* Botón de cierre del modal */}
          <button
            onClick={handleCloseModal}
            className={styles.modalCloseButton}
          >
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          {/* Mostrar notificaciones recibidas */}
          {notifications.length > 0 ? (
            <ul className={styles.notificationsList}>
              {notifications.map(
                (notification: INotification, index: number) => (
                  <li
                    key={index}
                    className={`
                    ${styles.notificationItem}
                    ${notification.isRead ? styles.read : styles.unread}
                    ${styles[notification.type]}
                  `}
                  >
                    {notification.message}
                  </li>
                )
              )}
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
