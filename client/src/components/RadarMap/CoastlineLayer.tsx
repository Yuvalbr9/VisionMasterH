import React from 'react';
import bboxClip from '@turf/bbox-clip';
import type { BBox, Feature, FeatureCollection, LineString, MultiLineString } from 'geojson';
import { GeoJSON } from 'react-leaflet';
import { mesh } from 'topojson-client';
import land10m from 'world-atlas/land-10m.json';
import { RADAR_COASTLINE_CLIP_REGIONS as RadarCoastlineClipRegions } from '../../util';

interface WorldAtlasLandTopology {
  objects: {
    land: unknown;
  };
}

type CoastlineGeometry = LineString | MultiLineString;

const coastlineClipBoxes: readonly BBox[] = RadarCoastlineClipRegions.map((region) => ([
  region.minLongitude,
  region.minLatitude,
  region.maxLongitude,
  region.maxLatitude,
])) as readonly BBox[];

const worldCoastlineFeature: Feature<CoastlineGeometry> = {
  type: 'Feature',
  properties: {},
  geometry: (mesh as unknown as (topology: unknown, object: unknown) => CoastlineGeometry)(
  land10m,
  (land10m as WorldAtlasLandTopology).objects.land
) as CoastlineGeometry,
};

const coastlineData: FeatureCollection<CoastlineGeometry> = {
  type: 'FeatureCollection',
  features: coastlineClipBoxes.map((clipBox) => {
    return bboxClip(worldCoastlineFeature, clipBox) as Feature<CoastlineGeometry>;
  }),
};

export const CoastlineLayer: React.FC = () => {
  return (
    <GeoJSON
      data={coastlineData}
      style={() => ({
        color: 'rgba(255, 226, 123, 0.96)',
        weight: 1.2,
        opacity: 1,
        fill: false,
      })}
      interactive={false}
    />
  );
};