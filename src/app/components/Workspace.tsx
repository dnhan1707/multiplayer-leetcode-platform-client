import React, { useState } from 'react';
import Split from 'react-split';
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
  const [userCode, setUserCode] = useState<string>("");
  const [enableSubmit, setEnableSubmit] = useState<boolean>(true);
  const [lang, setLang] = useState<number>(63);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
  const [compilerResult, setCompilerResult] = useState<CompilerResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<CompilerResult | null>(null);
  const { problemId, setSubmittedCode, getSubmittedCode } = useUser();
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

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
        headers: {
          'Content-Type': 'application/json'
        },
        credentials :'include',
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

      const responsed = await fetch("http://localhost:4000/submission/batch/recieve", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
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
          <Navbar onRun={handleCompile} onSubmit={handleCompile} enableSubmit={enableSubmit} />

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