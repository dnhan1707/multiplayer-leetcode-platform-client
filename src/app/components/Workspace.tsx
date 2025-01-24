import React from 'react';
import Split from 'react-split';
import { useState } from 'react';
import ProblemDescription from './ProblemDescription';
import LandingEditor from './LandingEditor';
import Navbar from './Navbar';
import { languageOptions } from '../constants/languageOptions';
import { useUser } from '../context/UserContext';

const Workspace : React.FC = () => {
    const [token, settoken] = useState<string>("")
    const [usercode, setusercode] = useState<string>("")
    const [lang, setlang] = useState(languageOptions[0])

    //callback to handle updates from child
    const handleUserCodeChange = (codetosubmit : string) => {
        setusercode(codetosubmit);
        console.log("Updated userCode from child:", codetosubmit);
    }

    const handleCompile = async() : Promise<void> => {
        //compile logic
    
        try{

            console.log("code : ", usercode);
            console.log("here", lang.id)

            const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions/", { 
                method: "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "x-rapidapi-key" : "d443a1c23fmshf52e5b1cfc8de7bp14f22ejsnd602160c8ed4",
                    "x-rapidapi-host" : "judge0-ce.p.rapidapi.com",
                },
                body : JSON.stringify({
                    source_code : usercode,
                    language_id : lang.id,
                }),
            });
            
            const res = await response.json();
            settoken(res.token)
            
            console.log("token: " , token)
   
            const retrieveOutput = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${res.token}`, { 
                method: "GET",
                headers : {
                    "Content-Type" : "application/json",
                    "x-rapidapi-key" : "d443a1c23fmshf52e5b1cfc8de7bp14f22ejsnd602160c8ed4",
                    "x-rapidapi-host" : "judge0-ce.p.rapidapi.com",
                },
            });

            if(retrieveOutput.ok){
                const output = await retrieveOutput.json();
                console.log("compiled output object: ", output)
            } else {
                console.error("Failed to compiled. Status : ", retrieveOutput.status)
            }
            
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <div className="h-screen flex flex-col bg-dark-fill-3">

            <Navbar onRun={handleCompile} onSubmit={handleCompile}/>

            <Split className='flex flex-grow' minSize={0}>
            
            {/** left panel */}
            <div className="rounded-md border border-dark-border m-4 p-1">
                    <ProblemDescription/>
			</div>
            
            {/** right panel */}
            <div className="flex flex-col">
                
                <div className="flex flex-grow flex-col p-0">

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
        </div>
    )
}

export default Workspace;