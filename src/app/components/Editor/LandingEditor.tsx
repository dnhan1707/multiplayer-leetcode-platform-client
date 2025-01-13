import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import { languageOptions } from '../../constants/languageOptions';
import Editor from '@monaco-editor/react';
import * as dotenv from 'dotenv';

dotenv.config();

const LandingEditor : React.FC = () => {

    const [usercode, setusercode] = useState<string>("")
    const [lang, setlang] = useState(languageOptions[0])
    const [token, settoken] = useState<string>("")

    const apiKey : string = "d443a1c23fmshf52e5b1cfc8de7bp14f22ejsnd602160c8ed4";

    const onChange = (value : string | undefined): void => {
       setusercode(value || "")
    }

    const handleCompile = async() : Promise<void> => {
        //compile logic
    
        try{
            const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions/", { 
                method: "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "x-rapidapi-key" : "d443a1c23fmshf52e5b1cfc8de7bp14f22ejsnd602160c8ed4",
                    "x-rapidapi-host" : "judge0-ce.p.rapidapi.com",
                },
                body : JSON.stringify({
                    source_code : btoa(usercode),
                    language_id : lang.id,
                }),
            });
        
            const res = await response.json();
            settoken(res.token)
            
            console.log(token)

        } catch (e) {
            console.error(e)
        }
    }


    const checkExecution = async() => {
        try {
            const response = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, { 
                method: "GET",
                headers : {
                    "Content-Type" : "application/json",
                    "x-rapidapi-key" : "d443a1c23fmshf52e5b1cfc8de7bp14f22ejsnd602160c8ed4",
                    "x-rapidapi-host" : "judge0-ce.p.rapidapi.com",
                },
            });

            if(response.ok){
                const output = await response.json();
                console.log("compiled output object: ", output)
            } else {
                console.error("Failed to compiled. Status : ", response.status)
            }


        } catch (e) {
            console.error(e)
        }
       
    }


    useEffect(() => {
        setusercode(usercode);
    }, [usercode])
    
    const handleEditorChange = (value : string | undefined) => {
        const updateCode = value || "";
        setusercode(updateCode);
        onChange(updateCode)
    };
    
    return(
        <div>
            <div>
            <Editor
                height="85vh"
                defaultLanguage="javascript"
                theme="vs-dark"
                onChange={handleEditorChange}
            />
            </div>
            <div>
                <button className='bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded' onClick={handleCompile} disabled={!usercode}>Compile</button>
                <button className='bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded' onClick={checkExecution} disabled={!usercode}>Output</button>

            </div>


        </div>
    )
}

export default LandingEditor;