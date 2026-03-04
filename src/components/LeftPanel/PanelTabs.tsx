import React, { useState } from 'react';
import { TabButton } from '../Buttons';

interface PanelTabsProps {
  tabs: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

export const PanelTabs: React.FC<PanelTabsProps> = ({ tabs, activeTab = 0, onTabChange }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="lp-tabs-bar">
      {tabs.map((tab, index) => (
        <TabButton
          key={index}
          label={tab}
          active={index === activeTab}
          onClick={() => onTabChange?.(index)}
        />
      ))}
      <button
        className="lp-tab-nav-btn"
        onClick={() => onTabChange?.(Math.max(0, activeTab - 1))}
        title="Previous"
      >◄</button>
      <button
        className="lp-tab-nav-btn"
        title={playing ? 'Pause' : 'Play'}
        onClick={() => setPlaying(p => !p)}
      >
        {playing ? '⏸' : '►'}
      </button>
    </div>
  );
};
