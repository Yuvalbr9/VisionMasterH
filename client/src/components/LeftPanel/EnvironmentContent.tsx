import React from 'react';
import { UI_TEXT } from '../../constants';
import { useEnvironment } from '../../hooks/useEnvironment';

const formatDirection = (value: number | undefined): string => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return UI_TEXT.COMMON.NOT_AVAILABLE;
  }

  return `${Math.round(value).toString().padStart(3, '0')}°`;
};

export const EnvironmentContent: React.FC = () => {
  const { environment, error, isLoading } = useEnvironment();

  return (
    <div className="lp-environment-content">
      {isLoading && <div className="lp-api-status">{UI_TEXT.LEFT_PANEL.LOADING_SIDEBAR}</div>}
      {error && <div className="lp-api-status lp-api-status-error">{error}</div>}

      <div className="lp-section lp-environment-section">
        <div className="lp-row">
          <span className="lp-label">{UI_TEXT.ENVIRONMENT.RAIN_LEVEL}</span>
          <span className="lp-value-box lp-value-box-wide">{environment?.rainLevel ?? UI_TEXT.COMMON.NOT_AVAILABLE}</span>
        </div>
        <div className="lp-row">
          <span className="lp-label">{UI_TEXT.ENVIRONMENT.WAVE_DIRECTION}</span>
          <span className="lp-value-box lp-value-box-wide">{formatDirection(environment?.waveDirection)}</span>
        </div>
        <div className="lp-row">
          <span className="lp-label">{UI_TEXT.ENVIRONMENT.SEA_STATE}</span>
          <span className="lp-value-box lp-value-box-wide">
            {environment ? environment.seaState.toString() : UI_TEXT.COMMON.NOT_AVAILABLE}
          </span>
        </div>
      </div>
    </div>
  );
};