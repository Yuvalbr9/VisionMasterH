import React from 'react';
import { Speed } from 'unitsnet-js';
import { SPEED_UNITS, UI_TEXT } from '../../constants';
import { Section } from './ui/Section';
import { LabeledRow } from './ui/LabeledRow';
import { DataBox } from './ui/DataBox';

interface SpeedDisplayProps {
  value: Speed;
}

export const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ value }) => {
  return (
    <Section>
      <LabeledRow label={UI_TEXT.RADAR_TOP_INFO.STW}>
        <DataBox
          value={`${Math.abs(value.Knots).toFixed(1)} ${SPEED_UNITS.KNOTS}`}
          badgeText={UI_TEXT.RADAR_TOP_INFO.LOG}
          badgeType="green"
        />
      </LabeledRow>
    </Section>
  );
};
