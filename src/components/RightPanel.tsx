import React, { useEffect, useState } from 'react';
import { Angle, Duration, Length } from 'unitsnet-js';
import { ARPATarget, RadarControlState } from '../types';
import { UI_TEXT, UI_VALUES } from '../constants';
import { BottomCornerEblVrm } from './RightPanel/BottomCornerEblVrm';
import { TopControlsSection } from './RightPanel/TopControlsSection';
import { MobCardSection } from './RightPanel/MobCardSection';
import { GreenPanelSection } from './RightPanel/GreenPanelSection';

interface RightPanelProps {
  radarControls: RadarControlState;
  onRadarControlsChange: React.Dispatch<React.SetStateAction<RadarControlState>>;
  velocity: { vn: number; ve: number };
  onVelocityChange: React.Dispatch<React.SetStateAction<{ vn: number; ve: number }>>;
  leewayDeg: number;
  arpaTargets: ARPATarget[];
}

export const RightPanel: React.FC<RightPanelProps> = ({
  radarControls,
  onRadarControlsChange,
  arpaTargets,
}) => {
  const modeLabel = radarControls.northUp ? UI_TEXT.RIGHT_PANEL.MODE_N_UP : UI_TEXT.RIGHT_PANEL.MODE_HEAD_UP;
  const trailsLabel = radarControls.trailsOn ? UI_TEXT.RIGHT_PANEL.TRAILS_ON : UI_TEXT.RIGHT_PANEL.TRAILS_OFF;
  const aisLabel = radarControls.aisOn ? UI_TEXT.RIGHT_PANEL.AIS_ON : UI_TEXT.RIGHT_PANEL.AIS_OFF;
  const chartsLabel = radarControls.chartOverlayOn ? UI_TEXT.RIGHT_PANEL.CHARTS_ON : UI_TEXT.RIGHT_PANEL.CHARTS_OFF;

  const primaryTarget = arpaTargets[0] as ARPATarget | undefined;
  const [bearingRInput, setBearingRInput] = useState(radarControls.ebl1Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  const [bearingTInput, setBearingTInput] = useState(radarControls.ebl2Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  const [rangeInput, setRangeInput] = useState(primaryTarget ? primaryTarget.rangeNm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS) : '');
  const [rangeValue, setRangeValue] = useState(() => Length.FromNauticalMiles(primaryTarget?.rangeNm ?? 0));
  const [elapsedTimeInput, setElapsedTimeInput] = useState<string>(UI_TEXT.RIGHT_PANEL.DEFAULT_HMS);
  const [elapsedDuration, setElapsedDuration] = useState(() => Duration.FromSeconds(UI_VALUES.RIGHT_PANEL.ELAPSED_ZERO_SECONDS));

  useEffect(() => {
    setBearingRInput(radarControls.ebl1Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  }, [radarControls.ebl1Deg]);

  useEffect(() => {
    setBearingTInput(radarControls.ebl2Deg.toFixed(UI_VALUES.RIGHT_PANEL.BEARING_DECIMALS));
  }, [radarControls.ebl2Deg]);

  useEffect(() => {
    const nextRangeNm = primaryTarget?.rangeNm;
    if (typeof nextRangeNm === 'number' && Number.isFinite(nextRangeNm)) {
      setRangeValue(Length.FromNauticalMiles(nextRangeNm));
      setRangeInput(nextRangeNm.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS));
    }
  }, [primaryTarget?.rangeNm]);

  const parseDurationToSeconds = (value: string): number | null => {
    const match = value.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
    if (!match) {
      return null;
    }

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    const seconds = Number(match[3]);

    if (minutes > 59 || seconds > 59) {
      return null;
    }

    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatDurationHms = (duration: Duration): string => {
    const totalSeconds = Math.max(0, Math.floor(duration.Seconds));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const toggleMode = () => {
    onRadarControlsChange((prev) => ({ ...prev, northUp: !prev.northUp }));
  };

  const toggleTrails = () => {
    onRadarControlsChange((prev) => ({ ...prev, trailsOn: !prev.trailsOn }));
  };

  const toggleAis = () => {
    onRadarControlsChange((prev) => ({ ...prev, aisOn: !prev.aisOn }));
  };

  const toggleCharts = () => {
    onRadarControlsChange((prev) => ({ ...prev, chartOverlayOn: !prev.chartOverlayOn }));
  };

  const handleBearingRInputChange = (nextValue: string) => {
    setBearingRInput(nextValue);
    const parsedValue = Number(nextValue);
    if (Number.isFinite(parsedValue)) {
      const angle = Angle.FromDegrees(parsedValue);
      onRadarControlsChange((prev) => ({ ...prev, ebl1Deg: angle.Degrees }));
    }
  };

  const handleBearingTInputChange = (nextValue: string) => {
    setBearingTInput(nextValue);
    const parsedValue = Number(nextValue);
    if (Number.isFinite(parsedValue)) {
      const angle = Angle.FromDegrees(parsedValue);
      onRadarControlsChange((prev) => ({ ...prev, ebl2Deg: angle.Degrees }));
    }
  };

  const handleRangeInputChange = (nextValue: string) => {
    setRangeInput(nextValue);
    const parsedValue = Number(nextValue);
    if (Number.isFinite(parsedValue)) {
      setRangeValue(Length.FromNauticalMiles(parsedValue));
    }
  };

  const handleElapsedTimeInputChange = (nextValue: string) => {
    setElapsedTimeInput(nextValue);
    const seconds = parseDurationToSeconds(nextValue);
    if (seconds !== null) {
      setElapsedDuration(Duration.FromSeconds(seconds));
    }
  };

  return (
    <>
        <div className="right-panel vm-right-panel">
      <TopControlsSection
        modeLabel={modeLabel}
        trailsLabel={trailsLabel}
        aisLabel={aisLabel}
        chartsLabel={chartsLabel}
        radarControls={radarControls}
        onToggleMode={toggleMode}
        onToggleTrails={toggleTrails}
        onToggleAis={toggleAis}
        onToggleCharts={toggleCharts}
        />

      <MobCardSection
        bearingRInput={bearingRInput}
        bearingTInput={bearingTInput}
        rangeInput={rangeInput}
        elapsedTimeInput={elapsedTimeInput}
        onBearingRInputChange={handleBearingRInputChange}
        onBearingTInputChange={handleBearingTInputChange}
        onRangeInputChange={handleRangeInputChange}
        onRangeInputBlur={() => setRangeInput(rangeValue.NauticalMiles.toFixed(UI_VALUES.RIGHT_PANEL.RANGE_DECIMALS))}
        onElapsedTimeInputChange={handleElapsedTimeInputChange}
        onElapsedTimeInputBlur={() => setElapsedTimeInput(formatDurationHms(elapsedDuration))}
        />

      <GreenPanelSection />

      <BottomCornerEblVrm radarControls={radarControls} />
    </div>
        </>
  );
};
