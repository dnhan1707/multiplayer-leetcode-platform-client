"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Chat from "@/app/components/Chat";
import { useUser } from "../../context/UserContext";
import Logout from "@/app/components/Logout";
import ProblemOptions from "@/app/components/ProblemOptions";
import GameStarted from "@/app/components/GameStarted";
import "../../styles/workspace.css"



const ChatPage = () => {
  const { roomCode, gameStarted  } = useUser();
  const router = useRouter();
  const { loading, authenticated } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return null;
  
  return (
    <>
      {gameStarted ? (
        <div className="bg-black text-white">
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
