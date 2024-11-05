import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const useChatbotSocket = () => {
  const [messages, setMessages] = useState<{ text: string; user: string }[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!SOCKET_URL) {
      console.error('SOCKET_URL is not defined');
      return;
    }

    // console.log('Connecting to WebSocket server for chatbot:', SOCKET_URL);
    socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });

    socketRef.current.on('connect', () => {
      // console.log('Connected to WebSocket server for chatbot');
    });

    socketRef.current.on('bot_response', (response) => {
      // console.log('Bot response received:', response);

      if (response && response.text) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, { text: response.text, user: 'bot' }];
          // console.log("Updated messages after bot response (inside setState):", updatedMessages);
          return updatedMessages;
        });
      }
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      // console.log('Disconnecting from WebSocket server for chatbot');
      socketRef.current?.disconnect();
    };
  }, []);

  // Modified sendMessage function to include userId in the message
  const sendMessage = (message: string, userId: string) => {
    if (socketRef.current) {
      // console.log('Sending message to server:', message);
      socketRef.current.emit('user_message', { message, userId }); // Send both message and userId
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { text: message, user: 'user' }];
        // console.log("Updated messages after user message (inside setState):", updatedMessages);
        return updatedMessages;
      });
    }
  };

  return { messages, sendMessage };
};
