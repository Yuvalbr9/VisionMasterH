import React from 'react';

export const DateTimeDisplay: React.FC = () => {
  return (
    <div className="lp-datetime">
      <div className="lp-datetime-date">22 Jul 2014</div>
      <div className="lp-datetime-time-row">
        <span className="lp-datetime-time">16:00:32 UTC</span>
        <span className="lp-badge lp-badge-green lp-badge-offset">+5</span>
      </div>
    </div>
  );
};
