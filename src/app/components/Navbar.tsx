import React from 'react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import LeaderboardModal from './LeaderboardModalProp';
import { CompilerResult } from '../types/types';
import { useUser } from '../context/UserContext';


type NavProps = {
    onSubmit : () => void;
    enableSubmit: boolean; // Add this prop
    // testResults: CompilerResult | null;
    participantsProgress: Map<string, CompilerResult>;
};

const Navbar: React.FC<NavProps> = ({ onSubmit, enableSubmit, participantsProgress}) => {
    const router = useRouter();
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [limitSubmission, setLimitSubmission] = useState(3);
    const { numberOfSubmission } = useUser();
    

    const handleOpenLeaderBoard = () => {
        setIsLeaderboardOpen(true);
    }

    return(
        <>
            <div className="flex items-center justify-between p-4">
                <div className='leaderboard'>
                    <button
                        onClick={handleOpenLeaderBoard}
                        className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>
                    </button>
                </div>

                <div className='flex gap-x-4 justify-center flex-1'>
                    <button 
                        className="text-gray-400 border rounded-md border-white px-4 py-2 hover:text-white" 
                        onClick={onSubmit} 
                        disabled={!enableSubmit} // Disable button based on prop
                    >
                        Submit {numberOfSubmission}/{limitSubmission}
                    </button>
                </div>

                <div className="flex gap-x-4">
                    <button className="text-gray-400 border rounded-md border-white px-4 py-2 hover:text-white">Login</button>
                    <button className="text-gray-400 border rounded-md border-white px-4 py-2 hover:text-white">Signup</button>
                </div>
            </div>

            <LeaderboardModal
                isOpen={isLeaderboardOpen}
                onClose={() => setIsLeaderboardOpen(false)}
                // testResults={testResults}
                participantsProgress={participantsProgress}
            />
        </>
    )
}

export default Navbar;