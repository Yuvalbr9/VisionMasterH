export type EblVrmMode = 'carried-origin' | 'dropped-origin' | 'dropped-end' | 'carried-end';

export interface RadarControlState {
  northUp: boolean;
  selectedRangeNm: number;
  trailsOn: boolean;
  vectorTimeMin: number;
  aisOn: boolean;
  chartOverlayOn: boolean;
  ebl1Deg: number;
  ebl2Deg: number;
  vrm1Nm: number;
  vrm2Nm: number;
  ebl1On: boolean;
  ebl2On: boolean;
  vrm1On: boolean;
  vrm2On: boolean;
  ebl2Mode: EblVrmMode;
  vrm2Mode: EblVrmMode;
  ebl2Origin?: { latitude: number; longitude: number };
  ebl2EndPoint?: { latitude: number; longitude: number };
}

export interface ARPATarget {
  id: string;
  bearingDeg: number;
  rangeNm: number;
  courseDeg: number;
  speedKn: number;
  history: Array<{ bearingDeg: number; rangeNm: number }>;
  cpaNm: number;
  tcpaMin: number;
}

export interface RadarSelectedPoint {
  bearingDeg: number;
  rangeNm: number;
}
