import React from 'react';
import { TopButtonSection } from './RightPanel/TopButtonSection';
import { NoNameSection } from './RightPanel/NoNameSection';
import { RangeControls } from './RightPanel/RangeControls';
import { PositionInfo } from './RightPanel/PositionInfo';
import { ChartControls } from './RightPanel/ChartControls';
import { BearingControls } from './RightPanel/BearingControls';
import { BottomSection } from './RightPanel/BottomSection';

export const RightPanel: React.FC = () => {
  return (
    <div className="right-panel">
      <TopButtonSection />
      <NoNameSection />

      <div className="right-panel-content">
        <RangeControls />
        <PositionInfo />
        <ChartControls />
        <BearingControls />
        <button className="start-btn">Start</button>
      </div>

      <BottomSection />
    </div>
  );
};
