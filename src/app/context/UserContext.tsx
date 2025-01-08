"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { setItem, getItem } from "@/app/utils/localStorage";

interface UserContextProps {
    userId: string,
    setUserId: (id: string) => void;

    roomCode: string,
    setRoomCode: (code: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children } : { children: ReactNode }) => {
    const [userId, setUserIdState] = useState<string>("");
    const [roomCode, setRoomCodeState] = useState<string>("");

    useEffect(() => {
        const storedUserId = getItem("userId");
        if (storedUserId) {
            setUserIdState(storedUserId);
        }
        const storedRoomCode = getItem("roomCode");
        if (storedRoomCode) {
            setRoomCodeState(storedRoomCode);
        }
    }, []);

    const setUserId = (id: string) => {
        setUserIdState(id);
        setItem("userId", id);
    };

    const setRoomCode = (code: string) => {
        setRoomCodeState(code);
        setItem("roomCode", code);
    };

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