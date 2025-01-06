"use client";

import { useEffect, useState } from "react";
import CreateSocket from "@/app/utils/socket";


export default function Chat() {
    const [message, setMessage] = useState("");
    const [messageRecieved, setMessageRecieved] = useState("");
    const [room, setRoom] = useState("")
    const socket = CreateSocket();

    useEffect(() => {
        socket.on("recieve_message", (message_from_server) => {
          setMessageRecieved(message_from_server.message)
        })

    }, [socket]);

    function joinRoom() {
      if(room != "") {
        socket.emit("join_room", room)
      }
    }

    function sendMessage() {
          socket.emit("chatMessage", { message, room });
          setMessage("");
    }

    return (
        <div>
          <div>
              <p>join room:</p>
              <input
                type="text"
                value={room}
                onChange={(e) =>setRoom(e.target.value)}
              />
              <button onClick={joinRoom}>join</button>
          </div>
          <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
          </div>

          <div>
            <h1>Messages:</h1>
            <div>
                {messageRecieved}
            </div>
          </div>

        </div>
    );
}