import React from 'react';
import L from 'leaflet';
import { MapContainer } from 'react-leaflet';
import { useRadarSimulation } from '../../hooks/useRadarSimulation';
import {
  RadarAnnotationPoint,
  RadarGeoPosition,
  RadarMotionMode,
  RadarOrientationMode,
  RadarOwnShipState,
  RadarTargetState,
} from '../../types';
import {
  calculateGeoBearingDeg,
  calculateGeoDistanceMeters,
  clampVrmRangeNm,
  metersToNauticalMiles,
} from '../../util';
import { CoastlineLayer } from './CoastlineLayer';
import { DegreeTicks } from './DegreeTicks';
import { EBL } from './EBL';
import { HeadingLine } from './HeadingLine';
import { OwnShipMarker } from './OwnShipMarker';
import { RadarAnnotationsLayer } from './RadarAnnotationsLayer';
import { RadarGrid } from './RadarGrid';
import { RadarMapEvents, RadarMapLimits, RadarViewportController, RadarZoomControls } from './RadarMapSupport';
import { RadarPortalOverlays } from './RadarPortalOverlays';
import { TargetsLayer } from './TargetsLayer';
import {
  RadarMapBounds,
  RadarScaleBandPx,
  RadarScaleEdgeInsetPx,
  RangeWheelDeltaThreshold,
  TargetAcquisitionGateMeters,
  type RadarContextMenuAction,
} from './radarMapConstants';
import { createRadarAnnotationId, getSteppedRadarRange, isPointWithinRadarCircle } from './radarMapUtils';
import { useRadarFrameSize } from './useRadarFrameSize';
import { useRadarPanels } from './useRadarPanels';

interface RadarMapProps {
  ownShip: RadarOwnShipState;
  targets: RadarTargetState[];
  rangeNm?: number;
  onRangeChange?: (nextRangeNm: number) => void;
  orientationMode?: RadarOrientationMode;
  motionMode: RadarMotionMode;
  vectorTimeMinutes?: number;
  ebl1Deg?: number;
  ebl2Deg?: number;
  vrm1Nm?: number;
  vrm2Nm?: number;
}

