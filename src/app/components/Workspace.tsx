'use client'

import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import LandingEditor from './LandingEditor';
import Navbar from './Navbar';
import { languageOptions } from '../constants/languageOptions';
import { useUser } from '../context/UserContext';
import Testcases from './Testcases';
import { CompilerResult } from '../types/types';
import CreateSocket from '../socket/socket';
import { SocketService } from '../socket/soketServices';
import { useGameStateManager } from '../utils/gameStateManager';
import { useRouter } from "next/navigation";


const Workspace: React.FC = () => {
  const [userCode, setUserCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");

  const [lang, setLang] = useState<number>(63);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [roomParticipants, setRoomParticipants] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [enableSubmit, setEnableSubmit] = useState<boolean>(true);

  const [testResults, setTestResults] = useState<CompilerResult | null>(null);
  const [compilerResult, setCompilerResult] = useState<CompilerResult | null>(null);
  const [participantsProgress, setParticipantsProgress] = useState<Map<string, CompilerResult>>(new Map());

  const { problemId, roomCode, userName, numberOfSubmission, setSubmittedCode, getSubmittedCode, setNumberOfSubmission } = useUser();
  const { removeLocalstorageForLosing } = useGameStateManager();

  const socket = CreateSocket();
  const socketService = new SocketService(socket);
  const router = useRouter();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/roomParticipant/usernameWithRole/${roomCode}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch participants");
        }
        const result = await response.json();
        setRoomParticipants(result.data.length);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();

    // Listen for participant changes
    socket.on("participantJoined", fetchParticipants);
    socket.on("participantLeft", fetchParticipants);

    return () => {
      socket.off("participantJoined");
      socket.off("participantLeft");
    };
  }, [roomCode]);

  useEffect(() => {
    if(numberOfSubmission >= 3) {
      if (roomParticipants === 2) {
        // Only announce loss and redirect everyone if there are 2 participants
        socketService.announceGameLost(roomCode, userName);
        removeLocalstorageForLosing();
        router.push(`/rooms/${roomCode}`);
        console.log("You lost - game ended");
      } else {
        // Just show a message if there aren't exactly 2 participants
        console.log("You lost - waiting for more participants to join");
        setEnableSubmit(false);
      }
    }
  }, [numberOfSubmission, roomParticipants]);

  useEffect(() => {
    socketService.joinRoom(roomCode);

    socket.on("game_lost_announcement", ({ username }) => {
      if (roomParticipants === 2) {
        if (username !== userName) {
          console.log(`${username} lost! You win!`);
        }
        removeLocalstorageForLosing();
        router.push(`/rooms/${roomCode}`);
      }
    });
  
    return () => {
      socket.off("game_lost_announcement");
    };
  }, [socket, userName, roomParticipants]);

  useEffect(() => {
    socketService.joinRoom(roomCode);

    socket.on("game_winner_announcement", ({ winner }) => {
      if (winner === userName) {
        console.log("Congratulations! You won!");
      } else {
        console.log(`${winner} won the game!`);
      }
      removeLocalstorageForLosing();
      router.push(`/rooms/${roomCode}`);
    });
  
    return () => {
      socket.off("game_winner_announcement");
    };
  }, [socket, userName]);

  useEffect(() => {
    socketService.joinRoom(roomCode);

    // Listen for progress updates from other participants
    socket.on("progress_update_recieved", ({ roomCode, progress, username }) => {
      setParticipantsProgress(prev => new Map(prev).set(username, progress));
    });

    return () => {
      socket.off("progress_update");
    };
  }, [socket]);
  // Callback to handle updates from child
  const handleUserCodeChange = (codeToSubmit: string) => {
    setUserCode(codeToSubmit);
    setSubmittedCode(codeToSubmit);
  };

  // Function to handle code compilation and submission
  const handleCompile = async () => {
    const now = Date.now();
    if (now - lastSubmitTime < 16000) { // Prevents submitting within 16 seconds
      console.warn("Too many submissions! Please wait.");
      setEnableSubmit(false);
      return;
    }
    
    setLastSubmitTime(now);
    setLoading(true);
    setEnableSubmit(false); // Disable buttons

    setTimeout(() => {
      setLastSubmitTime(0); // Re-enable after 16 seconds
      setEnableSubmit(true);
      console.log("Ready to submit again");
    }, 16000);

    const submittedCode = getSubmittedCode();
    const codeToSubmit = userCode || submittedCode; // Use submittedCode if userCode is empty

    try {
      const responseTokens = await fetch("http://localhost:4000/submission/batch", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          submittedCode: codeToSubmit,
          languageId: lang,
          problemId: problemId
        })
      });

      if (!responseTokens.ok) {
        throw new Error('Network response was not ok');
      }

      const listOfTokens = await responseTokens.json();

      // Wait for 5 seconds before fetching results
      await new Promise(resolve => setTimeout(resolve, 5000));

      const response = await fetch("http://localhost:4000/submission/batch/receive", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ tokenIds: listOfTokens })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result: CompilerResult = await response.json();
      setCompilerResult(result);
      setTestResults(result);

      if (result.success) {
        // If all test cases pass, announce winner
        socketService.announceWinner(roomCode, userName);
        console.log("You won - all test cases passed!");
        removeLocalstorageForLosing();
        router.push(`/rooms/${roomCode}`);
      } else {
        // If failed, increment submission count
        setNumberOfSubmission(numberOfSubmission + 1);
      }

      socketService.updateProgress(roomCode, result, userName);
      setParticipantsProgress(prev => new Map(prev).set(userName, result));

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
      setEnableSubmit(true); // Enable buttons again
    }
  };

  // Function to handle language change
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLangId = Number(event.target.value);
    const selectedLang = languageOptions.find(option => option.id === selectedLangId)?.value || "javascript";
    setLang(selectedLangId);
    setSelectedLanguage(selectedLang);  // Ensure selectedLanguage is updated
    setSubmittedCode("");
  };

  return (
    <div className="h-screen flex flex-col bg-dark-fill-3">
      {loading ? (
        <div className="h-full absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="text-white text-lg font-bold">Loading...</div>
        </div>
      ) : (
        <>
          <Navbar 
            onSubmit={handleCompile} 
            enableSubmit={enableSubmit} 
            // testResults={testResults}
            participantsProgress={participantsProgress}
          />
          <div className="flex flex-grow flex-col lg:flex-row">
            <Split
              className="flex flex-grow"
              minSize={0}
              sizes={[50, 50]}
              direction="horizontal"
              gutterSize={10}
              gutterAlign="center"
              snapOffset={0}
              dragInterval={1}
            >
              {/* Left panel */}
              <div className="flex flex-col p-4 h-full">
                <div className="rounded-md border border-dark-border p-4 bg-dark-fill-2 flex-grow">
                  <ProblemDescription />
                </div>
              </div>

              {/* Right panel */}
              <div className="flex flex-col p-4 h-full">
                <div className="flex-grow rounded-md border border-dark-border mb-4 bg-dark-fill-2">
                  <div className="bg-gray-800 p-2 flex justify-between items-center">
                    <span>Code</span>
                    <select
                      value={lang}
                      onChange={handleLanguageChange}
                      className="bg-dark-fill-2 text-white p-2 rounded-md"
                      style={{ backgroundColor: '#2d2d2d', color: 'white' }}
                    >
                      {languageOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-white p-2 h-full">
                    <LandingEditor onUserCodeChange={handleUserCodeChange} language={selectedLanguage} />
                  </div>
                </div>

                <div className="h-1/4 rounded-md border border-dark-border bg-dark-fill-2">
                  <div className="text-white p-4 h-full">
                    <Testcases testResults={testResults} />
                  </div>
                </div>
              </div>
            </Split>
          </div>
        </>
      )}
    </div>
  );
};

export default Workspace;