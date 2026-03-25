import React from 'react';
import {
  ContextMenuEstimatedHeightPx,
  ContextMenuEstimatedWidthPx,
  PlatformInfoEstimatedHeightPx,
  PlatformInfoEstimatedWidthPx,
} from './radarMapConstants';
import { clampOverlayViewportPosition } from './radarMapUtils';
import { RadarContextMenuState, RadarPlatformInfoState } from './radarMapTypes';

export const useRadarPanels = () => {
  const [contextMenuState, setContextMenuState] = React.useState<RadarContextMenuState | null>(null);
  const [platformInfoState, setPlatformInfoState] = React.useState<RadarPlatformInfoState | null>(null);

  const closeContextMenu = React.useCallback(() => {
    setContextMenuState(null);
  }, []);

  const closePanels = React.useCallback(() => {
    setContextMenuState(null);
    setPlatformInfoState(null);
  }, []);

  const openContextMenu = React.useCallback((menuState: RadarContextMenuState) => {
    const nextPosition = clampOverlayViewportPosition(
      menuState.x,
      menuState.y,
      ContextMenuEstimatedWidthPx,
      ContextMenuEstimatedHeightPx
    );

    setPlatformInfoState(null);
    setContextMenuState({
      ...menuState,
      x: nextPosition.x,
      y: nextPosition.y,
    });
  }, []);

  const openPlatformInfo = React.useCallback((info: RadarPlatformInfoState) => {
    const nextPosition = clampOverlayViewportPosition(
      info.x,
      info.y,
      PlatformInfoEstimatedWidthPx,
      PlatformInfoEstimatedHeightPx
    );

    setContextMenuState(null);
    setPlatformInfoState({
      ...info,
      x: nextPosition.x,
      y: nextPosition.y,
    });
  }, []);

  React.useEffect(() => {
    if (!contextMenuState && !platformInfoState) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      // Ignore non-primary buttons (like right-click) to avoid closing 
      // the panel immediately after it was opened by a contextmenu event.
      if (event.button !== 0) {
        return;
      }

      const target = event.target as HTMLElement | null;

      if (target?.closest('.radar-map-context-menu') || target?.closest('.radar-map-platform-info')) {
        return;
      }

      closePanels();
    };

    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [closePanels, contextMenuState, platformInfoState]);

  return {
    contextMenuState,
    platformInfoState,
    closeContextMenu,
    closePanels,
    openContextMenu,
    openPlatformInfo,
  };
};