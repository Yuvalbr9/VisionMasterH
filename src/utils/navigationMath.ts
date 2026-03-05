export interface VelocityComponents {
  vn: number;
  ve: number;
}

export const TWO_PI = Math.PI * 2;

export const normalizeAngleRadians = (angle: number): number => {
  const normalized = angle % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
};

export const radiansToDegrees = (angleRad: number): number => (angleRad * 180) / Math.PI;

export const degreesToRadians = (angleDeg: number): number => (angleDeg * Math.PI) / 180;

export const normalizeAngleDegrees = (angleDeg: number): number => {
  const normalized = angleDeg % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

export const calculateCOGRadians = (velocity: VelocityComponents): number => {
  const cogRad = Math.atan2(velocity.ve, velocity.vn);
  return normalizeAngleRadians(cogRad);
};

export const calculateCOGDegrees = (velocity: VelocityComponents): number => {
  const cogDeg = radiansToDegrees(calculateCOGRadians(velocity));
  return normalizeAngleDegrees(cogDeg);
};

export const calculateSOGKnots = (velocity: VelocityComponents): number => {
  return Math.sqrt(velocity.vn * velocity.vn + velocity.ve * velocity.ve);
};

export const calculateLeewayDegrees = (cogDeg: number, hdgDeg: number): number => {
  return normalizeAngleDegrees(cogDeg - hdgDeg);
};
