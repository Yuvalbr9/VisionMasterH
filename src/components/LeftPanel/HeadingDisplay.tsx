import React from 'react';
import { Angle } from 'unitsnet-js';
import { DegreeRuler } from './DegreeRuler';
import { ANGLE_UNITS, UI_TEXT } from '../../constants';
import { normalizeBearing } from '../../util';

interface HeadingDisplayProps {
  value: Angle;
  onChange: (value: Angle) => void;
  isManualMode?: boolean;
}

const WHEEL_STEP_DEG = 0.1;
const MAX_BUFFER_LENGTH = 3;

export const HeadingDisplay: React.FC<HeadingDisplayProps> = ({ value, onChange, isManualMode = false }) => {
  const [buffer, setBuffer] = React.useState('');

  React.useEffect(() => {
    if (!isManualMode && buffer) {
      setBuffer('');
    }
  }, [isManualMode, buffer]);

  const applyDegrees = (nextDeg: number) => {
    onChange(Angle.FromDegrees(normalizeBearing(nextDeg)));
  };

  const commitBuffer = () => {
    if (!buffer) {
      return;
    }

    const numericValue = Number(buffer);
    if (Number.isFinite(numericValue)) {
      applyDegrees(numericValue);
    }

    setBuffer('');
  };

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (!isManualMode) {
      return;
    }

    event.preventDefault();
    const delta = event.deltaY < 0 ? WHEEL_STEP_DEG : -WHEEL_STEP_DEG;
    applyDegrees(value.Degrees + delta);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isManualMode) {
      return;
    }

    if (/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      setBuffer((prev) => `${prev}${event.key}`.slice(0, MAX_BUFFER_LENGTH));
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      setBuffer((prev) => prev.slice(0, -1));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      commitBuffer();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setBuffer('');
    }
  };

  const displayValue = buffer ? `${buffer}${ANGLE_UNITS.DEGREE}` : `${value.Degrees.toFixed(1)}${ANGLE_UNITS.DEGREE}`;
  const valueBoxClassName = `lp-value-box${isManualMode ? ' lp-value-box-editable' : ''}${buffer ? ' lp-value-box-editing' : ''}`;

  return (
    <div className="lp-section">
      <div className="lp-row">
        <span className="lp-label">{UI_TEXT.LEFT_PANEL.HDG}</span>
        <span
          className={valueBoxClassName}
          tabIndex={isManualMode ? 0 : -1}
          role={isManualMode ? 'spinbutton' : undefined}
          aria-label="Heading in degrees"
          aria-valuenow={value.Degrees}
          onClick={(event) => {
            if (isManualMode) {
              event.currentTarget.focus();
            }
          }}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onBlur={() => setBuffer('')}
        >
          {displayValue}
        </span>
        <span className={`lp-badge ${isManualMode ? 'lp-badge-manual' : 'lp-badge-green'}`}>
          {isManualMode ? UI_TEXT.LEFT_PANEL.MANUAL : UI_TEXT.RADAR_TOP_INFO.GYRO}
        </span>
      </div>
      <div className={isManualMode ? 'lp-ruler-editable' : ''} onWheel={handleWheel}>
        <DegreeRuler value={value.Degrees} />
      </div>
      {isManualMode && <div className="lp-manual-hint">{UI_TEXT.LEFT_PANEL.MANUAL_HINT}</div>}
    </div>
  );
};
