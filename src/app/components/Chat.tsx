"use client";

import { useEffect, useState } from "react";
import CreateSocket from "@/app/utils/socket";
import { useUser } from "../context/UserContext";

interface ChatProps {
  roomCode: string;
}

export default function Chat({ roomCode }: ChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ userId: string; message: string }[]>([]);
  const socket = CreateSocket();
  const { userId } = useUser();

  useEffect(() => {
    if (roomCode) {
      joinRoom();
    }

    socket.on("receive_message", (message_from_server) => {
      console.log("Message received:", message_from_server);
      setMessages((prevMessages) => [...prevMessages, message_from_server]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [socket, roomCode]);

  function joinRoom() {
    if (roomCode) {
      console.log("Joining room:", {userId, roomCode});
      socket.emit("join_room", {userId, roomCode});
    }
  }

  function sendMessage() {
    if (message.trim()) {
      console.log("Sending message:", message);
      socket.emit("chatMessage", { message, roomCode });
      setMessage("");
    }
  }

  return (
    <div>
      <div>
        <p>In room: {roomCode}</p>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h1>Messages:</h1>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.userId}</strong>: {msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}