import { useState, useCallback, useEffect, useMemo } from 'react';
import { Angle, Speed, Length } from 'unitsnet-js';
import { NavigationData } from '../types';
import {
    calculateCogSogFromVelocity,
    calculateLeewayDeg,
    hasNavigationDeltaAboveTolerance,
    parseLatitude,
    parseLongitude,
} from '../util';

const defaultVelocity = { vn: 0, ve: 0 };

export const useRadarNavigation = () => {
    const [navData, setNavData] = useState<NavigationData>({
        hdg: Angle.FromDegrees(200.0),
        stw: Speed.FromKnots(10.8),
        sog: Speed.FromKnots(10.8),
        cog: Angle.FromDegrees(289.0),
        posLat: parseLatitude("40°27.269'N"),
        posLon: parseLongitude("73°49.490'W"),
        ccrpPS: Length.FromMeters(0.0),
        ccrpFA: Length.FromMeters(0.0),
        stemPS: Length.FromMeters(0.0),
    });

    const velocity = defaultVelocity;

    const updateNavData = useCallback((updates: Partial<NavigationData>) => {
        setNavData(prev => ({ ...prev, ...updates }));
    }, []);

    useEffect(() => {
        const { cogDeg: nextCogDeg, sogKn: nextSogKn, velocityIsMeaningful } = calculateCogSogFromVelocity(velocity);

        if (!velocityIsMeaningful) {
            return;
        }

        if (!hasNavigationDeltaAboveTolerance(navData.cog.Degrees, navData.sog.Knots, nextCogDeg, nextSogKn)) {
            return;
        }

        setNavData((prev) => ({
            ...prev,
            cog: Angle.FromDegrees(nextCogDeg),
            sog: Speed.FromKnots(nextSogKn),
        }));
    }, [velocity.vn, velocity.ve, navData.cog.Degrees, navData.sog.Knots]);

    const leewayDeg = useMemo(
        () => calculateLeewayDeg(navData.cog.Degrees, navData.hdg.Degrees),
        [navData.cog.Degrees, navData.hdg.Degrees]
    );

    return {
        navData,
        updateNavData,
        leewayDeg,
    };
};
