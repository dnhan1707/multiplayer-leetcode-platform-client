"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { setItem, getItem } from "@/app/utils/localStorage";

interface UserContextProps {

    roomCode: string,
    setRoomCode: (code: string) => void;

    gameStarted: boolean,
    setGameStarted: (status: boolean) => void;

    selectedProblem: string,
    setSelectedProblem: (problem: string) => void;

    problemId: string,
    setProblemId: (id: string) => void;

    problemDes: string,
    setProblemDes: (id: string) => void;

    problemTitle: string,
    setProblemTitle: (id: string) => void;

    submittedCode: string,
    setSubmittedCode: (code: string) => void;
    getSubmittedCode: () => string;

    languageId: number,
    setLanguageId: (id: number) => void;

    setJwtToken: (token: string) => void;
    getJwtToken: () => string;

    setJwtRefreshToken: (token: string) => void;   
    getJwtRefreshToken: () => string;

    userName: string;
    setUserName: (name: string) => void;

    numberOfSubmission: number;
    setNumberOfSubmission: (count: number) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children } : { children: ReactNode }) => {
    const [problemId, setProblemIdState] = useState("");
    const [roomCode, setRoomCodeState] = useState<string>("");
    const [selectedProblem, setSelectedProblemState] = useState<string>("");
    const [gameStarted, setGameStartedState] = useState<boolean>(false);
    const [problemDes, setProblemDesState] = useState<string>("");
    const [problemTitle, setProblemTitleState] = useState<string>("");
    const [languageId, setLanguageIdState] = useState<number>(63);
    const [submittedCode, setSubmittedCodeState] = useState<string>("");
    const [userName, setUserNameState] = useState<string>("");
    const [numberOfSubmission, setNumberOfSubmissionState] = useState<number>(0);

    useEffect(() => {
        const storeUserName = getItem("userName");
        if(storeUserName){
            setUserNameState(storeUserName);
        }

        const storedProblemId = getItem("problemId");
        if (storedProblemId) {
            setProblemIdState(storedProblemId);
        }

        const storedProblemDes = getItem("problemDes");
        if (storedProblemDes) {
            setProblemDesState(storedProblemDes);
        }

        const storedSubmittedCode = getItem("submittedCode");
        if (storedSubmittedCode) {
            setSubmittedCodeState(storedSubmittedCode);
        }

        const storedProblemTitle = getItem("problemTitle");
        if (storedProblemTitle) {
            setProblemTitleState(storedProblemTitle);
        }

        const storedLanguageId = getItem("languageId");
        if (storedLanguageId) {
            setLanguageIdState(storedLanguageId);
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

        const storeNumberOfSubmission = getItem("numberOfSubmission");
        if(storeNumberOfSubmission) {
            setNumberOfSubmissionState(storeNumberOfSubmission);
        }
    }, []);

    const setUserName = (name: string) => {
        setUserNameState(name);
        setItem("userName", name);
    }

    const setProblemId = (id: string) => {
        setProblemIdState(id);
        setItem("problemId", id);
    };

    const setProblemDes = (id: string) => {
        setProblemDesState(id);
        setItem("problemDes", id);
    };

    const setProblemTitle = (id: string) => {
        setProblemTitleState(id);
        setItem("problemTitle", id);
    };

    const setSubmittedCode = (code: string) => {
        setSubmittedCodeState(code);
        setItem("submittedCode", code);
    };

    const getSubmittedCode = () => {
        return getItem("submittedCode") || "";
    }

    const setLanguageId = (id: number) => {
        setLanguageIdState(id);
        setItem("languageId", id);
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

    const setJwtToken = (token: string) => {
        sessionStorage.setItem("authToken", token);
    };  

    const getJwtToken = () => {
        return sessionStorage.getItem("authToken") || "";
    }

    const setJwtRefreshToken = (token: string) => {
        sessionStorage.setItem("refreshToken", token);
    }

    const getJwtRefreshToken = () => {
        return sessionStorage.getItem("refreshToken") || "";
    }

    const setNumberOfSubmission = (count: number) => {
        setNumberOfSubmissionState(count);
        setItem('numberOfSubmission', count);
    }

    return (
        <UserContext.Provider 
        value={{
                roomCode, setRoomCode, getSubmittedCode,
                gameStarted, setGameStarted, 
                selectedProblem, setSelectedProblem, 
                problemId, setProblemId, 
                languageId, setLanguageId, 
                problemDes, setProblemDes, 
                problemTitle, setProblemTitle, 
                submittedCode, setSubmittedCode,
                setJwtToken, getJwtToken,
                setJwtRefreshToken, getJwtRefreshToken,
                userName, setUserName,
                numberOfSubmission, setNumberOfSubmission
            }}>
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