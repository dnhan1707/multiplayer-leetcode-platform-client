"use client"

import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function ProblemOptions() {
    const problems = [
        { name: "Random", icon: "🎲" },
        { name: "Two Sum", icon: "➕" },
        { name: "Remove Element", icon: "🗑️" },
        { name: "Contain Duplicate", icon: "🔄" },
        { name: "Valid Anagram", icon: "📝" },
        { name: "Group Anagram", icon: "📊" }
      ];
      
      const [selectedOption, setSelectedOption] = useState("");
      const { setGameStarted, setSelectedProblem } = useUser();
    
      const handleRadioChange = (option: string) => {
        setSelectedOption(option);
        setSelectedProblem(option);
      };
    
      return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Choose Your Challenge</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {problems.map(({ name, icon }) => (
              <div
                key={name}
                onClick={() => handleRadioChange(name)}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all duration-200
                  ${selectedOption === name 
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="problemOption"
                    value={name}
                    checked={selectedOption === name}
                    onChange={() => {}}
                    className="hidden"
                  />
                  <span className="text-xl">{icon}</span>
                  <span className="font-medium">{name}</span>
                </label>
              </div>
            ))}
          </div>
    
          <button
            onClick={() => setGameStarted(true)}
            disabled={!selectedOption}
            className={`
              w-full py-3 rounded-lg text-white font-medium transition-all duration-200
              ${selectedOption 
                ? 'bg-green-500 hover:bg-green-600 shadow-lg' 
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {selectedOption ? 'Start Challenge' : 'Select a Problem to Start'}
          </button>
        </div>
      );
    };
    