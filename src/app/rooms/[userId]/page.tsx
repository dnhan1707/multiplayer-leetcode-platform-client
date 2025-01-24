"use client";

import Chat from "@/app/components/Chat";
import { useUser } from "../../context/UserContext";
import Logout from "@/app/components/Logout";
import ProblemOptions from "@/app/components/ProblemOptions";
import GameStarted from "@/app/components/GameStarted";
import "../../styles/workspace.css"



const ChatPage = () => {
  const { userId, roomCode, gameStarted  } = useUser();


  return (
    <>
      {gameStarted ? (
        <div className="space-y-4 bg-black text-white">
          <GameStarted></GameStarted>
        </div>
      ) : (
        <div>
          <Logout></Logout>
          <ProblemOptions></ProblemOptions>
          <Chat roomCode={roomCode}></Chat>
        </div>
      )}
    </>
  );
};

export default ChatPage;
