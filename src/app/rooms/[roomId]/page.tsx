"use client";
// import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import Chat from "@/app/components/Chat";
import { useUser } from "@/app/context/UserContext";
import Logout from "@/app/components/Logout";
import ProblemOptions from "@/app/components/ProblemOptions";
import GameStarted from "@/app/components/GameStarted";
import Participants from "@/app/components/Participants";
import "../../styles/workspace.css"
import { useEffect } from "react";
import CreateSocket from "../../socket/socket"
import { SocketService } from '../../socket/soketServices';
import LeaveRoomButton from "@/app/components/LeaveRoomButton";


const ChatPage = () => {
  const { roomCode, gameStarted, setGameStarted, setSelectedProblem } = useUser();
  // const router = useRouter();
  const { loading, authenticated } = useAuth();
  const socket = CreateSocket();
  const socketService = new SocketService(socket);
    useEffect(() => {
      socketService.joinRoom(roomCode);

      socket.on("announceGameStartedReceived", ({ roomCode, selectedProblem }) => {
          console.log("Received game start announcement:", selectedProblem); // Debug log
          setSelectedProblem(selectedProblem);
          setGameStarted(true);
          // gameStarted = true;
      });

      return () => {
          socket.off("announceGameStartedReceived");
      };
    }, [socket, setGameStarted, setSelectedProblem]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {gameStarted ? (
        <div className="bg-gray-900 text-white min-h-screen">
          <GameStarted />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Logout />
          <ProblemOptions />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Participants roomCode={roomCode} />
            <Chat roomCode={roomCode} />
          </div>
          <LeaveRoomButton variant="room"></LeaveRoomButton>
        </div>
      )}
    </div>
  );
};

export default ChatPage;