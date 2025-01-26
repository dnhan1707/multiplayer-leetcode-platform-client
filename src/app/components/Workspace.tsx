import React from 'react';
import Split from 'react-split';
import { useState } from 'react';
import ProblemDescription from './ProblemDescription';
import LandingEditor from './LandingEditor';
import Navbar from './Navbar';
import { languageOptions } from '../constants/languageOptions';
import { useUser } from '../context/UserContext';
import Testcases from './Testcases';

interface WrongAnswer {
  case: string;
  expected: string;
  received: string;
}

interface CompilerResult {
  success: boolean;
  wrong_answer?: WrongAnswer[];
}

const Workspace: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [lang, setLang] = useState<number>(63); //63 is JS
  const [compilerResult, setCompilerResult] = useState<CompilerResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<CompilerResult | null>(null);
  const { problemId, setLanguageId, setSubmittedCode } = useUser();

  //callback to handle updates from child
  const handleUserCodeChange = (codetosubmit: string) => {
    console.log(codetosubmit);
    setUserCode(codetosubmit);
    // setSubmittedCode(codetosubmit);
  };

  const handleCompile = async () => {
    setLoading(true);
    setSubmittedCode(userCode);
    setLanguageId(lang);
    try {
      const responsedTokens = await fetch("http://localhost:4000/submission/batch", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          submittedCode: userCode,
          languageId: lang,
          problemId: problemId
        })
      });

      if (!responsedTokens.ok) {
        throw new Error('Network response was not ok');
      }

      const listOfTokens = await responsedTokens.json(); // This will be a list of token objects

      // Simple delay before fetching the results
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(5000); // Wait for 5 seconds

      const responsed = await fetch("http://localhost:4000/submission/batch/recieve", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tokenIds: listOfTokens
        })
      });

      if (!responsed.ok) {
        throw new Error('Network response was not ok');
      }
      const result: CompilerResult = await responsed.json();
      setCompilerResult(result);
      setTestResults(result);
      console.log(result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="h-screen flex flex-col bg-dark-fill-3">
  {loading ? (
    <div className="h-full absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="text-white text-lg font-bold">Loading...</div>
    </div>
      ) : (
        <>
          <Navbar onRun={handleCompile} onSubmit={handleCompile} />

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
              {/** left panel */}
              <div className="flex flex-col p-4 h-full">
                <div className="rounded-md border border-dark-border p-4 bg-dark-fill-2 flex-grow">
                  <ProblemDescription />
                </div>
              </div>

              {/** right panel */}
              <div className="flex flex-col p-4 h-full">
                <div className="flex-grow rounded-md border border-dark-border mb-4 bg-dark-fill-2">
                  <div className="bg-gray-800 p-2">Code</div>
                  <div className="text-white p-2 h-full">
                    <LandingEditor onUserCodeChange={handleUserCodeChange} />
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