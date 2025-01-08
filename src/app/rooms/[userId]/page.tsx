"use client";

import Chat from "@/app/components/Chat";
import { useUser } from "../../context/UserContext";
import Logout from "@/app/components/Logout";

const ChatPage = () => {
  const { userId, roomCode  } = useUser();


  return (
    <div>
      <Logout></Logout>
      <Chat roomCode={roomCode}></Chat>
    </div>
  );
};

export default ChatPage;
