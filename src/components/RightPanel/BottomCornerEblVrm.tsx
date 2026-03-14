import React, { Dispatch, SetStateAction } from 'react';
import { ANGLE_UNITS, LENGTH_UNITS, UI_TEXT, UI_VALUES } from '../../constants';
import { RadarControlState } from '../../types';
import { ControlButton } from '../Buttons';
import { GenericInput } from '../Inputs';
import { clampEblBearingDeg, clampVrmRangeNm } from '../../util';

interface BottomCornerEblVrmProps {
  radarControls: RadarControlState;
  onRadarControlsChange: Dispatch<SetStateAction<RadarControlState>>;
}

const tryParseFiniteNumber = (value: string): number | null => {
  const trimmed = value.trim();

  if (
    trimmed === ''
    || trimmed === '-'
    || trimmed === '+'
    || trimmed === '.'
    || trimmed === '-.'
    || trimmed === '+.'
  ) {
    return null;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
};

export const BottomCornerEblVrm: React.FC<BottomCornerEblVrmProps> = ({
  radarControls,
  onRadarControlsChange,
}) => {
  const eblMin = UI_VALUES.RIGHT_PANEL.EBL_MIN;
  const eblMax = UI_VALUES.RIGHT_PANEL.EBL_MAX;
  const vrmMin = UI_VALUES.RIGHT_PANEL.VRM_MIN;
  const vrmMax = UI_VALUES.RIGHT_PANEL.VRM_MAX;

  const ebl1Deg = clampEblBearingDeg(radarControls.ebl1Deg);
  const ebl2Deg = clampEblBearingDeg(radarControls.ebl2Deg);
  const vrm1Nm = clampVrmRangeNm(radarControls.vrm1Nm);
  const vrm2Nm = clampVrmRangeNm(radarControls.vrm2Nm);

  const [ebl1Input, setEbl1Input] = React.useState(ebl1Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  const [ebl2Input, setEbl2Input] = React.useState(ebl2Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  const [vrm1Input, setVrm1Input] = React.useState(vrm1Nm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS));
  const [vrm2Input, setVrm2Input] = React.useState(vrm2Nm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS));
  const [activeField, setActiveField] = React.useState<'ebl1' | 'ebl2' | 'vrm1' | 'vrm2' | null>(null);

  React.useEffect(() => {
    if (activeField !== 'ebl1') {
      setEbl1Input(ebl1Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
    }
  }, [activeField, ebl1Deg]);

  React.useEffect(() => {
    if (activeField !== 'ebl2') {
      setEbl2Input(ebl2Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
    }
  }, [activeField, ebl2Deg]);

  React.useEffect(() => {
    if (activeField !== 'vrm1') {
      setVrm1Input(vrm1Nm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS));
    }
  }, [activeField, vrm1Nm]);

  React.useEffect(() => {
    if (activeField !== 'vrm2') {
      setVrm2Input(vrm2Nm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS));
    }
  }, [activeField, vrm2Nm]);

  const applyEbl1 = (nextValue: string) => {
    const parsed = tryParseFiniteNumber(nextValue);
    if (parsed === null) {
      setEbl1Input(nextValue);
      return;
    }

    const clamped = clampEblBearingDeg(parsed);
    setEbl1Input(clamped === parsed ? nextValue : clamped.toString());
    onRadarControlsChange((prev) => ({ ...prev, ebl1Deg: clamped }));
  };

  const applyEbl2 = (nextValue: string) => {
    const parsed = tryParseFiniteNumber(nextValue);
    if (parsed === null) {
      setEbl2Input(nextValue);
      return;
    }

    const clamped = clampEblBearingDeg(parsed);
    setEbl2Input(clamped === parsed ? nextValue : clamped.toString());
    onRadarControlsChange((prev) => ({ ...prev, ebl2Deg: clamped }));
  };

  const applyVrm1 = (nextValue: string) => {
    const parsed = tryParseFiniteNumber(nextValue);
    if (parsed === null) {
      setVrm1Input(nextValue);
      return;
    }

    const clamped = clampVrmRangeNm(parsed);
    setVrm1Input(clamped === parsed ? nextValue : clamped.toString());
    onRadarControlsChange((prev) => ({ ...prev, vrm1Nm: clamped }));
  };

  const applyVrm2 = (nextValue: string) => {
    const parsed = tryParseFiniteNumber(nextValue);
    if (parsed === null) {
      setVrm2Input(nextValue);
      return;
    }

    const clamped = clampVrmRangeNm(parsed);
    setVrm2Input(clamped === parsed ? nextValue : clamped.toString());
    onRadarControlsChange((prev) => ({ ...prev, vrm2Nm: clamped }));
  };

  return (
    <div className="vm-bottom-corner-floating">
      <div className="vm-ebl-vrm-table">
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">{UI_TEXT.EBL_VRM.EBL1}</ControlButton>
          <GenericInput
            type="number"
            className="vm-ebl-input"
            step={UI_VALUES.RIGHT_PANEL.BEARING_STEP}
            min={`${eblMin}`}
            max={`${eblMax}`}
            value={ebl1Input}
            onChange={(event) => applyEbl1(event.target.value)}
            onFocus={() => setActiveField('ebl1')}
            onBlur={() => {
              setActiveField(null);
              setEbl1Input(ebl1Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
            }}
          />
          <div className="vm-ebl-meta">{ANGLE_UNITS.DEGREE}</div>
          <ControlButton className="vm-ebl-flag">{UI_TEXT.EBL_VRM.TRUE_FLAG}</ControlButton>
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">{UI_TEXT.EBL_VRM.VRM1}</ControlButton>
          <GenericInput
            type="number"
            className="vm-ebl-input"
            step={UI_VALUES.RIGHT_PANEL.RANGE_STEP}
            min={`${vrmMin}`}
            max={`${vrmMax}`}
            value={vrm1Input}
            onChange={(event) => applyVrm1(event.target.value)}
            onFocus={() => setActiveField('vrm1')}
            onBlur={() => {
              setActiveField(null);
              setVrm1Input(vrm1Nm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS));
            }}
          />
          <div className="vm-ebl-meta">{LENGTH_UNITS.NAUTICAL_MILES}</div>
          <div className="vm-ebl-flag-empty" />
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">{UI_TEXT.EBL_VRM.EBL2}</ControlButton>
          <GenericInput
            type="number"
            className="vm-ebl-input"
            step={UI_VALUES.RIGHT_PANEL.BEARING_STEP}
            min={`${eblMin}`}
            max={`${eblMax}`}
            value={ebl2Input}
            onChange={(event) => applyEbl2(event.target.value)}
            onFocus={() => setActiveField('ebl2')}
            onBlur={() => {
              setActiveField(null);
              setEbl2Input(ebl2Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
            }}
          />
          <div className="vm-ebl-meta">{ANGLE_UNITS.DEGREE}</div>
          <ControlButton className="vm-ebl-flag">{UI_TEXT.EBL_VRM.TRUE_FLAG}</ControlButton>
        </div>
        <div className="vm-ebl-row">
          <ControlButton className="vm-ebl-label">{UI_TEXT.EBL_VRM.VRM2}</ControlButton>
          <GenericInput
            type="number"
            className="vm-ebl-input"
            step={UI_VALUES.RIGHT_PANEL.RANGE_STEP}
            min={`${vrmMin}`}
            max={`${vrmMax}`}
            value={vrm2Input}
            onChange={(event) => applyVrm2(event.target.value)}
            onFocus={() => setActiveField('vrm2')}
            onBlur={() => {
              setActiveField(null);
              setVrm2Input(vrm2Nm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS));
            }}
          />
          <div className="vm-ebl-meta">{LENGTH_UNITS.NAUTICAL_MILES}</div>
          <div className="vm-ebl-flag-empty" />
        </div>
      </div>
    </div>
  );
};
