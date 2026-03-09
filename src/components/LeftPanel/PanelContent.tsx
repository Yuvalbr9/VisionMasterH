import React from 'react';
import { NavigationData } from '../../types';
import { DockingTab } from '../DockingTab';
import { DefaultContent } from './DefaultContent';

export enum LeftPanelTabs {
  DEFAULT,
  DOCKING,
}

interface PanelContentProps {
  activeTab: number;
  navData: NavigationData;
  updateNavData: (updates: Partial<NavigationData>) => void;
  dateTimeIso: string | null;
  isLoading: boolean;
  error: string | null;
  isManualNavigationMode: boolean;
}

export const PanelContent: React.FC<PanelContentProps> = ({
  activeTab,
  navData,
  updateNavData,
  dateTimeIso,
  isLoading,
  error,
  isManualNavigationMode,
}) => {
  switch (activeTab) {
    case LeftPanelTabs.DOCKING:
      return <DockingTab />;

    case LeftPanelTabs.DEFAULT:
    default:
      return (
        <DefaultContent
          navData={navData}
          updateNavData={updateNavData}
          dateTimeIso={dateTimeIso}
          isLoading={isLoading}
          error={error}
          isManualNavigationMode={isManualNavigationMode}
        />
      );
  }
};
