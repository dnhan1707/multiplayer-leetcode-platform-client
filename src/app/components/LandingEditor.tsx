import React from 'react';
import { useState } from 'react';
import { languageOptions } from '../constants/languageOptions';
import CodeEditor from '../components/CodeEditor';

const LandingEditor : React.FC = () => {

    const [usercode, setusercode] = useState<string>("")

    const onChange = (value : string | undefined): void => {
       setusercode(value || "")
    }

    const handleCompile = async() => {
        //compile logic
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
                <button onClick={handleCompile} disabled={!usercode} className="mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
                ></button>
            </div>


        </div>
    )
}

export default LandingEditor;