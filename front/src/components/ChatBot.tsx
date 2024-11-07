"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChatbotSocket } from "@/server/chatbotService";
import { useUserStore } from "@/store/useUserStore";
import { Bot } from "lucide-react";
import styles from "../styles/ChatBot.module.css";

const ChatBotComponent: React.FC = () => {
  const { messages, sendMessage } = useChatbotSocket();
  const [input, setInput] = useState("");
  const { user_id } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (!user_id) return;
    if (input.trim()) {
      sendMessage(input, user_id);
      setInput("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

    // Scroll to the bottom every time messages are updated
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  console.log("Rendered messages in component:", messages);

  return (
    <div
      className={styles.chatContainer}
      style={{ width: "90vw", maxWidth: "31vw", height: "90vh" }}
    >
      <h2 className="flex items-center justify-center mb-4 text-lg font-bold text-center">
        <Bot className="mr-2" /> {/* Ícono Bot de lucide-react */}
        AgroDexports ChatBot
      </h2>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.user === "bot" ? styles.botMessage : styles.userMessage
            }
          >
            <strong>{msg.user === "bot" ? "AgroBot" : "You"}:</strong>{" "}
            {msg.text || "No message"}
          </div>
        ))}
        {/* Referencia al final del contenedor para desplazarse */}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotComponent;
