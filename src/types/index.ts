import { Angle, Speed, Length } from 'unitsnet-js';
import { ANGLE_UNITS, DIRECTION_UNITS } from '../constants';

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

// Helper functions for position formatting
export const formatLatitude = (angle: Angle): string => {
  const degrees = Math.abs(angle.Degrees);
  const wholeDegrees = Math.floor(degrees);
  const minutes = (degrees - wholeDegrees) * 60;
  return `${wholeDegrees}${ANGLE_UNITS.DEGREE}${minutes.toFixed(3)}${ANGLE_UNITS.MINUTE}`;
};

export const formatLongitude = (angle: Angle): string => {
  const degrees = Math.abs(angle.Degrees);
  const wholeDegrees = Math.floor(degrees);
  const minutes = (degrees - wholeDegrees) * 60;
  return `${wholeDegrees}${ANGLE_UNITS.DEGREE}${minutes.toFixed(3)}${ANGLE_UNITS.MINUTE}`;
};

export const getLatitudeDirection = (angle: Angle): string => {
  return angle.Degrees >= 0 ? DIRECTION_UNITS.NORTH : DIRECTION_UNITS.SOUTH;
};

export const getLongitudeDirection = (angle: Angle): string => {
  return angle.Degrees >= 0 ? DIRECTION_UNITS.EAST : DIRECTION_UNITS.WEST;
};

export const parseLatitude = (str: string): Angle => {
  // Remove any whitespace
  str = str.trim();
  
  // Parse format like "40°27.269'N" or "40°27.269'"
  const matchWithSymbols = str.match(/(\d+)°(\d+\.?\d*)'?([NS])?/);
  if (matchWithSymbols) {
    const degrees = parseInt(matchWithSymbols[1]);
    const minutes = parseFloat(matchWithSymbols[2]);
    const direction = matchWithSymbols[3];
    
    let decimal = degrees + minutes / 60;
    if (direction === 'S') decimal = -decimal;
    
    return Angle.FromDegrees(decimal);
  }
  
  // Parse simple numeric format like "4027.269" (DDMM.MMM)
  const matchNumeric = str.match(/^(-?)(\d{1,3})(\d{2}\.?\d*)$/);
  if (matchNumeric) {
    const sign = matchNumeric[1];
    const degrees = parseInt(matchNumeric[2]);
    const minutes = parseFloat(matchNumeric[3]);
    
    let decimal = degrees + minutes / 60;
    if (sign === '-') decimal = -decimal;
    
    return Angle.FromDegrees(decimal);
  }
  
  // Parse decimal degrees like "40.456"
  const matchDecimal = str.match(/^-?\d+\.?\d*$/);
  if (matchDecimal) {
    return Angle.FromDegrees(parseFloat(str));
  }
  
  return Angle.FromDegrees(0);
};

export const parseLongitude = (str: string): Angle => {
  // Remove any whitespace
  str = str.trim();
  
  // Parse format like "73°49.490'W" or "73°49.490'"
  const matchWithSymbols = str.match(/(\d+)°(\d+\.?\d*)'?([EW])?/);
  if (matchWithSymbols) {
    const degrees = parseInt(matchWithSymbols[1]);
    const minutes = parseFloat(matchWithSymbols[2]);
    const direction = matchWithSymbols[3];
    
    let decimal = degrees + minutes / 60;
    if (direction === 'W') decimal = -decimal;
    
    return Angle.FromDegrees(decimal);
  }
  
  // Parse simple numeric format like "7349.490" (DDDMM.MMM)
  const matchNumeric = str.match(/^(-?)(\d{1,3})(\d{2}\.?\d*)$/);
  if (matchNumeric) {
    const sign = matchNumeric[1];
    const degrees = parseInt(matchNumeric[2]);
    const minutes = parseFloat(matchNumeric[3]);
    
    let decimal = degrees + minutes / 60;
    if (sign === '-') decimal = -decimal;
    
    return Angle.FromDegrees(decimal);
  }
  
  // Parse decimal degrees like "73.824"
  const matchDecimal = str.match(/^-?\d+\.?\d*$/);
  if (matchDecimal) {
    return Angle.FromDegrees(parseFloat(str));
  }
  
  return Angle.FromDegrees(0);
};
