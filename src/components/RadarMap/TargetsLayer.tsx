import React from 'react';
import { CircleMarker, LayerGroup, Polyline } from 'react-leaflet';
import { RadarMotionMode, RadarOwnShipState, RadarTargetState } from '../../types';
import {
  calculateGeoBearingDeg,
  calculateGeoDistanceMeters,
  calculateTargetVectorEndpoint,
  formatRadarDegrees,
  metersToNauticalMiles,
} from '../../util';
import { RadarPlatformInfoState } from './radarMapTypes';

interface TargetsLayerProps {
  targets: RadarTargetState[];
  ownShip: RadarOwnShipState;
  motionMode: RadarMotionMode;
  vectorTimeMinutes: number;
  visibleRangeNm: number;
  acquiredTargetId: string | null;
  onTargetSelect?: (targetId: string) => void;
  onTargetInfoRequest?: (info: RadarPlatformInfoState) => void;
}

export const TargetsLayer: React.FC<TargetsLayerProps> = ({
  targets,
  ownShip,
  motionMode,
  vectorTimeMinutes,
  visibleRangeNm,
  acquiredTargetId,
  onTargetSelect,
  onTargetInfoRequest,
}) => {
  return (
    <LayerGroup>
      {targets.map((target) => {
        const rangeNm = metersToNauticalMiles(calculateGeoDistanceMeters(ownShip, target));

        if (rangeNm > visibleRangeNm) {
          return null;
        }

        const bearingDeg = calculateGeoBearingDeg(ownShip, target);
        const isAcquired = target.id === acquiredTargetId;
        const targetVector = vectorTimeMinutes > 0
          ? calculateTargetVectorEndpoint(target, ownShip, motionMode, vectorTimeMinutes)
          : null;

        return (
          <React.Fragment key={target.id}>
            {targetVector && (
              <Polyline
                positions={[
                  [target.latitude, target.longitude],
                  [targetVector.endpoint.latitude, targetVector.endpoint.longitude],
                ]}
                pathOptions={{
                  color: isAcquired ? 'rgba(255, 236, 150, 0.95)' : 'rgba(255, 227, 106, 0.72)',
                  weight: isAcquired ? 2 : 1.2,
                  opacity: 0.9,
                }}
                interactive={false}
              />
            )}
            <CircleMarker
              center={[target.latitude, target.longitude]}
              radius={isAcquired ? 8 : 6}
              pathOptions={{
                color: '#ffe36a',
                weight: isAcquired ? 3 : 2,
                fillColor: 'transparent',
                fillOpacity: 0,
              }}
              eventHandlers={{
                ...(onTargetSelect ? { click: () => onTargetSelect(target.id) } : {}),
                ...(onTargetInfoRequest ? {
                  contextmenu: (event) => {
                    event.originalEvent.preventDefault();
                    event.originalEvent.stopPropagation();
                    onTargetInfoRequest({
                      x: event.originalEvent.clientX,
                      y: event.originalEvent.clientY,
                      title: target.label,
                      subtitle: 'Target Preview',
                      variant: 'target-preview',
                      lines: [
                        `LAT ${target.latitude.toFixed(4)}  LON ${target.longitude.toFixed(4)}`,
                        `BRG ${formatRadarDegrees(bearingDeg)} RNG ${rangeNm.toFixed(2)} NM`,
                        `SPD ${target.speedKnots.toFixed(1)} kn CSE ${formatRadarDegrees(target.courseDeg)}`,
                      ],
                    });
                  },
                } : {}),
              }}
            />
          </React.Fragment>
        );
      })}
    </LayerGroup>
  );
};