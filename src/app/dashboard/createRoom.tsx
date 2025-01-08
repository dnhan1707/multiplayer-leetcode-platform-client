"use client"

import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import CreateSocket from "../socket/socket";
import { SocketService } from "../socket/soketServices";

export default function CreateRoom() {
  const router = useRouter();
  const [roomSize, setRoomSize] = useState(2);
  const { userId , setRoomCode} = useUser();
  const socket = CreateSocket();
  const socketService = new SocketService(socket)

  async function handleCreateRoom() {
    try {
      console.log("User id: ", userId);
      const response = await fetch('http://localhost:4000/rooms', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          roomSize,
          userId
        })
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const dataResponse = await response.json();
      const roomCode = dataResponse.data.room_code

      socketService.joinRoom(userId, roomCode);
      setRoomCode(roomCode);
      router.push(`/rooms/${userId}`);

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateRoom(); }}>
        <h3>Create your own room</h3>
        <input
          type="number"
          placeholder="Room size"
          value={roomSize}
          onChange={(e) => setRoomSize(Number(e.target.value))}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}