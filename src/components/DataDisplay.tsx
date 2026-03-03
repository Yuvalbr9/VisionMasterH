import React from 'react';
import { DataButton } from './Buttons';
import { DATA_COLORS } from '../constants';

interface DataDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: 'GPS' | 'Log' | 'Autonomous' | string;
  statusColor?: string;
  valueColor?: string;
  showGraph?: boolean;
}

export const DataDisplay: React.FC<DataDisplayProps> = ({
  label,
  value,
  unit,
  status,
  statusColor = DATA_COLORS.STATUS,
  valueColor = DATA_COLORS.VALUE,
  showGraph = false,
}) => {
  return (
    <div className="data-display">
      <div className="data-header">
        <span className="data-label">{label}</span>
        {status && (
          <span className="data-status" style={{ color: statusColor }}>
            {status}
          </span>
        )}
      </div>
      <div className="data-value-container">
        <span className="data-value" style={{ color: valueColor }}>
          {value}
        </span>
        {unit && <span className="data-unit">{unit}</span>}
      </div>
      {showGraph && <div className="data-graph"></div>}
    </div>
  );
};

interface DataDisplayWithButtonProps {
  label: string;
  value: string | number;
  unit?: string;
  buttonText: string;
  onButtonClick?: () => void;
  valueColor?: string;
}

export const DataDisplayWithButton: React.FC<DataDisplayWithButtonProps> = ({
  label,
  value,
  unit,
  buttonText,
  onButtonClick,
  valueColor = DATA_COLORS.VALUE,
}) => {
  return (
    <div className="data-display">
      <div className="data-header">
        <span className="data-label">{label}</span>
      </div>
      <div className="data-value-row">
        <span className="data-value" style={{ color: valueColor }}>
          {value}
        </span>
        {unit && <span className="data-unit">{unit}</span>}
        <DataButton onClick={onButtonClick}>
          {buttonText}
        </DataButton>
      </div>
    </div>
  );
};

interface DataDisplayDoubleProps {
  label: string;
  value1: string | number;
  value2: string | number;
  unit?: string;
  status?: string;
  statusColor?: string;
  valueColor?: string;
}

export const DataDisplayDouble: React.FC<DataDisplayDoubleProps> = ({
  label,
  value1,
  value2,
  unit,
  status,
  statusColor = DATA_COLORS.STATUS,
  valueColor = DATA_COLORS.VALUE,
}) => {
  return (
    <div className="data-display">
      <div className="data-header">
        <span className="data-label">{label}</span>
        {status && (
          <span className="data-status" style={{ color: statusColor }}>
            {status}
          </span>
        )}
      </div>
      <div className="data-double-row">
        <div className="data-value-container">
          <span className="data-value" style={{ color: valueColor }}>
            {value1}
          </span>
        </div>
        <div className="data-value-container">
          <span className="data-value" style={{ color: valueColor }}>
            {value2}
          </span>
          {unit && <span className="data-unit">{unit}</span>}
        </div>
      </div>
    </div>
  );
};
