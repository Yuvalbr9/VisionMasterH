import React from 'react';

export const DateTimeDisplay: React.FC = () => {
  return (
    <div className="datetime-display">
      <div className="date">22 Jul 2024</div>
      <div className="time-row">
        <span className="time">16:00:52 UTC</span>
        <span className="zone">-15</span>
      </div>
    </div>
  );
};
