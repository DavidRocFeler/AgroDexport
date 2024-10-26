// import { useEffect, useRef, useState } from 'react';
// import * as io from 'socket.io-client';



// const SOCKET_URL = process.env.API_URL; 

// export const useSocket = () => {
//   const [socket, setSocket] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const socketRef = useRef();

//   useEffect(() => {
//     // Conectar al servidor de socket
//     socketRef.current = io(SOCKET_URL, {
//       transports: ['websocket'],
//     });

//     // Guardar la instancia de socket
//     setSocket(socketRef.current);

//     // Manejar la llegada de notificaciones
//     socketRef.current.on('notification', (notification) => {
//       setNotifications((prev) => [...prev, notification]);
//     });

//     return () => {
//       // Desconectar cuando el componente se desmonte
//       socketRef.current.disconnect();
//     };
//   }, []);

//   return { socket, notifications };
// };
