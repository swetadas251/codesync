'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const createRoom = () => {
    const newRoomId = nanoid(8);
    router.push(`/room/${newRoomId}`);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      router.push(`/room/${roomId.trim()}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            Code<span className="text-blue-500">Sync</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time collaborative code editor
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
          {/* Create Room */}
          <button
            onClick={createRoom}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors mb-6"
          >
            Create New Room
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-gray-800 text-gray-400 text-sm">
                or join existing
              </span>
            </div>
          </div>

          {/* Join Room */}
          <form onSubmit={joinRoom}>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room code"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 mb-4"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors border border-gray-600"
            >
              Join Room
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-gray-400">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm">Real-time sync</div>
          </div>
          <div className="text-gray-400">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-sm">Multiple users</div>
          </div>
          <div className="text-gray-400">
            <div className="text-2xl mb-1">🎨</div>
            <div className="text-sm">Syntax highlight</div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Built with Next.js, Socket.io & Monaco Editor
        </p>
      </div>
    </main>
  );
}
