"use client";
import React, { useState } from 'react';
import { useChatbotSocket } from '@/server/chatbotService';

const ChatBotComponent: React.FC = () => {
  const { messages, sendMessage } = useChatbotSocket();
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  console.log("Rendered messages in component:", messages);

  return (
    <div className="chat-container bg-gray-100 p-4 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">AgroDexports ChatBot</h2>
      <div className="messages bg-white p-4 rounded overflow-y-auto h-64">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${
              msg.user === 'bot' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >
            <strong>{msg.user === 'bot' ? 'Bot' : 'You'}:</strong> {msg.text || "No message"}
          </div>
        ))}
      </div>
      <div className="input-container flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotComponent;
