/**
 * Color Constants for the Application
 * Centralized color definitions used across TypeScript/React components
 */

/* ===== PRIMARY COLORS ===== */
export const COLORS = {
  /* Accents - Used in components */
  GREEN: '#00ff00',
  YELLOW: '#ffcc00',

  /* Text - Used in components */
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#a0aec0',
} as const;

/* ===== DATA DISPLAY COLORS ===== */
export const DATA_COLORS = {
  VALUE: COLORS.GREEN,
  STATUS: COLORS.GREEN,
  LABEL: COLORS.TEXT_SECONDARY,
  UNIT: COLORS.TEXT_SECONDARY,
} as const;

/* ===== SEMANTIC COLORS WITH TRANSPARENCY ===== */
export const TRANSPARENT_COLORS = {
  GREEN_GLOW_DARK: 'rgba(0, 255, 0, 0.1)',
  GREEN_GLOW_MEDIUM: 'rgba(0, 255, 0, 0.3)',
  GREEN_GLOW_LIGHT: 'rgba(0, 255, 0, 0.4)',
  GREEN_GLOW_BRIGHT: 'rgba(0, 255, 0, 0.5)',
  GREEN_GLOW_FULL: 'rgba(0, 255, 0, 0.6)',
  OVERLAY_DARK_LIGHT: 'rgba(0, 0, 0, 0.3)',
  OVERLAY_DARK_MEDIUM: 'rgba(0, 0, 0, 0.5)',
  HOVER_GLOW: 'rgba(100, 160, 180, 0.3)',
} as const;
