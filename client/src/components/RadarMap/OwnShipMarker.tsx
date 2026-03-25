import React from 'react';
import { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';
import { RadarOwnShipState } from '../../types';
import { formatRadarDegrees } from '../../util';
import { RadarPlatformInfoState } from './radarMapTypes';

const OwnShipIcon = divIcon({
  className: 'radar-own-ship-marker-shell',
  html: '<span class="radar-own-ship-icon" aria-hidden="true"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface OwnShipMarkerProps {
  ship: RadarOwnShipState;
  onInfoRequest?: (info: RadarPlatformInfoState) => void;
}

export const OwnShipMarker: React.FC<OwnShipMarkerProps> = ({ ship, onInfoRequest }) => {
  return (
    <Marker
      position={[ship.latitude, ship.longitude]}
      icon={OwnShipIcon}
      keyboard={false}
      eventHandlers={onInfoRequest ? {
        contextmenu: (event) => {
          event.originalEvent.preventDefault();
          event.originalEvent.stopPropagation();
          onInfoRequest({
            x: event.originalEvent.clientX,
            y: event.originalEvent.clientY,
            title: ship.label ?? 'Own Ship',
            lines: [
              `${ship.latitude.toFixed(4)} / ${ship.longitude.toFixed(4)}`,
              `${ship.speedKnots.toFixed(1)} kn CSE ${formatRadarDegrees(ship.courseDeg)}`,
            ],
          });
        },
      } : undefined}
    />
  );
};