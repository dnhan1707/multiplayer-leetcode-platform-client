'use client'

import LogInForm from "./loginForm";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export default function LogInpage() {
    const { gameStarted } = useUser()
    useEffect(() => {
        console.log(gameStarted);
    }, [])
    return (
        <div>
            <LogInForm></LogInForm>
        </div>
    )
}
