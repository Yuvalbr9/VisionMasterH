import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Duration, Length } from 'unitsnet-js';
import { ARPATarget, RadarControlState } from '../../types';
import { UI_TEXT, UI_VALUES } from '../../constants';
import { clampEblBearingDeg, formatDurationHms, parseHmsToSeconds } from '../../util';

interface UseMobCardInputsParams {
  radarControls: RadarControlState;
  arpaTargets: ARPATarget[];
  onRadarControlsChange: Dispatch<SetStateAction<RadarControlState>>;
}

interface MobCardInputsState {
  bearingRInput: string;
  bearingTInput: string;
  rangeInput: string;
  elapsedTimeInput: string;
  setRangeInput: Dispatch<SetStateAction<string>>;
  setElapsedTimeInput: Dispatch<SetStateAction<string>>;
  rangeValue: Length;
  elapsedDuration: Duration;
  handleBearingRInputChange: (nextValue: string) => void;
  handleBearingTInputChange: (nextValue: string) => void;
  handleRangeInputChange: (nextValue: string) => void;
  handleElapsedTimeInputChange: (nextValue: string) => void;
  formatElapsedTime: (duration: Duration) => string;
}

const tryParseFiniteNumber = (value: string): number | null => {
  const trimmed = value.trim();

  // Ignore transient input states while the user is still typing.
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

export const useMobCardInputs = ({
  radarControls,
  arpaTargets,
  onRadarControlsChange,
}: UseMobCardInputsParams): MobCardInputsState => {
  const primaryTarget = arpaTargets[0] as ARPATarget | undefined;

  const [bearingRInput, setBearingRInput] = useState(radarControls.ebl1Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  const [bearingTInput, setBearingTInput] = useState(radarControls.ebl2Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  const [rangeInput, setRangeInput] = useState(primaryTarget ? primaryTarget.rangeNm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS) : '');
  const [rangeValue, setRangeValue] = useState(() => Length.FromNauticalMiles(primaryTarget?.rangeNm ?? 0));
  const [elapsedTimeInput, setElapsedTimeInput] = useState<string>(UI_TEXT.RIGHT_PANEL.DEFAULT_HMS);
  const [elapsedDuration, setElapsedDuration] = useState(() => Duration.FromSeconds(UI_VALUES.RIGHT_PANEL.ELAPSED_ZERO_SECONDS));

  useEffect(() => {
    const clampedBearing = clampEblBearingDeg(radarControls.ebl1Deg);
    setBearingRInput(clampedBearing.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  }, [radarControls.ebl1Deg]);

  useEffect(() => {
    const clampedBearing = clampEblBearingDeg(radarControls.ebl2Deg);
    setBearingTInput(clampedBearing.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  }, [radarControls.ebl2Deg]);

  useEffect(() => {
    const nextRangeNm = primaryTarget?.rangeNm;
    if (typeof nextRangeNm === 'number' && Number.isFinite(nextRangeNm)) {
      setRangeValue(Length.FromNauticalMiles(nextRangeNm));
      setRangeInput(nextRangeNm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS));
    }
  }, [primaryTarget?.rangeNm]);

  const handleBearingRInputChange = (nextValue: string) => {
    const parsedValue = tryParseFiniteNumber(nextValue);
    if (parsedValue === null) {
      setBearingRInput(nextValue);
      return;
    }

    const clampedValue = clampEblBearingDeg(parsedValue);
    setBearingRInput(clampedValue === parsedValue ? nextValue : clampedValue.toString());
    onRadarControlsChange((prev) => ({ ...prev, ebl1Deg: clampedValue }));
  };

  const handleBearingTInputChange = (nextValue: string) => {
    const parsedValue = tryParseFiniteNumber(nextValue);
    if (parsedValue === null) {
      setBearingTInput(nextValue);
      return;
    }

    const clampedValue = clampEblBearingDeg(parsedValue);
    setBearingTInput(clampedValue === parsedValue ? nextValue : clampedValue.toString());
    onRadarControlsChange((prev) => ({ ...prev, ebl2Deg: clampedValue }));
  };

  const handleRangeInputChange = (nextValue: string) => {
    setRangeInput(nextValue);
    const parsedValue = tryParseFiniteNumber(nextValue);
    if (parsedValue !== null) {
      setRangeValue(Length.FromNauticalMiles(parsedValue));
    }
  };

  const handleElapsedTimeInputChange = (nextValue: string) => {
    setElapsedTimeInput(nextValue);
    const seconds = parseHmsToSeconds(nextValue);
    if (seconds !== null) {
      setElapsedDuration(Duration.FromSeconds(seconds));
    }
  };

  return {
    bearingRInput,
    bearingTInput,
    rangeInput,
    elapsedTimeInput,
    setRangeInput,
    setElapsedTimeInput,
    rangeValue,
    elapsedDuration,
    handleBearingRInputChange,
    handleBearingTInputChange,
    handleRangeInputChange,
    handleElapsedTimeInputChange,
    formatElapsedTime: formatDurationHms,
  };
};
