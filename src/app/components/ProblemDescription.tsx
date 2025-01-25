"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import DOMPurify from "dompurify";

const ProblemDescription: React.FC = () => {
    const { selectedProblem, setProblemId, setProblemDes, setProblemTitle, problemDes, problemTitle } = useUser();

    useEffect(() => {
        const fetchProblemDescription = async () => {
            try {
                if (selectedProblem === "Random") {
                    const response = await fetch("http://localhost:4000/problem/random");
                    if (!response.ok) {
                        throw new Error("Something wrong with fetching problem");
                    }
                    const result = await response.json();
                    setProblemDes(result.problem.description);
                    setProblemId(result.problem.problem_id);
                    setProblemTitle(result.problem.title)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProblemDescription();
    }, [selectedProblem]);

    const sanitizedDescription = DOMPurify.sanitize(problemDes);

    return (
        <div>
            <h1>Problem Description</h1>
            <div>Title: {problemTitle}</div>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
    );
};

export default ProblemDescription;