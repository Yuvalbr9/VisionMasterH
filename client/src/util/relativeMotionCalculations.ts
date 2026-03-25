import { normalizeBearing } from './bearingUtils';

export interface VelocityComponents {
  vx: number;
  vy: number;
}

/**
 * Pure functions strictly for UI-level relative projection logic.
 * Handles Relative Motion (RM) vs True Motion vector math on the canvas.
 */

/**
 * Decomposes a target's or ownship's velocity into X/Y axis components based on its course.
 * @param velocity Speed vector magnitude (e.g., SOG in knots).
 * @param courseDeg Course vector direction in degrees.
 */
export const decomposeVelocity = (velocity: number, courseDeg: number): VelocityComponents => {
  const courseRad = (courseDeg * Math.PI) / 180;
  return {
    vx: velocity * Math.sin(courseRad),
    vy: velocity * Math.cos(courseRad),
  };
};

/**
 * Calculates the relative velocity vectors between a target and own ship.
 */
export const calculateRelativeVelocity = (
  vTarget: VelocityComponents,
  vOwn: VelocityComponents
): VelocityComponents => {
  return {
    vx: vTarget.vx - vOwn.vx,
    vy: vTarget.vy - vOwn.vy,
  };
};

/**
 * Calculates the final relative speed (magnitude of the relative velocity vector).
 */
export const calculateRelativeSpeed = (vxRel: number, vyRel: number): number => {
  return Math.hypot(vxRel, vyRel); // Equivalent to sqrt(vxRel^2 + vyRel^2)
};

/**
 * Calculates the relative course based on the relative X/Y velocity vectors.
 * Returns normalized heading 0-360.
 */
export const calculateRelativeCourse = (vxRel: number, vyRel: number): number => {
  return normalizeBearing((Math.atan2(vxRel, vyRel) * 180) / Math.PI);
};
