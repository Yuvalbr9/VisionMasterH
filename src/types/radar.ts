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
