import React from 'react';
import { CompilerResult } from '../types/types';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  testResults: CompilerResult | null;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose, testResults }) => {
  if (!isOpen) return null;

  const passedTestCases = testResults?.successCount || 0;
  const wrongAnswers = testResults?.failedCount  || 0;
  const totalTestCases = passedTestCases + wrongAnswers;
  const percentage = Math.round((passedTestCases / totalTestCases) * 100) || 0;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-fill-2 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Your Progress</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-white">Test Cases</span>
              <span className="text-sm font-medium text-white">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  percentage === 100 ? 'bg-green-600' : 'bg-yellow-400'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {passedTestCases} of {totalTestCases} test cases passed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;