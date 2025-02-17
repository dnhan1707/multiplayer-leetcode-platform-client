"use client";

import { useUser } from '../context/UserContext';

export function useGameStateManager() {
  const { 
    setGameStarted, 
    setSelectedProblem,
    setProblemDes,
    setProblemTitle,
    setProblemId,
    setSubmittedCode,
    setNumberOfSubmission  // Add this
  } = useUser();

  const removeLocalstorageForLosing = () => {
    // Clear all user data and storage
    setGameStarted(false);
    setSelectedProblem("");
    setProblemDes("");
    setProblemTitle("");
    setProblemId("");
    setSubmittedCode("");
    setNumberOfSubmission(0); // Reset submission count

    // Clear localStorage
    localStorage.removeItem("gameStarted");
    localStorage.removeItem("selectedProblem");
    localStorage.removeItem("problemDes");
    localStorage.removeItem("problemTitle");
    localStorage.removeItem("problemId");
    localStorage.removeItem("submittedCode");
    localStorage.removeItem("numberOfSubmission"); // Add this
  };

  return { removeLocalstorageForLosing };
}