export const RadarMap: React.FC<RadarMapProps> = ({
  ownShip,
  targets,
  rangeNm = 12,
  onRangeChange,
  orientationMode = 'north-up',
  motionMode,
  vectorTimeMinutes = 6,
  ebl1Deg = 0,
  ebl2Deg = 90,
  vrm1Nm = 0,
  vrm2Nm = 0,
}) => {
  const overlayClipPathId = React.useId().replace(/:/g, '-');
  const mapRef = React.useRef<L.Map | null>(null);
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  const wheelDeltaAccumulatorRef = React.useRef(0);
  const frameSize = useRadarFrameSize(frameRef);
  const [trueMotionCenter, setTrueMotionCenter] = React.useState<RadarGeoPosition>({
    latitude: ownShip.latitude,
    longitude: ownShip.longitude,
  });
  const [manualViewCenter, setManualViewCenter] = React.useState<RadarGeoPosition | null>(null);
  const [acquiredTargetId, setAcquiredTargetId] = React.useState<string | null>(null);
  const [manualEbl1Deg, setManualEbl1Deg] = React.useState<number | null>(null);
  const [manualVrmNm, setManualVrmNm] = React.useState<number | null>(null);
  const [penPoints, setPenPoints] = React.useState<RadarAnnotationPoint[]>([]);
  const [goToPoint, setGoToPoint] = React.useState<RadarAnnotationPoint | null>(null);
  const {
    contextMenuState,
    platformInfoState,
    closeContextMenu,
    closePanels,
    openContextMenu,
    openPlatformInfo,
  } = useRadarPanels();
  const previousMotionModeRef = React.useRef(motionMode);
  const { ownShip: simulatedOwnShip, targets: simulatedTargets } = useRadarSimulation({ ownShip, targets });

  React.useEffect(() => {
    const previousMotionMode = previousMotionModeRef.current;

    if (previousMotionMode !== motionMode && motionMode === 'TM') {
      const mapCenter = mapRef.current?.getCenter();

      setManualViewCenter(null);
      setTrueMotionCenter(
        mapCenter
          ? { latitude: mapCenter.lat, longitude: mapCenter.lng }
          : { latitude: simulatedOwnShip.latitude, longitude: simulatedOwnShip.longitude }
      );
    }

    if (previousMotionMode !== motionMode && motionMode === 'RM') {
      setManualViewCenter(null);
    }

    previousMotionModeRef.current = motionMode;
  }, [motionMode, simulatedOwnShip.latitude, simulatedOwnShip.longitude]);

  const relativeMotionCenter = React.useMemo(() => {
    return {
      latitude: simulatedOwnShip.latitude,
      longitude: simulatedOwnShip.longitude,
    };
  }, [simulatedOwnShip.latitude, simulatedOwnShip.longitude]);

  const trackedViewCenter = motionMode === 'RM' ? relativeMotionCenter : trueMotionCenter;
  const viewCenter = manualViewCenter ?? trackedViewCenter;
  const overlayCenterX = frameSize.width / 2;
  const overlayCenterY = frameSize.height / 2;
  const scaleRadius = Math.max(0, Math.min(frameSize.width, frameSize.height) / 2 - RadarScaleEdgeInsetPx);
  const overlayRadius = Math.max(0, scaleRadius - RadarScaleBandPx);
  const overlayReady = frameSize.width > 0 && frameSize.height > 0 && overlayRadius > 0;
  const resolvedEbl1Deg = manualEbl1Deg ?? ebl1Deg;
  const resolvedVrm1Nm = clampVrmRangeNm(manualVrmNm ?? vrm1Nm);
  const resolvedVrm2Nm = clampVrmRangeNm(vrm2Nm);

  const handleTargetSelect = React.useCallback((targetId: string) => {
    setAcquiredTargetId(targetId);
  }, []);

  const handleViewportDragged = React.useCallback((nextCenter: RadarGeoPosition) => {
    if (motionMode === 'RM') {
      setManualViewCenter(null);
      return;
    }

    setManualViewCenter(nextCenter);
  }, [motionMode]);

  const handleRecenterOwnShip = React.useCallback(() => {
    setManualViewCenter(null);
    setTrueMotionCenter({
      latitude: simulatedOwnShip.latitude,
      longitude: simulatedOwnShip.longitude,
    });
  }, [simulatedOwnShip.latitude, simulatedOwnShip.longitude]);

  const applyRangeStep = React.useCallback((offset: -1 | 1) => {
    if (!onRangeChange) {
      return;
    }

    const nextRangeNm = getSteppedRadarRange(rangeNm, offset);
    wheelDeltaAccumulatorRef.current = 0;

    if (nextRangeNm === rangeNm) {
      return;
    }

    closePanels();
    handleRecenterOwnShip();
    onRangeChange(nextRangeNm);
  }, [closePanels, handleRecenterOwnShip, onRangeChange, rangeNm]);

  const handleWheelRangeChange = React.useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (!onRangeChange || !frameRef.current || event.deltaY === 0) {
      return;
    }

    if (!isPointWithinRadarCircle(frameRef.current, event.clientX, event.clientY)) {
      return;
    }

    event.preventDefault();
    closePanels();
    wheelDeltaAccumulatorRef.current += event.deltaY;

    if (Math.abs(wheelDeltaAccumulatorRef.current) < RangeWheelDeltaThreshold) {
      return;
    }

    applyRangeStep(wheelDeltaAccumulatorRef.current < 0 ? -1 : 1);
  }, [applyRangeStep, closePanels, onRangeChange]);

  const clearWheelAccumulator = React.useCallback(() => {
    wheelDeltaAccumulatorRef.current = 0;
  }, []);

  const acquireTargetFromMenu = React.useCallback(() => {
    if (!contextMenuState) {
      return;
    }

    let nearestTargetId: string | null = null;
    let nearestDistance = Infinity;

    simulatedTargets.forEach((target) => {
      const distanceMeters = calculateGeoDistanceMeters(contextMenuState.position, target);

      if (distanceMeters < nearestDistance) {
        nearestTargetId = target.id;
        nearestDistance = distanceMeters;
      }
    });

    if (nearestTargetId !== null && nearestDistance <= TargetAcquisitionGateMeters) {
      handleTargetSelect(nearestTargetId);
    }

    closeContextMenu();
  }, [closeContextMenu, contextMenuState, handleTargetSelect, simulatedTargets]);

  const positionEblAndVrm = React.useCallback(() => {
    if (!contextMenuState) {
      return;
    }

    const bearingDeg = calculateGeoBearingDeg(simulatedOwnShip, contextMenuState.position);
    const rangeToPointNm = metersToNauticalMiles(calculateGeoDistanceMeters(simulatedOwnShip, contextMenuState.position));

    setManualEbl1Deg(bearingDeg);
    setManualVrmNm(rangeToPointNm);
    closeContextMenu();
  }, [closeContextMenu, contextMenuState, simulatedOwnShip]);

  const handleCenterOff = React.useCallback(() => {
    if (!contextMenuState) {
      return;
    }

    setManualViewCenter(null);

    if (motionMode === 'TM') {
      setTrueMotionCenter(contextMenuState.position);
    }

    closeContextMenu();
  }, [closeContextMenu, contextMenuState, motionMode]);

  const handleDrawPen = React.useCallback(() => {
    if (!contextMenuState) {
      return;
    }

    setPenPoints((previousPoints) => ([
      ...previousPoints,
      {
        id: createRadarAnnotationId('pen'),
        kind: 'pen',
        latitude: contextMenuState.position.latitude,
        longitude: contextMenuState.position.longitude,
      },
    ]));
    closeContextMenu();
  }, [closeContextMenu, contextMenuState]);
  const handleMenuAction = React.useCallback((action: RadarContextMenuAction) => {
    switch (action) {
      case 'acquire-target':
        acquireTargetFromMenu();
        break;
      case 'position-ebl-vrm':
        positionEblAndVrm();
        break;
      case 'center-off':
        handleCenterOff();
        break;
      case 'draw-pen':
        handleDrawPen();
        break;
      default:
        break;
    }
  }, [acquireTargetFromMenu, handleCenterOff, handleDrawPen, positionEblAndVrm]);

  return (
    <div className="radar-map-shell">
      <div
        ref={frameRef}
        className="radar-map-frame"
        onContextMenu={(event) => event.preventDefault()}
        onWheel={handleWheelRangeChange}
        onMouseLeave={clearWheelAccumulator}
      >
        {overlayReady && (
          <svg className="radar-scale-overlay" viewBox={`0 0 ${frameSize.width} ${frameSize.height}`} preserveAspectRatio="none">
            <DegreeTicks
              centerX={overlayCenterX}
              centerY={overlayCenterY}
              radius={scaleRadius}
              orientationMode={orientationMode}
              headingDeg={simulatedOwnShip.headingDeg}
            />
          </svg>
        )}

        <MapContainer
          ref={mapRef}
          center={[viewCenter.latitude, viewCenter.longitude]}
          zoom={9}
          minZoom={RadarMapLimits.minZoom}
          maxZoom={RadarMapLimits.maxZoom}
          className="radar-map-leaflet"
          preferCanvas
          zoomControl={false}
          attributionControl={false}
          fadeAnimation={false}
          zoomAnimation={false}
          dragging
          doubleClickZoom={false}
          scrollWheelZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
          maxBounds={RadarMapBounds}
          maxBoundsViscosity={1}
        >
          <RadarViewportController
            center={viewCenter}
            rangeNm={rangeNm}
            frameSize={frameSize}
          />
          <RadarMapEvents
            onContextMenu={openContextMenu}
            onMapInteraction={closePanels}
            onViewportDragged={handleViewportDragged}
          />
          <RadarZoomControls
            rangeNm={rangeNm}
            ownShipPosition={{
              latitude: simulatedOwnShip.latitude,
              longitude: simulatedOwnShip.longitude,
            }}
            onRangeChange={onRangeChange}
            onRecenterOwnShip={handleRecenterOwnShip}
          />
          <CoastlineLayer />
          <RadarAnnotationsLayer penPoints={penPoints} goToPoint={goToPoint} />
          <OwnShipMarker ship={simulatedOwnShip} onInfoRequest={openPlatformInfo} />
          <TargetsLayer
            targets={simulatedTargets}
            ownShip={simulatedOwnShip}
            motionMode={motionMode}
            vectorTimeMinutes={vectorTimeMinutes}
            visibleRangeNm={rangeNm}
            acquiredTargetId={acquiredTargetId}
            onTargetSelect={handleTargetSelect}
            onTargetInfoRequest={openPlatformInfo}
          />
        </MapContainer>

        {overlayReady && (
          <svg className="radar-overlay" viewBox={`0 0 ${frameSize.width} ${frameSize.height}`} preserveAspectRatio="none">
            <defs>
              <clipPath id={overlayClipPathId}>
                <circle cx={overlayCenterX} cy={overlayCenterY} r={overlayRadius} />
              </clipPath>
            </defs>

            <g clipPath={`url(#${overlayClipPathId})`}>
              <RadarGrid
                centerX={overlayCenterX}
                centerY={overlayCenterY}
                radius={overlayRadius}
              />
              {resolvedVrm1Nm > 0 && resolvedVrm1Nm <= rangeNm && (
                <circle
                  className="radar-overlay-vrm radar-overlay-vrm-primary"
                  cx={overlayCenterX}
                  cy={overlayCenterY}
                  r={overlayRadius * (resolvedVrm1Nm / rangeNm)}
                />
              )}
              {resolvedVrm2Nm > 0 && resolvedVrm2Nm <= rangeNm && (
                <circle
                  className="radar-overlay-vrm radar-overlay-vrm-secondary"
                  cx={overlayCenterX}
                  cy={overlayCenterY}
                  r={overlayRadius * (resolvedVrm2Nm / rangeNm)}
                />
              )}
              <HeadingLine
                centerX={overlayCenterX}
                centerY={overlayCenterY}
                radius={overlayRadius}
                courseDeg={simulatedOwnShip.courseDeg}
                headingDeg={simulatedOwnShip.headingDeg}
                orientationMode={orientationMode}
              />
              <EBL
                centerX={overlayCenterX}
                centerY={overlayCenterY}
                radius={overlayRadius}
                angleDeg={resolvedEbl1Deg}
                headingDeg={simulatedOwnShip.headingDeg}
                orientationMode={orientationMode}
                variant="primary"
              />
              <EBL
                centerX={overlayCenterX}
                centerY={overlayCenterY}
                radius={overlayRadius}
                angleDeg={ebl2Deg}
                headingDeg={simulatedOwnShip.headingDeg}
                orientationMode={orientationMode}
                variant="secondary"
              />
            </g>
          </svg>
        )}
        <RadarPortalOverlays
          contextMenuState={contextMenuState}
          platformInfoState={platformInfoState}
          motionMode={motionMode}
          onMenuAction={handleMenuAction}
        />
      </div>
    </div>
  );
};