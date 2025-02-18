import React from 'react';
import { useRouter } from 'next/navigation';

const RoomFullModal: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-fill-2 rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold text-white mb-4">Room is Full</h2>
        <p className="text-gray-300 mb-6">
          This room has reached its maximum capacity of 2 participants.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RoomFullModal;