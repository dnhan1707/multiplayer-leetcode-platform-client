import React, { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

interface Props {
    onChange : (code : string) => void;
    lang? : string;
    code? : string;
    theme? : string;
}

const CodeEditor: React.FC<Props> = ({
    onChange,
    lang = 'javscript',
    code = "",
    theme = "vs-dark",
}) => {

    const [inputcode, setinputcode] = useState<string>(code);

    useEffect(() => {
        setinputcode(code);
    }, [code])

    const handleEditorChange = (value : string | undefined) => {
        const updateCode = value || "";
        setinputcode(updateCode);
        onChange(updateCode)
    };


    return (
        <div>
        <Editor
            height="85vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            onChange={handleEditorChange}
        />
        </div>
    );
};

export default CodeEditor;
