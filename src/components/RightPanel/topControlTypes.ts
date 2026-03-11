import { RadarControlState } from '../../types';

export interface MainTopControlsProps {
  trailsLabel: string;
  aisLabel: string;
  chartsLabel: string;
  radarPointPickerActive: boolean;
  radarControls: RadarControlState;
  onToggleTrails: () => void;
  onToggleAis: () => void;
  onToggleCharts: () => void;
  onOpenRadarPointPicker: () => void;
}

export interface SideStackControlsProps {
  modeLabel: string;
  radarControls: RadarControlState;
  onToggleMode: () => void;
  onDecreaseRange: () => void;
  onIncreaseRange: () => void;
  canDecreaseRange: boolean;
  canIncreaseRange: boolean;
}

export interface RightPanelTopSectionProps extends MainTopControlsProps, SideStackControlsProps {}
