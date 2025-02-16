import { Socket } from "socket.io-client";
import { CompilerResult } from '../types/types';

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

    updateProgress(roomCode: string, progress: CompilerResult, username: string) {
        this.socket.emit("progress_update", { 
            roomCode,
            progress,
            username
        });
    }

    announceGameStarted(roomCode: string, selectedProblem: string) {
        console.log("Emitting game start:", { roomCode, selectedProblem }); // Debug log
        this.socket.emit("announceGameStarted", {
            roomCode,
            selectedProblem
        });
    }
}
