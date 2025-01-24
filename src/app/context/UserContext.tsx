"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { setItem, getItem } from "@/app/utils/localStorage";

interface UserContextProps {
    userId: string,
    setUserId: (id: string) => void;

    roomCode: string,
    setRoomCode: (code: string) => void;

    gameStarted: boolean,
    setGameStarted: (status: boolean) => void;

    selectedProblem: string,
    setSelectedProblem: (problem: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children } : { children: ReactNode }) => {
    const [userId, setUserIdState] = useState<string>("");
    const [roomCode, setRoomCodeState] = useState<string>("");
    const [gameStarted, setGameStartedState] = useState<boolean>(false);
    const [selectedProblem, setSelectedProblemState] = useState<string>("");

    useEffect(() => {
        const storedUserId = getItem("userId");
        if (storedUserId) {
            setUserIdState(storedUserId);
        }
        const storedRoomCode = getItem("roomCode");
        if (storedRoomCode) {
            setRoomCodeState(storedRoomCode);
        }

        const storeGameStarted = getItem("gameStarted")
        if (storeGameStarted) {
            setGameStartedState(storeGameStarted);
        }

        const storedSelectedProblem = getItem("selectedProblem");
        if (storedSelectedProblem) {
            setSelectedProblemState(storedSelectedProblem);
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

    const setGameStarted = (status: boolean) => {
        setGameStartedState(status);
        setItem("gameStarted", status);
    };

    const setSelectedProblem = (problem: string) => {
        setSelectedProblemState(problem);
        setItem("selectedProblem", problem);
    };

    return (
        <UserContext.Provider value={{userId, setUserId, roomCode, setRoomCode, gameStarted, setGameStarted, selectedProblem, setSelectedProblem}}>
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