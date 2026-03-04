import React from 'react';

export const DateTimeDisplay: React.FC = () => {
  return (
    <div className="datetime-display">
      <div className="date">22 Jul 2014</div>
      <div className="time-row">
        <span className="time">16:00:32 UTC</span>
      </div>
    </div>
  );
};
