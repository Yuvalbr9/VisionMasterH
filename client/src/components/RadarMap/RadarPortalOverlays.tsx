import React from 'react';
import { createPortal } from 'react-dom';
import { BaseButton } from '../Buttons';
import { RadarMenuItems, RadarContextMenuAction } from './radarMapConstants';
import { RadarContextMenuState, RadarPlatformInfoState } from './radarMapTypes';

interface RadarPortalOverlaysProps {
  contextMenuState: RadarContextMenuState | null;
  platformInfoState: RadarPlatformInfoState | null;
  onMenuAction: (action: RadarContextMenuAction) => void;
}

export const RadarPortalOverlays: React.FC<RadarPortalOverlaysProps> = ({
  contextMenuState,
  platformInfoState,
  onMenuAction,
}) => {
  if (typeof document === 'undefined') {
    return null;
  }

  return (
    <>
      {platformInfoState && createPortal(
        <div
          className={`radar-map-platform-info${platformInfoState.variant === 'target-preview' ? ' is-target-preview' : ''}`}
          style={{ left: `${platformInfoState.x}px`, top: `${platformInfoState.y}px` }}
        >
          {platformInfoState.subtitle && (
            <div className="radar-map-platform-info-subtitle">{platformInfoState.subtitle}</div>
          )}
          <div className="radar-map-platform-info-title">{platformInfoState.title}</div>
          {platformInfoState.lines.map((line) => (
            <div key={line} className="radar-map-platform-info-line">{line}</div>
          ))}
        </div>,
        document.body
      )}

      {contextMenuState && createPortal(
        <div
          className="radar-map-context-menu"
          role="menu"
          style={{ left: `${contextMenuState.x}px`, top: `${contextMenuState.y}px` }}
        >
          {RadarMenuItems.map((item) => (
            <BaseButton
              key={item.id}
              className="radar-map-context-item control-btn"
              role="menuitem"
              onClick={() => onMenuAction(item.id)}
            >
              {item.label}
            </BaseButton>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};