import { Angle } from 'unitsnet-js';
import { ANGLE_UNITS, DIRECTION_UNITS } from '../constants';

export type CoordinateKind = 'lat' | 'lon';

const formatDdm = (angle: Angle, degreeWidth: number): string => {
  const degrees = Math.abs(angle.Degrees);
  const wholeDegrees = Math.floor(degrees);
  const minutes = (degrees - wholeDegrees) * 60;
  const degreeText = wholeDegrees.toString().padStart(degreeWidth, '0');
  const minuteText = minutes.toFixed(3).padStart(6, '0');

  return `${degreeText}${ANGLE_UNITS.DEGREE}${minuteText}${ANGLE_UNITS.MINUTE}`;
};

export const formatLatitude = (angle: Angle): string => {
  return formatDdm(angle, 2);
};

export const formatLongitude = (angle: Angle): string => {
  return formatDdm(angle, 3);
};

export const getLatitudeDirection = (angle: Angle): string => {
  return angle.Degrees >= 0 ? DIRECTION_UNITS.NORTH : DIRECTION_UNITS.SOUTH;
};

export const getLongitudeDirection = (angle: Angle): string => {
  return angle.Degrees >= 0 ? DIRECTION_UNITS.EAST : DIRECTION_UNITS.WEST;
};

export const parseLatitude = (str: string): Angle => {
  const input = str.trim();

  const matchWithSymbols = input.match(/(\d+)°(\d+\.?\d*)'?([NS])?/);
  if (matchWithSymbols) {
    const degrees = parseInt(matchWithSymbols[1], 10);
    const minutes = parseFloat(matchWithSymbols[2]);
    const direction = matchWithSymbols[3];

    let decimal = degrees + minutes / 60;
    if (direction === 'S') {
      decimal = -decimal;
    }

    return Angle.FromDegrees(decimal);
  }

  const matchNumeric = input.match(/^(-?)(\d{1,3})(\d{2}\.?\d*)$/);
  if (matchNumeric) {
    const sign = matchNumeric[1];
    const degrees = parseInt(matchNumeric[2], 10);
    const minutes = parseFloat(matchNumeric[3]);

    let decimal = degrees + minutes / 60;
    if (sign === '-') {
      decimal = -decimal;
    }

    return Angle.FromDegrees(decimal);
  }

  const matchDecimal = input.match(/^-?\d+\.?\d*$/);
  if (matchDecimal) {
    return Angle.FromDegrees(parseFloat(input));
  }

  return Angle.FromDegrees(0);
};

export const parseLongitude = (str: string): Angle => {
  const input = str.trim();

  const matchWithSymbols = input.match(/(\d+)°(\d+\.?\d*)'?([EW])?/);
  if (matchWithSymbols) {
    const degrees = parseInt(matchWithSymbols[1], 10);
    const minutes = parseFloat(matchWithSymbols[2]);
    const direction = matchWithSymbols[3];

    let decimal = degrees + minutes / 60;
    if (direction === 'W') {
      decimal = -decimal;
    }

    return Angle.FromDegrees(decimal);
  }

  const matchNumeric = input.match(/^(-?)(\d{1,3})(\d{2}\.?\d*)$/);
  if (matchNumeric) {
    const sign = matchNumeric[1];
    const degrees = parseInt(matchNumeric[2], 10);
    const minutes = parseFloat(matchNumeric[3]);

    let decimal = degrees + minutes / 60;
    if (sign === '-') {
      decimal = -decimal;
    }

    return Angle.FromDegrees(decimal);
  }

  const matchDecimal = input.match(/^-?\d+\.?\d*$/);
  if (matchDecimal) {
    return Angle.FromDegrees(parseFloat(input));
  }

  return Angle.FromDegrees(0);
};

const parseNumericCoordinate = (value: number, kind: CoordinateKind): Angle => {
  const absValue = Math.abs(value);
  const decimalLimit = kind === 'lat' ? 90 : 180;

  if (absValue <= decimalLimit) {
    return Angle.FromDegrees(value);
  }

  const sign = value < 0 ? -1 : 1;
  const degrees = Math.floor(absValue / 100);
  const minutes = absValue - degrees * 100;
  const decimalDegrees = degrees + minutes / 60;

  return Angle.FromDegrees(sign * decimalDegrees);
};

export const parseCoordinate = (value: string | number, kind: CoordinateKind): Angle => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return parseNumericCoordinate(value, kind);
  }

  const coordinate = String(value);

  if (!/[NSEW°']/.test(coordinate)) {
    const numericValue = Number(coordinate);
    if (Number.isFinite(numericValue)) {
      return parseNumericCoordinate(numericValue, kind);
    }
  }

  return kind === 'lat' ? parseLatitude(coordinate) : parseLongitude(coordinate);
};
