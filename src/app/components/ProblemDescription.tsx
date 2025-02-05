"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { getExampleAndConstraint } from "../constants/problemDescription";
import DOMPurify from "dompurify";

const ProblemDescription: React.FC = () => {
  const { selectedProblem, setProblemId, problemTitle, setProblemTitle} = useUser();
  const [problemDes, setProblemDes] = useState("");
  
  const [problemExample, setProblemExample] = useState<any[]>([]);
  const [problemConstraint, setProblemConstraint] = useState<any[]>([]);

  useEffect(() => {
    const fetchProblemDescription = async () => {
      try {
        if (selectedProblem) {
          const response = await fetch(`http://localhost:4000/problem/${selectedProblem}`);
          if (!response.ok) {
            throw new Error("Something wrong with fetching problem");
          }
          const result = await response.json();
          const title = result.problem.title;
          const { examples, constraints } = getExampleAndConstraint(title);
          setProblemExample(examples);
          setProblemConstraint(constraints);
          setProblemTitle(title);
          setProblemDes(result.problem.description);
          setProblemId(result.problem.problem_id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProblemDescription();
  }, [selectedProblem]);

  const sanitizedDescription = DOMPurify.sanitize(problemDes);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{problemTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} className="mb-4" />
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Examples</h2>
        {problemExample.map((example, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-2 shadow-sm">
            <p><strong>Input:</strong> {example.input}</p>
            <p><strong>Output:</strong> {example.output}</p>
            <p><strong>Explanation:</strong> {example.explaination}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Constraints</h2>
        <ul className="list-disc list-inside">
          {problemConstraint.map((constraint, index) => (
            <li key={index} className="bg-white dark:bg-gray-700 p-2 rounded-lg mb-2 shadow-sm">{constraint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProblemDescription;