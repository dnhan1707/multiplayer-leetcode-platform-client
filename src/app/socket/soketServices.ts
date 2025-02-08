import { Socket } from "socket.io-client";

export class SocketService {
    constructor(private socket: Socket) {}
    joinRoom(roomCode: string) {
        if(roomCode){
            this.socket.emit("join_room", {roomCode}); 
        }
    }

    sendMessage(message: string, roomCode: string, displayName: string) {  // Add displayName
        this.socket.emit("chatMessage", { 
            message, 
            roomCode,
            sender: displayName  // Use displayName instead of userId
        });
    }
}
