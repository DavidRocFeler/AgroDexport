// pruebas conexión

const socket = require('socket.io-client')('http://localhost:3002', {
    transports: ['websocket'],  
  });
  
  socket.on('connect', () => {
    console.log('Conectado al servidor WebSocket!');
    socket.emit('joinRoom', 'testRoom');
  });
  
  socket.on('newNotification', (notification) => {
    console.log('Notificación recibida:', notification);
  });
  
  socket.on('connect_error', (error) => {
    console.error('Error de conexión:', error);
  });
  