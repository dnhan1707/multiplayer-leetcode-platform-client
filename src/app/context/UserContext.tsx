"use client"

import React, { createContext, useContext, useState, ReactNode, Children } from 'react';

interface UserContextProps {
    userId: string,
    setUserId: (id: string) => void;

    roomCode: string,
    setRoomCode: (code: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children } : { children: ReactNode }) => {
    const [userId, setUserId] = useState<string>("");
    const [roomCode, setRoomCode] = useState<string>("");

    return (
        <UserContext.Provider value={{userId, setUserId, roomCode, setRoomCode}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
