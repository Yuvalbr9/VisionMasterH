import React, { Dispatch, SetStateAction, useState } from 'react';
import { ANGLE_UNITS, LENGTH_UNITS, UI_TEXT } from '../../constants';
import { RadarControlState } from '../../types';
import { clampEblBearingDeg, clampVrmRangeNm } from '../../util';

interface BottomCornerEblVrmProps {
  radarControls: RadarControlState;
  onRadarControlsChange: Dispatch<SetStateAction<RadarControlState>>;
}

const tryParseFiniteNumber = (value: string): number | null => {
  const trimmed = value.trim();
  if (trimmed === '' || isNaN(Number(trimmed))) return null;
  return Number(trimmed);
};

// --- EBL Row Component ---
interface EblRowProps {
  label: string;
  field: 'ebl1' | 'ebl2';
  value: number;
  isOn: boolean;
  activeKeyField: string | null;
  inputValue: string;
  onToggle: (f: string) => void;
  onWheel: (f: 'ebl1' | 'ebl2', e: React.WheelEvent, v: number) => void;
  onOpenInput: (f: string, v: number) => void;
  onInputChange: (val: string) => void;
  onInputConfirm: () => void;
  onInputKeyDown: (e: React.KeyboardEvent) => void;
}

const EblRow: React.FC<EblRowProps> = ({ 
  label, field, value, isOn, activeKeyField, inputValue, 
  onToggle, onWheel, onOpenInput, onInputChange, onInputConfirm, onInputKeyDown 
}) => {
  const isActive = activeKeyField === field;
  const displayValue = isActive ? inputValue : value.toFixed(1);
  const secondaryValue = ((value + 180) % 360).toFixed(1);

  return (
    <>
      <div className={`vm-ebl-vrm-cell vm-ebl-label ${isOn ? 'on' : ''}`} onClick={() => onToggle(field + 'On')}>
        {label}
      </div>
      <div 
        className={`vm-ebl-vrm-cell vm-ebl-val-primary ${isActive ? 'is-editing' : ''}`}
        onClick={() => onOpenInput(field, value)}
        onContextMenu={(e) => { e.preventDefault(); onOpenInput(field, value); }}
        onWheel={(e) => onWheel(field, e, value)}
      >
        {isActive ? (
          <input 
            type="number"
            step="0.1"
            autoFocus
            className="vm-ebl-input"
            value={inputValue}
            onChange={e => onInputChange(e.target.value)}
            onKeyDown={onInputKeyDown}
            onBlur={onInputConfirm}
          />
        ) : (
          <span>{displayValue}{ANGLE_UNITS.DEGREE}</span>
        )}
      </div>
      <div className="vm-ebl-vrm-cell">
        <div className="vm-ebl-val-secondary">({secondaryValue}{ANGLE_UNITS.DEGREE})</div>
      </div>
      <div className="vm-ebl-vrm-cell vm-ebl-flag">{UI_TEXT.EBL_VRM.TRUE_FLAG}</div>
    </>
  );
};

// --- VRM Row Component ---
interface VrmRowProps {
  label: string;
  field: 'vrm1' | 'vrm2';
  value: number;
  isOn: boolean;
  activeKeyField: string | null;
  inputValue: string;
  onToggle: (f: string) => void;
  onWheel: (f: 'vrm1' | 'vrm2', e: React.WheelEvent, v: number) => void;
  onOpenInput: (f: string, v: number) => void;
  onInputChange: (val: string) => void;
  onInputConfirm: () => void;
  onInputKeyDown: (e: React.KeyboardEvent) => void;
}

const VrmRow: React.FC<VrmRowProps> = ({ 
  label, field, value, isOn, activeKeyField, inputValue, 
  onToggle, onWheel, onOpenInput, onInputChange, onInputConfirm, onInputKeyDown 
}) => {
  const isActive = activeKeyField === field;
  const displayValue = isActive ? inputValue : value.toFixed(2);

  return (
    <>
      <div className={`vm-ebl-vrm-cell vm-ebl-label ${isOn ? 'on' : ''}`} onClick={() => onToggle(field + 'On')}>
        {label}
      </div>
      <div 
        className={`vm-ebl-vrm-cell vm-vrm-val ${isActive ? 'is-editing' : ''}`}
        onClick={() => onOpenInput(field, value)}
        onContextMenu={(e) => { e.preventDefault(); onOpenInput(field, value); }}
        onWheel={(e) => onWheel(field, e, value)}
      >
        {isActive ? (
          <input 
            type="number"
            step="0.1"
            autoFocus
            className="vm-ebl-input"
            value={inputValue}
            onChange={e => onInputChange(e.target.value)}
            onKeyDown={onInputKeyDown}
            onBlur={onInputConfirm}
          />
        ) : (
          <span>{displayValue} {LENGTH_UNITS.NAUTICAL_MILES}</span>
        )}
      </div>
      <div className="vm-empty-cell" />
    </>
  );
};

