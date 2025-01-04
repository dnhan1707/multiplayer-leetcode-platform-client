"use client"

import React, { createContext, useContext, useState, ReactNode, Children } from 'react';

interface UserContextProps {
    userId: string,
    setUserId: (id: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children } : { children: ReactNode }) => {
    const [userId, setUserId] = useState<string>("");

    return (
        <UserContext.Provider value={{userId, setUserId}}>
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
