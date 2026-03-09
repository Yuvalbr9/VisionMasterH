/**
 * Unit symbols and constants used throughout the application
 */

// Angle units
export const ANGLE_UNITS = {
  DEGREE: '°',
  MINUTE: "'",
} as const;

// Speed units
export const SPEED_UNITS = {
  KNOTS: 'kn',
  METERS_PER_SECOND: 'm/s',
  KILOMETERS_PER_HOUR: 'km/h',
} as const;

// Length units
export const LENGTH_UNITS = {
  METERS: 'm',
  FEET: 'ft',
  NAUTICAL_MILES: 'NM',
} as const;

// Direction units
export const DIRECTION_UNITS = {
  NORTH: 'N',
  SOUTH: 'S',
  EAST: 'E',
  WEST: 'W',
} as const;

// Time units
export const TIME_UNITS = {
  HOURS: 'h',
  MINUTES: 'min',
  SECONDS: 's',
} as const;

// Radar specific
export const RADAR_UNITS = {
  RANGE_NM: 'NM',
  BEARING_DEGREES: '°',
} as const;

// Unit type definitions
export type AngleUnit = typeof ANGLE_UNITS[keyof typeof ANGLE_UNITS];
export type SpeedUnit = typeof SPEED_UNITS[keyof typeof SPEED_UNITS];
export type LengthUnit = typeof LENGTH_UNITS[keyof typeof LENGTH_UNITS];
export type DirectionUnit = typeof DIRECTION_UNITS[keyof typeof DIRECTION_UNITS];
export type TimeUnit = typeof TIME_UNITS[keyof typeof TIME_UNITS];
