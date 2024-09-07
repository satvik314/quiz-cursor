import React, { useState, useEffect } from 'react';

interface VintageTimerProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
}

export const VintageTimer: React.FC<VintageTimerProps> = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="vintage-timer flex items-center justify-center mb-6">
      <div className="bg-amber-100 border-4 border-amber-900 rounded-full p-4 shadow-lg">
        <div className="font-mono text-3xl text-amber-900 font-bold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
      <style jsx>{`
        .vintage-timer {
          position: relative;
        }
        .vintage-timer::before,
        .vintage-timer::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #78350f;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        .vintage-timer::before {
          left: -4px;
        }
        .vintage-timer::after {
          right: -4px;
        }
      `}</style>
    </div>
  );
};