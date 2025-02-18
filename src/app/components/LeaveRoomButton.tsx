import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

interface LeaveRoomButtonProps {
  variant?: 'workspace' | 'room'; // Different styles for different pages
}

const LeaveRoomButton: React.FC<LeaveRoomButtonProps> = ({ variant = 'room' }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { roomCode, setRoomCode } = useUser();

  const handleLeaveRoom = async () => {
    try {
      const response = await fetch(`http://localhost:4000/roomParticipant/leave/${roomCode}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to leave room');

      // Clear room-related localStorage items
      localStorage.removeItem('roomCode');
      localStorage.removeItem('gameStarted');
      localStorage.removeItem('selectedProblem');
      localStorage.removeItem('problemDes');
      localStorage.removeItem('problemTitle');
      localStorage.removeItem('submittedCode');

      // Clear states
      setRoomCode('');
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  };

  const buttonClass = variant === 'workspace' 
    ? 'fixed top-4 left-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
    : 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600';

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={buttonClass}
      >
        Leave Room
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-fill-2 rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-white mb-4">Leave Room?</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to leave this room? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleLeaveRoom}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveRoomButton;