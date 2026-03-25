import { ARPATarget, NavigationData, RadarControlState } from '../../types';

export interface RadarDrawContext {
  ctx: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  maxRadiusPx: number;
  navData: NavigationData;
  controls: RadarControlState;
  arpaTargets: ARPATarget[];
}

export { normalizeBearing } from '../../util/bearingUtils';
export {
  degreesToCanvasRadians,
  toDisplayBearing,
  fromDisplayBearing,
  polarToCanvas,
  rangeNmToPixels,
} from '../../util/radarCalculations';
