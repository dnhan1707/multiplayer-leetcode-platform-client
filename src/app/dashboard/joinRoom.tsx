"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const { userId, setRoomCode } = useUser();
  const router = useRouter();

  function handleJoinRoom() {
    setRoomCode(roomId);
    router.push(`/rooms/${userId}`);
  }

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleJoinRoom(); }}>
        <h3>Join Room</h3>
        <input
          type="text"
          placeholder="Room Id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}