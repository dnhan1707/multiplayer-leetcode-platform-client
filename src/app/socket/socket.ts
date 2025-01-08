import { io } from "socket.io-client";

export default function CreateSocket() {
    const socket = io(`http://localhost:4000`);
    return socket
}
