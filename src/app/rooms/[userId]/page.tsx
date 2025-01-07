"use client";

import Chat from "@/app/components/Chat";
import { useUser } from "../../context/UserContext";

const ChatPage = () => {
  const { userId, roomCode  } = useUser();


  return (
    <div>
      <Chat roomCode={roomCode}></Chat>
    </div>
  );
};

export default ChatPage;
