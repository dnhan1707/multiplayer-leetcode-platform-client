"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { clearAuthToken } from "../utils/cookiesManager";

export default function Logout() {
    const router = useRouter();
  const { 
    setRoomCode, 
    setGameStarted, 
    setSelectedProblem, 
    setProblemDes, 
    setProblemTitle, 
    setProblemId, 
    setSubmittedCode 
  } = useUser();

  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:4000/logOut", {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'credentials': 'include'
            }
        });

        if (!response.ok) throw new Error("Something went wrong");

        // Clear all user data and storage
        setRoomCode("");
        setGameStarted(false);
        setSelectedProblem("");
        setProblemDes("");
        setProblemId("");
        setProblemTitle("")
        setSubmittedCode("")

        localStorage.removeItem("authToken");
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
      console.error('Logout failed:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="fixed top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg
                hover:bg-red-600 transition-colors duration-200 shadow-lg
                flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Logout</span>
    </button>
  );
};