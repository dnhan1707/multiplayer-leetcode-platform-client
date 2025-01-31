"use client";

import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(true);

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

  function handleJoinRoom() {
    setRoomCode(roomId);
    router.push(`/rooms/${roomId}`);
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