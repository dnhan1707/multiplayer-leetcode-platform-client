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
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
  const [compilerResult, setCompilerResult] = useState<CompilerResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<CompilerResult | null>(null);
  const { problemId, setLanguageId, setSubmittedCode, getSubmittedCode } = useUser();
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  //callback to handle updates from child
  const handleUserCodeChange = (codetosubmit: string) => {
    console.log('User code changed:', codetosubmit); // Add a log to check
    setUserCode(codetosubmit);
    setSubmittedCode(codetosubmit); // Ensure this line is uncommented
  };
  

  const handleCompile = async () => {
    const now = Date.now();
    if (now - lastSubmitTime < 8000) { // Prevents submitting within 8 seconds
      console.warn("Too many submissions! Please wait.");
      return;
    }
    setLastSubmitTime(now);

    setLoading(true);
    const submittedCode = getSubmittedCode();
    const codeToSubmit = userCode || submittedCode; // Use submittedCode if userCode is empty
    console.log('Code to submit:', codeToSubmit); // Log to see what's being submitted

    setSubmittedCode(codeToSubmit);
    setLanguageId(lang);
    try {
      const responsedTokens = await fetch("http://localhost:4000/submission/batch", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          submittedCode: codeToSubmit,
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

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLangId = Number(event.target.value);
    setLang(selectedLangId);
    const selectedLanguage = languageOptions.find(option => option.id === selectedLangId)?.value || "javascript";
    setSelectedLanguage(selectedLanguage);
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