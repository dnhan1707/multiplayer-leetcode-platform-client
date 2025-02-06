"use client"

import React, { useEffect, useState } from 'react';

interface TestcasesProp {
  testResults: {
    success: boolean;   // true = all passed, false = some failed
    wrong_answer?: {
      case: string;
      expected: string;
      received: string;
    }[];
  } | null;
}

const Testcases: React.FC<TestcasesProp> = ({ testResults }) => {
  const [testcasesArray, setTestcaseArray] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(3);


  console.log("TESTCASES PRINT WHERE \n", testResults)

  useEffect(() => {
    if (testResults === null) {
      setStatus(3);
      setTestcaseArray([]);
    } else if (testResults.success) {
      console.log("All passed");
      setStatus(1);
      setTestcaseArray([]);
    } else if (testResults.wrong_answer && testResults.wrong_answer.length > 0) {
      setTestcaseArray(testResults.wrong_answer);
      setStatus(2);
    } else {
      setTestcaseArray([]);
      setStatus(3);
    }
  }, [testResults]);

  return (
    <div className="p-4 bg-dark-fill-3 text-white rounded-md h-full overflow-y-auto min-h-[200px]">
      <div className="space-y-2">
        {status === 3 ? (
          <div className="text-lg font-semibold mb-4">Test Cases Will Be Shown After Submission</div>
        ) : status === 1 ? (
          <div>All Passed</div>
        ) : status === 2 ? (
          testcasesArray.map((testcase, index) => (
            <div key={index} className="p-2 bg-dark-fill-2 rounded-md flex items-center">
              <pre className="whitespace-pre-wrap flex-grow">{testcase.case}</pre>
              <div className="ml-4 text-red-500">✘</div>
              <div className="ml-4">
                <div>Expected: {testcase.expected}</div>
                <div>Received: {testcase.received}</div>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default Testcases;