import React from 'react';
import { useState } from 'react';
import { languageOptions } from '../constants/languageOptions';
import CodeEditor from '../components/CodeEditor';
import * as dotenv from 'dotenv';

dotenv.config();

const LandingEditor : React.FC = () => {

    const [usercode, setusercode] = useState<string>("")
    const [lang, setlang] = useState(languageOptions[0])

    const apiKey : string = "d443a1c23fmshf52e5b1cfc8de7bp14f22ejsnd602160c8ed4";

    const onChange = (value : string | undefined): void => {
       setusercode(value || "")
    }

    const handleCompile = async() : Promise<void> => {
        //compile logic
    
        try{

            const data = {
                language_id : lang.id,
                source_code : btoa(usercode),
            }

            const response = await fetch(apiKey, { 
                method: "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "x-rapidapi-key" : "d443a1c23fmshf52e5b1cfc8de7bp14f22ejsnd602160c8ed4",
                    "x-rapidapi-host" : "judge0-ce.p.rapidapi.com",
                },
                body : JSON.stringify({
                    ...data,
                    base64_encoded : "true",
                    fields : "*",
                }),
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message || "Failed to compile");
            } 


            const res : string = await response.json();
            console.log("res data : ", res)

            const token = res;

        } catch (e) {
            console.error(e)
        }
    }


    const checkExecution = async(token : string) => {
        try {


            const response = await fetch(process.env.REACT_APP_RAPID_API_KEY || "", { 
                method: "GET",
                headers : {
                    "Content-Type" : "application/json",
                    "x-rapidapi-key" : process.env.REACT_APP_RAPID_API_HOST || "",
                    "x-rapidapi-host" : process.env.REACT_APP_RAPID_API_HOST || "",
                },
                body : JSON.stringify({
                    base64_encoded : "true",
                    fields : "*",
                })
            });

        } catch (e) {
            
        }
       

    }

    return(
        <div>
            <div>
                <CodeEditor
                    onChange={onChange}
                    code={usercode}                
                />
            </div>

            <div>
                <button className='bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded' onClick={handleCompile} disabled={!usercode}>Compile</button>
            </div>


        </div>
    )
}

export default LandingEditor;