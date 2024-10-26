// import { useEffect, useRef, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

// const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL as string;

// console.log('Conectando a:', SOCKET_URL);

// export const useSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     if (!SOCKET_URL) {
//         console.error('SOCKET_URL no está definida');
//         return;
//       }

//     console.log('Intentando conectar al servidor de WebSocket:', SOCKET_URL);
//     // Conectar al servidor de socket
//     socketRef.current = io(SOCKET_URL, {
//       transports: ['websocket'],
//     });

//     // Guardar la instancia de socket
//     setSocket(socketRef.current);

//     // Verificar si se conecta al servidor de WebSocket
//     socketRef.current.on('connect', () => {
//       console.log('Conectado al servidor de WebSocket');
//     });

//     // Manejar la llegada de notificaciones
//     socketRef.current.on('newNotification', (notification) => {
//       console.log('Nueva notificación recibida:', notification);
//       setNotifications((prev) => [...prev, notification]);
//     });

//     // Manejar la desconexión
//     socketRef.current.on('disconnect', () => {
//       console.log('Desconectado del servidor de WebSocket');
//     });

//     return () => {
//       // Desconectar cuando el componente se desmonte
//       socketRef.current?.disconnect();
//     };
//   }, []);

//   return { socket, notifications };
// };
