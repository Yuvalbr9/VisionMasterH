import React from 'react';
import { divIcon } from 'leaflet';
import { Marker, LayerGroup, Polyline } from 'react-leaflet';
import { RadarMotionMode, RadarOwnShipState, RadarTargetState } from '../../types';
import {
  calculateGeoBearingDeg,
  calculateGeoDistanceMeters,
  calculateTargetVectorEndpoint,
  formatRadarDegrees,
  metersToNauticalMiles,
} from '../../util';
import { RadarPlatformInfoState } from './radarMapTypes';

const TargetCircleIcon = divIcon({
  className: 'radar-target-marker-shell',
  html: '<span class="radar-target-icon" aria-hidden="true"></span>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const AcquiredTargetCircleIcon = divIcon({
  className: 'radar-target-marker-shell is-acquired',
  html: '<span class="radar-target-icon" aria-hidden="true"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

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
            <Marker
              position={[target.latitude, target.longitude]}
              icon={isAcquired ? AcquiredTargetCircleIcon : TargetCircleIcon}
              interactive={true}
              bubblingMouseEvents={false}
              eventHandlers={{
                click: onTargetSelect ? () => onTargetSelect(target.id) : undefined,
                contextmenu: (event) => {
                  event.originalEvent.preventDefault();
                  event.originalEvent.stopPropagation();
                  
                  if (onTargetInfoRequest) {
                    onTargetInfoRequest({
                      x: event.originalEvent.clientX,
                      y: event.originalEvent.clientY,
                      title: target.label,
                      lines: [
                        `${target.latitude.toFixed(4)} / ${target.longitude.toFixed(4)}`,
                        `${target.speedKnots.toFixed(1)} kn CSE ${formatRadarDegrees(target.courseDeg)}`,
                      ],
                    });
                  }
                },
              }}
            />
          </React.Fragment>
        );
      })}
    </LayerGroup>
  );
};