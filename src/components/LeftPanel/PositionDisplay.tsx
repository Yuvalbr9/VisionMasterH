import React from 'react';
import { Angle } from 'unitsnet-js';
import { UI_TEXT, UI_VALUES } from '../../constants';
import { formatLatitude, formatLongitude, getLatitudeDirection, getLongitudeDirection } from '../../util';
import { Section } from './ui/Section';
import { LabeledRow } from './ui/LabeledRow';
import { DataBox } from './ui/DataBox';

interface PositionDisplayProps {
  lat: Angle;
  lon: Angle;
}

export const PositionDisplay: React.FC<PositionDisplayProps> = ({ lat, lon }) => {
  const latStr = formatLatitude(lat) + getLatitudeDirection(lat);
  const lonStr = formatLongitude(lon) + getLongitudeDirection(lon);

  return (
    <Section className="lp-pos-section">
      <LabeledRow label={UI_VALUES.LEFT_PANEL.POS} className="lp-pos-row">
        <DataBox
          value={latStr}
          size="wide"
          badgeText={UI_TEXT.COMMON.GPS}
          badgeType="green"
        />
      </LabeledRow>
      <LabeledRow label={UI_VALUES.LEFT_PANEL.EMPTY_LABEL} className="lp-pos-row">
        <DataBox
          value={lonStr}
          size="sm"
          badgeText={UI_TEXT.LEFT_PANEL.AUTONOMOUS}
          badgeType="autonomous"
        />
      </LabeledRow>
    </Section>
  );
};
