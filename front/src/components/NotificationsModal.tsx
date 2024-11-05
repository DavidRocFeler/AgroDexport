// --------------by Jorge----------------------------------------
//"use client";
// import React, { useEffect, useState } from "react";
// import styles from "../styles/Notifications.module.css";
// import { INotificationsProps, INotification } from "@/interface/types";

// const NotificationsModal: React.FC<INotificationsProps> = ({
//   isVisible,
//   notifications,
//   onClose,
// }) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     setModalVisible(isVisible);
//   }, [isVisible]);

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     onClose(); // Cerrar el modal llamando a la función proporcionada por el padre
//   };

//   return (
//     <>
//       {/* Overlay/Fondo oscuro */}
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           opacity: modalVisible ? 1 : 0,
//           transition: "opacity 0.3s ease",
//           visibility: modalVisible ? "visible" : "hidden",
//           zIndex: 999,
//         }}
//         onClick={handleCloseModal}
//       />

//       {/* Modal */}
//       <div
//         className={`${styles.modal} ${modalVisible ? styles.modalVisible : ""}`}
//       >
//         <div className={styles.modalHeader}>
//           <h2 className={styles.modalTitle}>Notifications</h2>
//           {/* Botón de cierre del modal */}
//           <button
//             onClick={handleCloseModal}
//             className={styles.modalCloseButton}
//           >
//             ×
//           </button>
//         </div>
//         <div className={styles.modalContent}>
//           {/* Mostrar notificaciones recibidas */}
//           {notifications.length > 0 ? (
//             <ul className={styles.notificationsList}>
//               {notifications.map(
//                 (notification: INotification, index: number) => (
//                   <li
//                     key={index}
//                     className={`
//                     ${styles.notificationItem}
//                     ${notification.isRead ? styles.read : styles.unread}
//                     ${styles[notification.type]}
//                   `}
//                   >
//                     {notification.message}
//                   </li>
//                 )
//               )}
//             </ul>
//           ) : (
//             <p className="p-4">No hay notificaciones nuevas</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default NotificationsModal;

//--------------------------------------------------------------
//--------------------------------------------------------------
// "use client";
// import React, { useEffect, useState } from "react";
// import { INotificationsProps, INotification } from "@/interface/types";

// const NotificationsModal: React.FC<INotificationsProps> = ({
//   isVisible,
//   notifications,
//   onClose,
//   userId,
// }) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     setModalVisible(isVisible);
//   }, [isVisible]);

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     onClose();
//   };

//   // Helper function to format the date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = Math.floor(
//       (now.getTime() - date.getTime()) / (1000 * 60 * 60)
//     );

//     if (diffInHours < 24) {
//       return `${diffInHours} horas`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   if (!modalVisible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-end pt-16">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
//         {/* Header */}
//         <div className="px-4 py-3 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Notificaciones
//             </h2>
//             <button
//               onClick={handleCloseModal}
//               className="text-blue-600 font-medium hover:text-blue-700"
//             >
//               Ver todo
//             </button>
//           </div>
//         </div>

//         {/* Notifications List */}
//         <div className="px-2 py-2 max-h-[80vh] overflow-y-auto">
//           {notifications && notifications.length > 0 ? (
//             <div className="space-y-3">
//               {notifications.map((notification) => (
//                 <div
//                   key={notification.notification_id}
//                   className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
//                 >
//                   {/* Profile Icon or Type Icon */}
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                       {/* You can add different icons based on notification.type */}
//                       <span className="text-blue-600 text-lg">
//                         {notification.type === "message" ? "✉️" : "🔔"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <p className="text-sm text-gray-900">
//                           {notification.message}
//                         </p>
//                         <p className="text-xs text-blue-600 mt-1">
//                           {formatDate(notification.notification_date)}
//                         </p>
//                       </div>
//                       {!notification.isRead && (
//                         <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center py-4 text-gray-500">
//               No hay notificaciones nuevas
//             </p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-4 py-3 border-t border-gray-200">
//           <button
//             onClick={handleCloseModal}
//             className="w-full text-center text-gray-600 font-medium py-2 hover:bg-gray-50 rounded-lg"
//           >
//             Ver notificaciones anteriores
//           </button>
//         </div>
//       </div>

//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-25 -z-10"
//         onClick={handleCloseModal}
//       />
//     </div>
//   );
// };

// export default NotificationsModal;

