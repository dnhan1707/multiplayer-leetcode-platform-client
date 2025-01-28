import React from 'react';
import Editor from '@monaco-editor/react';
import { useUser } from '../context/UserContext';

type EditorProps = {
  onUserCodeChange: (codeToSubmit: string) => void; // Callback for parent
  language?: string; // Optional language prop
};

const LandingEditor: React.FC<EditorProps> = ({ onUserCodeChange, language = 'javascript' }) => {
  const { submittedCode } = useUser();

  const handleEditorChange = (value: string | undefined) => {
    const updatedCode = value || '';
    onUserCodeChange(updatedCode); // Send updates to parent
  };

  return (
    <div>
      <Editor
        key={language} // Force re-render when language changes
        height="50vh"
        defaultLanguage={language}
        theme="vs-dark"
        onChange={handleEditorChange}
        value={submittedCode}
        options={{
          fontSize: 18,
          lineHeight: 20, // Optional: Adjust line height
          minimap: { enabled: false }, // Disable minimap
          wordWrap: 'on', // Enable word wrapping
        }}
      />
    </div>
  );
};

export default LandingEditor;
