"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import DOMPurify from "dompurify";

const ProblemDescription: React.FC = () => {
    const { selectedProblem } = useUser();
    const [problemDescription, setProblemDescription] = useState("");
    const [problemTitle, setProblemTitle] = useState("");

    useEffect(() => {
        const fetchProblemDescription = async () => {
            try {
                if (selectedProblem === "Random") {
                    const response = await fetch("http://localhost:4000/problem/random");
                    if (!response.ok) {
                        throw new Error("Something wrong with fetching problem");
                    }
                    const result = await response.json();
                    setProblemDescription(result.problem.description);
                    setProblemTitle(result.problem.title);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProblemDescription();
    }, [selectedProblem]);

    const sanitizedDescription = DOMPurify.sanitize(problemDescription);

    return (
        <div>
            <h1>Problem Description</h1>
            <div>Title: {problemTitle}</div>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
    );
};

export default ProblemDescription;