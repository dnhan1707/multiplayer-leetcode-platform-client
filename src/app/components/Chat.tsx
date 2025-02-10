import { useEffect, useState, useRef } from "react";
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
    const [isOpen, setIsOpen] = useState(false);
    const { userName, setUserName } = useUser();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const socket = CreateSocket();
    const socketService = new SocketService(socket);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socketService.joinRoom(roomCode);

        socket.on("receive_message", (message_from_server: ChatMessage) => {
            setMessages(prev => [...prev, message_from_server]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, [socket, roomCode]);

    function sendMessage() {
        if (message.trim()) {
            socketService.sendMessage(message, roomCode, userName);
            setMessages(prev => [...prev, { 
                sender: userName, 
                message: message.trim() 
            }]);
            setMessage("");
        }
    }

    // Floating chat button
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center group"
            >
                <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                    />
                </svg>
                {messages.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {messages.length}
                    </span>
                )}
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 w-80 h-96 flex flex-col bg-white rounded-lg shadow-xl overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gray-50 p-3 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-700">Room: {roomCode}</span>
                </div>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Name Input */}
            <div className="p-2 bg-gray-50 border-b">
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your display name"
                    className="w-full px-2 py-1 text-sm bg-white border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === userName ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] break-words ${
                                msg.sender === userName
                                    ? 'bg-blue-500 text-white rounded-tl-xl rounded-tr-sm rounded-bl-xl'
                                    : 'bg-white text-gray-800 rounded-tr-xl rounded-tl-sm rounded-br-xl shadow-sm'
                            } p-2 text-sm`}
                        >
                            <div className={`text-xs mb-1 ${
                                msg.sender === userName ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                                {msg.sender === userName ? 'You' : msg.sender}
                            </div>
                            {msg.message}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2 bg-white border-t">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-1 text-sm border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <button 
                        onClick={sendMessage}
                        className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}