import React from 'react';
import { CircleMarker, LayerGroup } from 'react-leaflet';
import { RadarAnnotationPoint } from '../../types';

interface RadarAnnotationsLayerProps {
  penPoints: RadarAnnotationPoint[];
  goToPoint: RadarAnnotationPoint | null;
}

const penMarkerStyle = {
  color: 'rgba(120, 255, 174, 0.9)',
  weight: 1.3,
  fillColor: 'rgba(120, 255, 174, 0.28)',
  fillOpacity: 0.8,
};

const goToMarkerStyle = {
  color: 'rgba(255, 227, 106, 0.96)',
  weight: 2,
  fillColor: 'rgba(255, 227, 106, 0.18)',
  fillOpacity: 0.85,
};

export const RadarAnnotationsLayer: React.FC<RadarAnnotationsLayerProps> = ({
  penPoints,
  goToPoint,
}) => {
  return (
    <LayerGroup>
      {penPoints.map((point) => (
        <CircleMarker
          key={point.id}
          center={[point.latitude, point.longitude]}
          radius={3}
          pathOptions={penMarkerStyle}
          interactive={false}
        />
      ))}
      {goToPoint && (
        <CircleMarker
          center={[goToPoint.latitude, goToPoint.longitude]}
          radius={6}
          pathOptions={goToMarkerStyle}
          interactive={false}
        />
      )}
    </LayerGroup>
  );
};