"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import CreateSocket from "../socket/socket";
import { SocketService } from "../socket/soketServices";

export default function CreateRoom() {
  const router = useRouter();
  const [roomSize, setRoomSize] = useState(2);
  const { setRoomCode } = useUser(); 
  const socket = CreateSocket();
  const socketService = new SocketService(socket);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  useEffect(() => {
    fetch("http://localhost:4000/check", {
      credentials: "include", 
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

  async function handleCreateRoom() {
    try {
      setError(""); 

      const response = await fetch("http://localhost:4000/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomSize }),
        credentials: "include", //Cookies will send JWT automatically
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create room");
        return;
      }

      const dataResponse = await response.json();
      const roomCode = dataResponse?.data?.newRoom.room_code;
      console.log(dataResponse);
      if (!roomCode) {
        throw new Error("Invalid room code received from the server");
      }

      socketService.joinRoom(roomCode);
      setRoomCode(roomCode);
      router.push(`/rooms/${roomCode}`);
    } catch (error) {
      console.error("Room creation failed:", error);
      setError("An error occurred. Please try again.");
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
