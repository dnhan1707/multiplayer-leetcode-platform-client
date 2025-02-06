import React from 'react';
import Editor from '@monaco-editor/react';
import { useUser } from '../context/UserContext';
import { getBoilerPlate } from '../constants/boilerPlate';

type EditorProps = {
  onUserCodeChange: (codeToSubmit: string) => void; // Callback for parent
  language?: string; // Optional language prop
};

const LandingEditor: React.FC<EditorProps> = ({ onUserCodeChange, language = 'javascript' }) => {
  const { getSubmittedCode, problemTitle } = useUser();
  let submittedCode = getSubmittedCode();

  if(!submittedCode) {
    console.log("getting boiler plate")
    const boilerPlate = getBoilerPlate(problemTitle, language);
    submittedCode = boilerPlate;
  }

  const handleEditorChange = (value: string | undefined) => {
    const updatedCode = value || submittedCode;
    onUserCodeChange(updatedCode); // Send updates to parent
  };

  return (
    <div>
      <Editor
        key={language} // Force re-render when language changes
        height="50vh"
        language={language}  // Use language here, not defaultLanguage
        theme="vs-dark"
        onChange={handleEditorChange}
        value={submittedCode}
        options={{
          fontSize: 18,
          lineHeight: 20,
          minimap: { enabled: false },
          wordWrap: 'on',
        }}
      />
    </div>
  );
};

export default LandingEditor;
