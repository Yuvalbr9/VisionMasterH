import React from 'react';
import { RadarOwnShipState, RadarTargetState } from '../types';
import { advanceGeoPosition } from '../util';

interface RadarSimulationState {
  ownShip: RadarOwnShipState;
  targets: RadarTargetState[];
}

interface UseRadarSimulationArgs {
  ownShip: RadarOwnShipState;
  targets: RadarTargetState[];
}

/**
 * Runs the maritime surface picture on requestAnimationFrame for smooth radar motion.
 */
export const useRadarSimulation = ({ ownShip, targets }: UseRadarSimulationArgs): RadarSimulationState => {
  const [simulationState, setSimulationState] = React.useState<RadarSimulationState>({ ownShip, targets });

  React.useEffect(() => {
    setSimulationState({ ownShip, targets });
  }, [ownShip, targets]);

  React.useEffect(() => {
    let frameId = 0;
    let previousTimestamp: number | null = null;

    const animate = (timestamp: number) => {
      if (previousTimestamp === null) {
        previousTimestamp = timestamp;
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      const elapsedSeconds = Math.min((timestamp - previousTimestamp) / 1000, 0.25);
      previousTimestamp = timestamp;

      setSimulationState((previousState) => ({
        ownShip: {
          ...previousState.ownShip,
          ...advanceGeoPosition(
            previousState.ownShip,
            previousState.ownShip.speedKnots,
            previousState.ownShip.courseDeg,
            elapsedSeconds
          ),
        },
        targets: previousState.targets.map((target) => ({
          ...target,
          ...advanceGeoPosition(target, target.speedKnots, target.courseDeg, elapsedSeconds),
        })),
      }));

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return simulationState;
};