export const BottomCornerEblVrm: React.FC<BottomCornerEblVrmProps> = ({
  radarControls,
  onRadarControlsChange,
}) => {
  const { ebl1Deg, ebl2Deg, vrm1Nm, vrm2Nm, ebl1On, ebl2On, vrm1On, vrm2On } = radarControls;

  const [activeKeyField, setActiveKeyField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleToggle = (fieldStateKey: string) => {
    onRadarControlsChange(prev => ({ ...prev, [fieldStateKey]: !(prev as any)[fieldStateKey] }));
  };

  const handleWheel = (field: 'ebl1' | 'ebl2' | 'vrm1' | 'vrm2', e: React.WheelEvent, currentValue: number) => {
    const isEbl = field.startsWith('ebl');
    const step = isEbl ? 0.5 : 0.05;
    const delta = e.deltaY < 0 ? step : -step;
    const nextValue = currentValue + delta;
    
    if (field === 'ebl1') onRadarControlsChange(prev => ({ ...prev, ebl1Deg: clampEblBearingDeg(nextValue) }));
    if (field === 'ebl2') onRadarControlsChange(prev => ({ ...prev, ebl2Deg: clampEblBearingDeg(nextValue) }));
    if (field === 'vrm1') onRadarControlsChange(prev => ({ ...prev, vrm1Nm: clampVrmRangeNm(nextValue) }));
    if (field === 'vrm2') onRadarControlsChange(prev => ({ ...prev, vrm2Nm: clampVrmRangeNm(nextValue) }));
  };

  const openInputEditor = (field: string, value: number) => {
    setActiveKeyField(field);
    setInputValue(value.toFixed(field.startsWith('ebl') ? 1 : 2));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') confirmKeyEntry();
  };

  const confirmKeyEntry = () => {
    if (!activeKeyField) return;
    const parsed = tryParseFiniteNumber(inputValue);
    if (parsed !== null) {
      if (activeKeyField === 'ebl1') onRadarControlsChange(prev => ({ ...prev, ebl1Deg: clampEblBearingDeg(parsed) }));
      if (activeKeyField === 'ebl2') onRadarControlsChange(prev => ({ ...prev, ebl2Deg: clampEblBearingDeg(parsed) }));
      if (activeKeyField === 'vrm1') onRadarControlsChange(prev => ({ ...prev, vrm1Nm: clampVrmRangeNm(parsed) }));
      if (activeKeyField === 'vrm2') onRadarControlsChange(prev => ({ ...prev, vrm2Nm: clampVrmRangeNm(parsed) }));
    }
    setActiveKeyField(null);
  };

  const sharedProps = {
    activeKeyField,
    inputValue,
    onToggle: handleToggle,
    onOpenInput: openInputEditor,
    onInputChange: setInputValue,
    onInputConfirm: confirmKeyEntry,
    onInputKeyDown: handleKeyDown,
  };

  return (
    <div className="vm-bottom-corner-floating">
      <div className="vm-ebl-vrm-grid">
        <EblRow label="EBL1" field="ebl1" value={ebl1Deg} isOn={ebl1On} onWheel={handleWheel as any} {...sharedProps} />
        <VrmRow label="VRM1" field="vrm1" value={vrm1Nm} isOn={vrm1On} onWheel={handleWheel as any} {...sharedProps} />
        <EblRow label="EBL2" field="ebl2" value={ebl2Deg} isOn={ebl2On} onWheel={handleWheel as any} {...sharedProps} />
        <VrmRow label="VRM2" field="vrm2" value={vrm2Nm} isOn={vrm2On} onWheel={handleWheel as any} {...sharedProps} />
      </div>
    </div>
  );
};
