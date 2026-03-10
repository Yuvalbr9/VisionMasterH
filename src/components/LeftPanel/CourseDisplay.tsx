import React from 'react';
import { Angle } from 'unitsnet-js';
import { DegreeRuler } from './DegreeRuler';
import { ANGLE_UNITS, UI_TEXT } from '../../constants';
import { normalizeBearing } from '../../util';
import { Section } from './ui/Section';
import { LabeledRow } from './ui/LabeledRow';
import { DataBox } from './ui/DataBox';

interface CourseDisplayProps {
  value: Angle;
  onChange: (value: Angle) => void;
  isManualMode?: boolean;
}

const WHEEL_STEP_DEG = 0.1;
const MAX_BUFFER_LENGTH = 3;

export const CourseDisplay: React.FC<CourseDisplayProps> = ({ value, onChange, isManualMode = false }) => {
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

  return (
    <Section>
      <LabeledRow label={UI_TEXT.LEFT_PANEL.COG}>
        <DataBox
          value={displayValue}
          isEditable={isManualMode}
          isEditing={Boolean(buffer)}
          badgeText={isManualMode ? UI_TEXT.LEFT_PANEL.MANUAL : UI_TEXT.COMMON.GPS}
          badgeType={isManualMode ? 'manual' : 'green'}
          tabIndex={isManualMode ? 0 : -1}
          role={isManualMode ? 'spinbutton' : undefined}
          ariaLabel="Course over ground in degrees"
          ariaValueNow={value.Degrees}
          onClick={(event) => {
            if (isManualMode) {
              event.currentTarget.focus();
            }
          }}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onBlur={() => setBuffer('')}
        />
      </LabeledRow>
      <div className={isManualMode ? 'lp-ruler-editable' : ''} onWheel={handleWheel}>
        <DegreeRuler value={value.Degrees} />
      </div>
      {isManualMode && <div className="lp-manual-hint">{UI_TEXT.LEFT_PANEL.MANUAL_HINT}</div>}
    </Section>
  );
};
