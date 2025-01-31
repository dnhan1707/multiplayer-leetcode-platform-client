import { Socket } from "socket.io-client";

export class SocketService {
    constructor(private socket: Socket) {}
    joinRoom(roomCode: string) {
        if(roomCode){
            this.socket.emit("join_room", {roomCode});  // Update the backedn without userId too
        }
    }

    sendMessage(message: string, roomCode: string) {
        this.socket.emit("chatMessage", { message, roomCode });
    }
}
