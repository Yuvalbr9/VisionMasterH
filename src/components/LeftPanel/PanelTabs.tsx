import React from 'react';
import { TabButton } from '../Buttons';

interface PanelTabsProps {
  tabs: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

export const PanelTabs: React.FC<PanelTabsProps> = ({ tabs, activeTab = 0, onTabChange }) => {
  return (
    <div className="panel-header">
      <div className="panel-tabs">
        {tabs.map((tab, index) => (
          <TabButton 
            key={index} 
            label={tab}
            active={index === activeTab}
            onClick={() => onTabChange?.(index)}
          />
        ))}
      </div>
    </div>
  );
};