//-------------------------------------------------------------------------------------------------------------------
// --------funciona pero no muestra notiificaciones anteriores------------------------------------------------------------------------------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { INotificationsProps, INotification } from "@/interface/types";
const NotificationsModal: React.FC<INotificationsProps> = ({
  isVisible,
  notifications,
  onClose,
  userId,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} horas`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => !n.isRead);

  if (!modalVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end top-[5.5rem] ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Main Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Notificaciones</h2>
            {/* <button className="text-gray-600 hover:bg-gray-100 rounded-full p-2">
              <span className="text-xl">⋯</span>
            </button> */}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === "unread"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            No leídas
          </button>
        </div>

        {/* Section Header */}
        {/* <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-800">
              Anteriores
            </h3>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              Ver todo
            </button>
          </div>
        </div> */}

        {/* Notifications List */}
        <div className="px-2 py-2 max-h-[60vh] overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.notification_id}
                  className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  {/* Profile Icon or Type Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-lg">
                        {notification.type === "message" ? "✉️" : "🔔"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {notification.message}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {formatDate(notification.notification_date)}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">
              No hay notificaciones nuevas
            </p>
          )}
        </div>

        {/* Footer */}
        {/* <div className="px-4 py-3 border-t border-gray-200">
          <button
            onClick={handleCloseModal}
            className="w-full text-center text-gray-600 font-medium py-2 hover:bg-gray-50 rounded-lg"
          >
            Ver notificaciones anteriores
          </button>
        </div> */}
      </div>

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25 -z-10"
        onClick={handleCloseModal}
      />
    </div>
  );
};

export default NotificationsModal;

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// "use client";
// import React, { useEffect, useState } from "react";
// import { INotificationsProps, INotification } from "@/interface/types";

// const NOTIFICATIONS_PER_PAGE = 5; // Número de notificaciones a mostrar por página

// const NotificationsModal: React.FC<INotificationsProps> = ({
//   isVisible,
//   notifications,
//   onClose,
//   userId,
// }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
//   const [visibleNotifications, setVisibleNotifications] = useState<number>(
//     NOTIFICATIONS_PER_PAGE
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setModalVisible(isVisible);
//   }, [isVisible]);

//   useEffect(() => {
//     // Reset visible notifications when tab changes
//     setVisibleNotifications(NOTIFICATIONS_PER_PAGE);
//   }, [activeTab]);

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     onClose();
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = Math.floor(
//       (now.getTime() - date.getTime()) / (1000 * 60 * 60)
//     );

//     if (diffInHours < 24) {
//       return `${diffInHours} horas`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   const filteredNotifications =
//     activeTab === "all"
//       ? notifications
//       : notifications.filter((n) => !n.isRead);

//   const currentNotifications = filteredNotifications.slice(
//     0,
//     visibleNotifications
//   );
//   const hasMoreNotifications =
//     visibleNotifications < filteredNotifications.length;

//   const loadMoreNotifications = async () => {
//     setIsLoading(true);

//     // Simulamos una carga con un pequeño delay
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     setVisibleNotifications((prev) => prev + NOTIFICATIONS_PER_PAGE);
//     setIsLoading(false);
//   };

//   if (!modalVisible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-end pt-16">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
//         {/* Main Header */}
//         <div className="px-4 py-3 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-gray-800">Notificaciones</h2>
//             <button className="text-gray-600 hover:bg-gray-100 rounded-full p-2">
//               <span className="text-xl">⋯</span>
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200">
//           <button
//             onClick={() => setActiveTab("all")}
//             className={`flex-1 px-4 py-3 text-sm font-medium ${
//               activeTab === "all"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-600 hover:bg-gray-50"
//             }`}
//           >
//             Todas
//           </button>
//           <button
//             onClick={() => setActiveTab("unread")}
//             className={`flex-1 px-4 py-3 text-sm font-medium ${
//               activeTab === "unread"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-600 hover:bg-gray-50"
//             }`}
//           >
//             No leídas
//           </button>
//         </div>

//         {/* Section Header */}
//         {/* <div className="px-4 py-3 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h3 className="text-base font-semibold text-gray-800">
//               Anteriores
//             </h3>
//             <button className="text-blue-600 font-medium hover:text-blue-700">
//               Ver todo
//             </button>
//           </div>
//         </div> */}

//         {/* Notifications List */}
//         <div className="px-2 py-2 max-h-[60vh] overflow-y-auto">
//           {currentNotifications.length > 0 ? (
//             <div className="space-y-3">
//               {currentNotifications.map((notification) => (
//                 <div
//                   key={notification.notification_id}
//                   className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
//                 >
//                   {/* Profile Icon or Type Icon */}
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                       <span className="text-blue-600 text-lg">
//                         {notification.type === "message" ? "✉️" : "🔔"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <p className="text-sm text-gray-900">
//                           {notification.message}
//                         </p>
//                         <p className="text-xs text-blue-600 mt-1">
//                           {formatDate(notification.notification_date)}
//                         </p>
//                       </div>
//                       {!notification.isRead && (
//                         <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center py-4 text-gray-500">
//               No hay notificaciones nuevas
//             </p>
//           )}
//         </div>

//         {/* Footer */}
//         {hasMoreNotifications && (
//           <div className="px-4 py-3 border-t border-gray-200">
//             <button
//               onClick={loadMoreNotifications}
//               disabled={isLoading}
//               className="w-full text-center text-gray-600 font-medium py-2 hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <span className="flex items-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Cargando...
//                 </span>
//               ) : (
//                 "Ver notificaciones anteriores"
//               )}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-25 -z-10"
//         onClick={handleCloseModal}
//       />
//     </div>
//   );
// };

// export default NotificationsModal;
