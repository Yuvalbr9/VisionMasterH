import React from 'react';
import { UI_TEXT } from '../constants';

interface StatusBoxProps {
  label: string;
  isActive: boolean;
}

const StatusBox: React.FC<StatusBoxProps> = ({ label, isActive }) => (
  <div className="connection-box">
    <span className="connection-text">{label}</span>
    <div className={`status-dot ${isActive ? 'status-green' : 'status-red'}`} />
  </div>
);

interface ConnectionStatusProps {
  isSystemConnected: boolean;
  isReceivingData: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isSystemConnected, isReceivingData }) => {
  return (
    <div className="connection-status-container" dir="rtl">
      <StatusBox label={UI_TEXT.TOPBAR.SYSTEM_CONNECTION} isActive={isSystemConnected} />
      <StatusBox label={UI_TEXT.TOPBAR.RECEIVING_DATA} isActive={isReceivingData} />
    </div>
  );
};
