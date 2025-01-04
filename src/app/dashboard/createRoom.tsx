"use client"

import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function CreateRoom() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [roomSize, setRoomSize] = useState(2);
  const { userId } = useUser();

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
      console.log(dataResponse);
      setRoomCode(dataResponse.data.room_code);
      router.push(`/rooms/${dataResponse.data.room_code}`);

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