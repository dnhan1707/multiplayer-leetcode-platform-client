import React, { useEffect, useState } from "react";
import CreateSocket from "../socket/socket";
import { SocketService } from "../socket/soketServices";

interface Participant {
  username: string;
  role: string;
}

interface ParticipantsProps {
  roomCode: string;
}

const Participants: React.FC<ParticipantsProps> = ({ roomCode }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newJoin, setNewJoin] = useState<string>("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/roomParticipant/usernameWithRole/${roomCode}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch participants");
        }
        const result = await response.json();
        setParticipants(result.data);
      } catch (error) {
        setError("Failed to load participants");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();

    const socket = CreateSocket();
    const socketService = new SocketService(socket);
    socketService.joinRoom(roomCode);

    socket.on("participantJoined", () => {
      fetchParticipants();
      setNewJoin("animate-pulse");
      setTimeout(() => setNewJoin(""), 1000);
    });

    return () => {
      socket.close();
    };
  }, [roomCode]);

  const getRoleBadgeColor = (role: string) => {
    const roleColors: { [key: string]: string } = {
      admin: "bg-red-500 text-white",
      moderator: "bg-yellow-500 text-white",
      user: "bg-blue-500 text-white",
    };
    return roleColors[role.toLowerCase()] || "bg-gray-500 text-white";
  };

  if (error) {
    return (
      <div className="fixed top-4 left-4 p-2 bg-red-50 rounded-lg text-sm">
        <div className="text-red-500">⚠️ {error}</div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 w-48 bg-white rounded-lg shadow-lg overflow-hidden max-h-[80vh]">
      <div className="p-2 border-b border-gray-200">
        <h2 className="text-sm font-semibold flex items-center gap-1">
          <svg 
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Players ({participants.length})
        </h2>
      </div>
      
      <div className="overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {loading ? (
          <div className="space-y-2 p-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {participants.map((participant, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-1.5 rounded text-sm hover:bg-gray-50 transition-all duration-200 ${newJoin}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600">
                      {participant.username[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800 truncate">
                    {participant.username}
                  </span>
                </div>
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(participant.role)}`}>
                  {participant.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;