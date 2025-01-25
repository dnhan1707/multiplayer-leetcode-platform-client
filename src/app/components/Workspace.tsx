import React from 'react';
import Split from 'react-split';
import { useState } from 'react';
import ProblemDescription from './ProblemDescription';
import LandingEditor from './LandingEditor';
import Navbar from './Navbar';
import { languageOptions } from '../constants/languageOptions';
import { useUser } from '../context/UserContext';

const Workspace : React.FC = () => {
    const [token, setToken] = useState<string>("")
    const [userCode, setUserCode] = useState<string>("")
    const [lang, setLang] = useState<number>(63) //63 is JS
    const [compilerResult, setCompilerResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { problemId, setLanguageId, setSubmittedCode } = useUser();

    //callback to handle updates from child
    const handleUserCodeChange = (codetosubmit : string) => {
        console.log(codetosubmit);
        setUserCode(codetosubmit);
        // setSubmittedCode(codetosubmit);
    }

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
            const result = await responsed.json();
            console.log(result);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setLoading(false); 
        }
        
    };

    return(
        <div className="h-screen flex flex-col bg-dark-fill-3">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="text-white">Loading...</div>
                </div>
            ) : (
                <>
                    <Navbar onRun={handleCompile} onSubmit={handleCompile} />

                    <Split className='flex flex-grow' minSize={0}>
                    
                    {/** left panel */}
                    <div className="rounded-md border border-dark-border m-4 p-1">
                            <ProblemDescription/>
                    </div>
                    
                    {/** right panel */}
                    <div className="flex flex-col">
                        
                        <div className="flex-grow flex-col p-0">

                            <div className="flex-grow rounded-md border border-dark-border mb-4">
                                <div className="bg-gray-800">Code</div>
                                <div className="text-white">
                                <LandingEditor onUserCodeChange={handleUserCodeChange}/>
                                </div>
                            </div>

                            <div className="h-1/4 rounded-md border border-dark-border">
                                <div className="text-white p-4">
                                    Test Cases Here
                                </div>
                            </div>
                        </div>
                    </div>
                
                    </Split>
                </>
                
            )}
            
        </div>
    )
}

export default Workspace;