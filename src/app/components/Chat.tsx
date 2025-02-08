"use client";

import { useEffect, useState } from "react";
import CreateSocket from "@/app/socket/socket";
import { SocketService } from "../socket/soketServices";
import { useUser } from "../context/UserContext";

interface ChatProps {
    roomCode: string;
}

interface ChatMessage {
    sender: string;
    message: string;
}

export default function Chat({ roomCode }: ChatProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const { userName, setUserName } = useUser()
    const socket = CreateSocket();
    const socketService = new SocketService(socket);

    useEffect(() => {
        socketService.joinRoom(roomCode);

        socket.on("receive_message", (message_from_server: ChatMessage) => {
            console.log("Received message:", message_from_server);
            setMessages(prev => [...prev, message_from_server]);
        });

        return () => {
            socket.off("receive_message");
            // socket.disconnect();
        };
    }, [socket, roomCode]);

    function sendMessage() {
        if (message.trim()) {
            socketService.sendMessage(message, roomCode, userName);
            // Add your own message to the list immediately
            setMessages(prev => [...prev, { 
                sender: userName, 
                message: message.trim() 
            }]);
            setMessage("");
        }
    }

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your display name"
                    className="border p-2 mr-2"
                />
            </div>
            <div className="mb-4">
                <p>Room: {roomCode}</p>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="border p-2 mr-2"
                />
                <button 
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </div>
            <div>
                <h2 className="text-xl mb-2">Messages:</h2>
                <div className="space-y-2">
                    {messages.map((msg, index) => (
                        <div 
                            key={index}
                            className={`p-2 rounded ${
                                msg.sender === userName 
                                    ? 'bg-blue-100 ml-auto' 
                                    : 'bg-gray-100'
                            }`}
                            style={{
                                maxWidth: '80%',
                                marginLeft: msg.sender === userName ? 'auto' : '0'
                            }}
                        >
                            <strong>{msg.sender === userName ? 'You' : msg.sender}</strong>: {msg.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}