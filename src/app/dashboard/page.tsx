"use client"


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logout from "../components/Logout";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";


export default function DashBoard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:4000/check", {
            credentials: "include", // Ensure cookies are sent
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

    return (
        <div className="flex flex-col">
            <h1>Hello</h1>
            <Logout></Logout>
            <CreateRoom></CreateRoom>
            <JoinRoom></JoinRoom>
        </div>
    )
}