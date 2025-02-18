"use client";

import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import RoomFullModal from "../components/RoomFullModal";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRoomFull, setIsRoomFull] = useState(false);

  const { setRoomCode } = useUser();
  const router = useRouter();

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

  async function handleJoinRoom() {
    try {
      const response = await fetch(`http://localhost:4000/rooms/${roomId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include'
      })

      if(!response.ok) {
        throw new Error("Invalid room code received from the server");
      }
      const dataResponse = await response.json();
      if (dataResponse.isFull) {
        setIsRoomFull(true);
        return;
      }
      console.log(dataResponse);
      setRoomCode(roomId);
      router.push(`/rooms/${roomId}`);
    } catch (error) {
      
    }

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

      {isRoomFull && <RoomFullModal />}
    </div>
  );
}