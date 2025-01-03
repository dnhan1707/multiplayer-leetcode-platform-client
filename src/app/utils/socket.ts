import { io } from "socket.io-client";

export default function CreateSocket(roomCode: string) {
    const socket = io(`http://localhost:4000/${roomCode}`);
    return socket
}
