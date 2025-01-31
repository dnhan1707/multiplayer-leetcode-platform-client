"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Chat from "@/app/components/Chat";
import { useUser } from "../../context/UserContext";
import Logout from "@/app/components/Logout";
import ProblemOptions from "@/app/components/ProblemOptions";
import GameStarted from "@/app/components/GameStarted";
import "../../styles/workspace.css"



const ChatPage = () => {
  const { roomCode, gameStarted  } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      fetch("http://localhost:4000/check", {
          credentials: "include", // Ensure cookies are sent
      })
          .then((res) => {
              if (!res.ok) {
                  throw new Error("Unauthorized");
              }
              return res.json();
          })
          .then((data) => {
              console.log("Authenticated User:", data.user);
              setLoading(false);
          })
          .catch((error) => {
              console.error("Auth Check Failed:", error);
              router.push("/login");
          });
  }, []);
  

  if (loading) return <p>Loading...</p>;

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
