"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { clearAuthToken } from "../utils/cookiesManager";

export default function Logout() {
    const router = useRouter();
    const { setUserId, setRoomCode, setGameStarted, setSelectedProblem, setProblemDes, setProblemTitle, setProblemId, setSubmittedCode } = useUser();

    async function handleLogout() {
        try {
            const response = await fetch("http://localhost:4000/logOut", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'credentials': 'include' // Ensure cookies are included in the request
                }
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const dataResponse = await response.json();
            console.log(dataResponse);

            // Clear user data from context and local storage
            setUserId("");
            setRoomCode("");
            setGameStarted(false);
            setSelectedProblem("");
            setProblemDes("");
            setProblemId("");
            setProblemTitle("")
            setSubmittedCode("")

            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("roomCode");
            localStorage.removeItem("gameStarted");
            localStorage.removeItem("selectedProblem");
            localStorage.removeItem("problemDes");
            localStorage.removeItem("problemTitle");
            localStorage.removeItem("submittedCode");
            localStorage.removeItem("problemId");


            clearAuthToken();

            // Redirect to the login page
            router.push('/login');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}