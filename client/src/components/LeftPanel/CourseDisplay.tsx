import React from 'react';
import { Angle } from 'unitsnet-js';
import { DegreeRuler } from './DegreeRuler';
import { ANGLE_UNITS, UI_TEXT } from '../../constants';
import { normalizeBearing } from '../../util';

interface CourseDisplayProps {
  value: Angle;
  onChange: (value: Angle) => void;
  isManualMode?: boolean;
  allowManualEditing?: boolean;
}

const WHEEL_STEP_DEG = 0.1;
const MAX_BUFFER_LENGTH = 3;

export const CourseDisplay: React.FC<CourseDisplayProps> = ({ value, onChange, isManualMode = false, allowManualEditing = true }) => {
  const [buffer, setBuffer] = React.useState('');
  const canEdit = isManualMode || allowManualEditing;

  React.useEffect(() => {
    if (!canEdit && buffer) {
      setBuffer('');
    }
  }, [canEdit, buffer]);

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
    if (!canEdit) {
      return;
    }

    event.preventDefault();
    const delta = event.deltaY < 0 ? WHEEL_STEP_DEG : -WHEEL_STEP_DEG;
    applyDegrees(value.Degrees + delta);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!canEdit) {
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
  const valueBoxClassName = `lp-value-box${canEdit ? ' lp-value-box-editable' : ''}${buffer ? ' lp-value-box-editing' : ''}`;

  return (
    <div className="lp-section">
      <div className="lp-row">
        <span className="lp-label">{UI_TEXT.LEFT_PANEL.COG}</span>
        <span
          className={valueBoxClassName}
          tabIndex={canEdit ? 0 : -1}
          role={canEdit ? 'spinbutton' : undefined}
          aria-label="Course over ground in degrees"
          aria-valuenow={value.Degrees}
          onClick={(event) => {
            if (canEdit) {
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
          {isManualMode ? UI_TEXT.LEFT_PANEL.MANUAL : UI_TEXT.COMMON.GPS}
        </span>
      </div>
      <div className={`lp-ruler-wrap ${canEdit ? 'lp-ruler-editable' : ''}`.trim()} onWheel={handleWheel}>
        <DegreeRuler value={value.Degrees} />
      </div>
      {isManualMode && <div className="lp-manual-hint">{UI_TEXT.LEFT_PANEL.MANUAL_HINT}</div>}
    </div>
  );
};
