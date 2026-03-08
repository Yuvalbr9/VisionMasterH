import React from 'react';
import { UI_TEXT } from '../../constants';
import { BaseButton, TabButton } from '../Buttons';

interface PanelTabsProps {
  tabs: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

export const PanelTabs: React.FC<PanelTabsProps> = ({ tabs, activeTab = 0, onTabChange }) => {
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
      <BaseButton
        className="lp-tab-nav-btn left-arrow"
        onClick={() => onTabChange?.(Math.max(0, activeTab - 1))}
        title={UI_TEXT.COMMON.PREVIOUS}
      >
        {UI_TEXT.COMMON.TAB_ARROW}
      </BaseButton>
      <BaseButton
        className="lp-tab-nav-btn"
        onClick={() => onTabChange?.(Math.max(0, activeTab + 1))}
        title={UI_TEXT.COMMON.NEXT}
      >
        {UI_TEXT.COMMON.TAB_ARROW}
      </BaseButton>
    </div>
  );
};
