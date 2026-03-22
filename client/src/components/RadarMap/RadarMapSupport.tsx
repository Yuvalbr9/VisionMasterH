import React from 'react';
import { createPortal } from 'react-dom';
import { useMap, useMapEvents } from 'react-leaflet';
import { BaseButton } from '../Buttons';
import { calculateGeoDistanceMeters } from '../../util';
import {
  LeafletMaxZoom,
  LeafletMinZoom,
  RadarCenterUpdateThresholdMeters,
  RadarZoomLevels,
} from './radarMapConstants';
import { getLeafletZoomForRange, getNearestRadarZoomLevelIndex, setRadarView } from './radarMapUtils';
import { RadarContextMenuState, RadarFrameSize } from './radarMapTypes';
import { RadarGeoPosition } from '../../types';

interface RadarViewportControllerProps {
  center: RadarGeoPosition;
  rangeNm: number;
  frameSize: RadarFrameSize;
}

interface RadarZoomControlsProps {
  rangeNm: number;
  ownShipPosition: RadarGeoPosition;
  onRangeChange?: (nextRangeNm: number) => void;
  onRecenterOwnShip: () => void;
}

interface RadarMapEventsProps {
  onContextMenu: (menuState: RadarContextMenuState) => void;
  onMapInteraction: () => void;
  onViewportDragged: (nextCenter: RadarGeoPosition) => void;
}

export const RadarViewportController: React.FC<RadarViewportControllerProps> = ({
  center,
  rangeNm,
  frameSize,
}) => {
  const map = useMap();
  const previousRangeRef = React.useRef<number | null>(null);
  const previousSizeKeyRef = React.useRef('');

  React.useEffect(() => {
    if (frameSize.width <= 0 || frameSize.height <= 0) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      map.invalidateSize(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [frameSize.height, frameSize.width, map]);

  React.useEffect(() => {
    map.dragging.enable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  }, [map]);

  React.useEffect(() => {
    if (frameSize.width <= 0 || frameSize.height <= 0) {
      return;
    }

    const sizeKey = `${Math.round(frameSize.width)}:${Math.round(frameSize.height)}`;
    const frameId = window.requestAnimationFrame(() => {
      const sizeChanged = previousSizeKeyRef.current !== sizeKey;
      const rangeChanged = previousRangeRef.current === null || previousRangeRef.current !== rangeNm;
      const zoomChanged = map.getZoom() !== getLeafletZoomForRange(rangeNm);
      const mapCenter = map.getCenter();
      const centerOffsetMeters = calculateGeoDistanceMeters(
        { latitude: mapCenter.lat, longitude: mapCenter.lng },
        center
      );
      const centerChanged = centerOffsetMeters > RadarCenterUpdateThresholdMeters;

      if (sizeChanged || rangeChanged || zoomChanged) {
        setRadarView(map, center, rangeNm, rangeChanged && !sizeChanged);
      } else if (centerChanged) {
        map.panTo([center.latitude, center.longitude], { animate: false });
      }

      previousRangeRef.current = rangeNm;
      previousSizeKeyRef.current = sizeKey;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [center, frameSize.height, frameSize.width, map, rangeNm]);

  return null;
};

export const RadarZoomControls: React.FC<RadarZoomControlsProps> = ({
  rangeNm,
  ownShipPosition,
  onRangeChange,
  onRecenterOwnShip,
}) => {
  const map = useMap();
  const currentZoomLevelIndex = React.useMemo(() => getNearestRadarZoomLevelIndex(rangeNm), [rangeNm]);

  const handleZoomToRange = React.useCallback((offset: -1 | 1) => {
    if (!onRangeChange) {
      return;
    }

    const nextIndex = Math.min(
      RadarZoomLevels.length - 1,
      Math.max(0, currentZoomLevelIndex + offset)
    );

    if (nextIndex === currentZoomLevelIndex) {
      return;
    }

    const nextZoomLevel = RadarZoomLevels[nextIndex];

    onRecenterOwnShip();
    map.setView([ownShipPosition.latitude, ownShipPosition.longitude], nextZoomLevel.zoom, { animate: false });
    onRangeChange(nextZoomLevel.rangeNm);
  }, [currentZoomLevelIndex, map, onRangeChange, onRecenterOwnShip, ownShipPosition.latitude, ownShipPosition.longitude]);

  return createPortal(
    <div
      className="radar-map-zoom-controls"
      onClick={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <BaseButton
        className="radar-map-zoom-btn control-btn"
        onClick={() => handleZoomToRange(-1)}
        disabled={currentZoomLevelIndex <= 0}
        title="Zoom in"
        aria-label="Zoom in"
      >
        Zoom In
      </BaseButton>
      <BaseButton
        className="radar-map-zoom-btn control-btn"
        onClick={() => handleZoomToRange(1)}
        disabled={currentZoomLevelIndex >= RadarZoomLevels.length - 1}
        title="Zoom out"
        aria-label="Zoom out"
      >
        Zoom Out
      </BaseButton>
    </div>,
    map.getContainer()
  );
};

export const RadarMapEvents: React.FC<RadarMapEventsProps> = ({
  onContextMenu,
  onMapInteraction,
  onViewportDragged,
}) => {
  const map = useMapEvents({
    click() {
      onMapInteraction();
    },
    dragstart() {
      onMapInteraction();
    },
    dragend() {
      const currentCenter = map.getCenter();

      onViewportDragged({
        latitude: currentCenter.lat,
        longitude: currentCenter.lng,
      });
    },
    contextmenu(event) {
      event.originalEvent.preventDefault();
      onContextMenu({
        x: event.originalEvent.clientX,
        y: event.originalEvent.clientY,
        position: {
          latitude: event.latlng.lat,
          longitude: event.latlng.lng,
        },
      });
    },
  });

  return null;
};

export const RadarMapLimits = {
  minZoom: LeafletMinZoom,
  maxZoom: LeafletMaxZoom,
};