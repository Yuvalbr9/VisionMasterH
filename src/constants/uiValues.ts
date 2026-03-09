export const UI_VALUES = {
  DATE_TIME: {
    LOCALE: 'en-GB',
    FALLBACK_DATE: '-- --- ----',
    FALLBACK_TIME: '--:--:--',
  },
  SOG: {
    ZERO_TEXT: '0.0',
  },
  DOCKING: {
    ROT_VALUE: '3.0°/min',
    ROT_SCALE: ['30', '20', '10', '0', '10', '20', '30'],
    THRUSTER_COUNT: 8,
    THRUSTER_LEFT: '◀◀',
    THRUSTER_RIGHT: '▶▶',
    THRUSTER_SCALE: ['100%', '0%', '100%'],
    DEFAULT_SPEED: '0.0',
    DEFAULT_CCRP_FA: '6.7',
    DEFAULT_RUDDER: '7.7',
    DEFAULT_RELATIVE_WIND_DIR: '318.4',
    DEFAULT_RELATIVE_WIND_SPEED: '16.1',
    DEFAULT_TRUE_WIND_DIR: '295.0',
    DEFAULT_TRUE_WIND_SPEED: '12.0',
  },
  RADAR_BOTTOM: {
    GAIN_FILL_MATCH: 'Gain',
  },
  RIGHT_PANEL: {
    BEARING_STEP: '0.1',
    RANGE_STEP: '0.01',
    BEARING_DECIMALS: 1,
    RANGE_DECIMALS: 2,
    VECTOR_TIME_DECIMALS: 1,
    RANGE_INTEGER_DECIMALS: 0,
    ELAPSED_ZERO_SECONDS: 0,
  },
  RANGE_CONTROLS: {
    RANGE_STEPS_NM: [0.5, 1, 2, 3, 6, 12, 24, 48, 96],
    BELOW_ONE_DECIMALS: 1,
    DEFAULT_DECIMALS: 0,
    DISPLAY_DECIMALS: 1,
    RANGE_LABEL: 'Range',
    RM: 'RM',
  },
  LEFT_PANEL: {
    POS: 'POS',
    EMPTY_LABEL: '',
  },
  SPEED_DISPLAY: {
    DASHES: '- - -',
  },
} as const;
