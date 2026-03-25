import React from 'react';
import { BaseButton } from './Buttons';
import { ConnectionStatus } from './ConnectionStatus';
import { UI_TEXT as UiText } from '../constants';

interface TopbarProps {
  isConnected: boolean;
  isReceivingData: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ isConnected, isReceivingData }) => {
  return (
    <div className="legacy-topbar">
      <div className="legacy-topbar-left">
        <span className="legacy-app-icon" aria-hidden="true">◉</span>
        <span className="legacy-app-name">{UiText.TOPBAR.APP_NAME}</span>
        <ConnectionStatus 
          isSystemConnected={isConnected} 
          isReceivingData={isReceivingData} 
        />
      </div>
      <div className="legacy-topbar-right">
        <BaseButton className="legacy-win-btn" aria-label={UiText.TOPBAR.MINIMIZE} />
        <BaseButton className="legacy-win-btn" aria-label={UiText.TOPBAR.MAXIMIZE} />
        <BaseButton className="legacy-win-btn legacy-win-btn-close" aria-label={UiText.TOPBAR.CLOSE} />
      </div>
    </div>
  );
};
