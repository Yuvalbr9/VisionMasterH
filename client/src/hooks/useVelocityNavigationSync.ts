import { useEffect } from 'react';
import { Angle, Speed } from 'unitsnet-js';
import { NavigationData } from '../types';
import { calculateCogSogFromVelocity, hasNavigationDeltaAboveTolerance } from '../util';

export const useVelocityNavigationSync = (
  velocity: { vn: number; ve: number },
  navData: NavigationData,
  updateNavData: (updates: Partial<NavigationData>) => void
) => {
  useEffect(() => {
    const { cogDeg: nextCogDeg, sogKn: nextSogKn, velocityIsMeaningful } = calculateCogSogFromVelocity(velocity);

    if (!velocityIsMeaningful) {
      return;
    }

    if (!hasNavigationDeltaAboveTolerance(navData.cog.Degrees, navData.sog.Knots, nextCogDeg, nextSogKn)) {
      return;
    }

    updateNavData({
      cog: Angle.FromDegrees(nextCogDeg),
      sog: Speed.FromKnots(nextSogKn),
    });
  }, [velocity.vn, velocity.ve, navData.cog.Degrees, navData.sog.Knots, updateNavData]);
};
