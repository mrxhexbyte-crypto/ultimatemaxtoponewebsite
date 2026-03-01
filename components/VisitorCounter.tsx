
'use client';

import { useEffect, useState } from 'react';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to visitor tracking server');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'visitor-count') {
          setVisitorCount(message.payload.count);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from visitor tracking server');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800/50 text-white py-2 px-4 rounded-full border border-white/20 backdrop-blur-sm shadow-lg animate-fade-in-up">
      <div className="flex items-center space-x-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium">
          {visitorCount} {visitorCount === 1 ? 'visitor' : 'visitors'} online
        </span>
      </div>
    </div>
  );
};

export default VisitorCounter;
