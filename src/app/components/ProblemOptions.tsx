"use client";
import { useState } from "react";

export default function ProblemOptions() {
    const [options, setOptions] = useState(["Random", "Two Sum"])
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleCheckboxChange = (option) => {

    }

    return (
        <div>
            <h1>Option</h1>
            {options && options.length > 0 ? (
                <ul>
                    {options.map((option, idx) => (
                        <li key={idx}>
                            <label>
                                <input 
                                    type="checkbox" 
                                    value={option}  
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
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
    )
}