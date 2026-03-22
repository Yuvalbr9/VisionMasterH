import { Angle, Speed, Length } from 'unitsnet-js';

export interface NavigationData {
  hdg: Angle;         // Heading
  stw: Speed;         // Speed Through Water
  sog: Speed;         // Speed Over Ground
  cog: Angle;         // Course Over Ground
  posLat: Angle;      // Position Latitude
  posLon: Angle;      // Position Longitude
  ccrpPS: Length;     // CCRP Port/Starboard
  ccrpFA: Length;     // CCRP Forward/Aft
  stemPS: Length;     // Stem Port/Starboard
}

export interface RadarPoint {
  angle: number; // degrees
  distance: number; // 0-1 normalized
  intensity: number; // 0-1 for fade effect
}

export * from './radar';
export * from './radarMap';

export {
  formatLatitude,
  formatLongitude,
  getLatitudeDirection,
  getLongitudeDirection,
  parseLatitude,
  parseLongitude,
} from '../util/positionUtils';
