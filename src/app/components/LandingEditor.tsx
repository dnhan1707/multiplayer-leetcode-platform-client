import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import { languageOptions } from '../constants/languageOptions';
import Editor from '@monaco-editor/react';

type editorProps = {
    onUserCodeChange : (codetosubmit : string) => void; //callback
};

const LandingEditor : React.FC<editorProps> = ({onUserCodeChange}) => {

    const handleEditorChange = (value : string | undefined) => {
        const updateCode = value || "";
        onUserCodeChange(updateCode) //send update to parent
    };
    
    return(
        <div>
            <div>
            <Editor
                height="50vh"
                defaultLanguage="javascript"
                theme="vs-dark"
                onChange={handleEditorChange}
                options={{
                    fontSize: 18,
                    lineHeight: 20, // Optional: Adjust line height
                    minimap: { enabled: false }, // Optional: Disable minimap to give more space
                    wordWrap: "on", // Optional: Enable word wrapping
                }}
            />
            </div>
        </div>
    )
}

export default LandingEditor;