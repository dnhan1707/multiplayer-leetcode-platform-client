"use client"

import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function ProblemOptions() {
    const [options, setOptions] = useState(["Random", "Two Sum", "Remove Element", "Contain Duplicate", "Valid Anagram", "Group Anagram"]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const { setGameStarted, setSelectedProblem } = useUser();

    const handleRadioChange = (option: string) => {
        setSelectedOption(option);
        setSelectedProblem(option);
    };

    const handleStart = () => {
        setGameStarted(true)
    }

    return (
        <div>
            <h1>Options</h1>
            <div>
                {options && options.length > 0 ? (
                    <ul>
                        {options.map((option, idx) => (
                            <li key={idx}>
                                <label>
                                    <input
                                        type="radio"
                                        name="problemOption"
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={() => handleRadioChange(option)}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No options available</p>
                )}
            </div>
            <div>
                <button 
                    disabled={!selectedOption}
                    onClick={handleStart}
                >
                    Start
                </button>
            </div>
        </div>
    );
}