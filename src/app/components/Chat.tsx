"use client"

import { useEffect, useState } from "react";
import CreateSocket from "@/app/utils/socket";

interface ChatProps {
    roomCode: string;
    userId: string;
}

export default function Chat({ roomCode, userId }: ChatProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{ userId: string; message: string }[]>([]);
    const socket = CreateSocket(roomCode);

    useEffect(() => {
        socket.emit("joinRoom", roomCode);

        socket.on("message", (message) => {
            setMessages((prevMessage) => [...prevMessage, message]);
        })

        return () => {
            socket.off("chatMessage");
            socket.disconnect();
        }
    }, [roomCode])


    function sendMessage() {
        if (message.trim()) {
            socket.emit("chatMessage", roomCode, { userId, message });
            setMessage("");
        }
    }


    return (
        <div>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.userId}</strong>: {msg.message}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
    );
}
