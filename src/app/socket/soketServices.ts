import { Socket } from "socket.io-client";

export class SocketService {
    constructor(private socket: Socket) {}
    joinRoom(userId: string, roomCode: string) {
        if(roomCode){
            this.socket.emit("join_room", {userId, roomCode});
        }
    }

    sendMessage(message: string, roomCode: string) {
        this.socket.emit("chatMessage", { message, roomCode });
    }
}
