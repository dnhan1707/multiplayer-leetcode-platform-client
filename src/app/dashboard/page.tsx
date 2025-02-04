"use client"


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Logout from "../components/Logout";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";


export default function DashBoard() {
    const router = useRouter();
    const { loading, authenticated } = useAuth();

    if (loading) return <p>Loading...</p>;
  
    if (!authenticated) return null;

    return (
        <div className="flex flex-col">
            <h1>Hello</h1>
            <Logout></Logout>
            <CreateRoom></CreateRoom>
            <JoinRoom></JoinRoom>
        </div>
    )
}