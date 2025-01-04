"use client";

import { useParams } from "next/navigation";
import Chat from "@/app/components/Chat";
import { useUser } from "@/app/context/UserContext";

const ChatPage = () => {
  const { roomId } = useParams(); // Extract roomId from the route parameter
  const { userId } = useUser();

  if (!roomId || !userId) {
    console.log("RoomId: ", roomId);
    console.log("UserId: ", userId);

    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Chat Room: {roomId}</h1>
      <Chat roomCode={roomId as string} userId={userId as string} />
    </div>
  );
};

export default ChatPage;
