import React from 'react';
import { Speed } from 'unitsnet-js';
import { SPEED_UNITS, UI_TEXT } from '../../constants';
import { decomposeSogByLeeway, formatSpeedMagnitudeKnots } from '../../util';
import { Section } from './ui/Section';
import { LabeledRow } from './ui/LabeledRow';
import { DataBox } from './ui/DataBox';

interface SOGDisplayProps {
  value: Speed;
  leewayDeg: number;
}

export const SOGDisplay: React.FC<SOGDisplayProps> = ({ value, leewayDeg }) => {
  const { lateralKn, foreAftKn } = decomposeSogByLeeway(value.Knots, leewayDeg);

  return (
    <Section className="lp-sog-section">
      <div className="lp-sog-row lp-sog-row-stack">
        <span className="lp-label">{UI_TEXT.LEFT_PANEL.SOG}</span>
      </div>

      <LabeledRow label={UI_TEXT.LEFT_PANEL.BOW_PS} labelClassName="lp-sog-label">
        <DataBox
          value={formatSpeedMagnitudeKnots(lateralKn)}
          size="sm"
          triangleDirection="right"
        />
        <span className="lp-sog-source">{UI_TEXT.LEFT_PANEL.SOURCE}</span>
      </LabeledRow>

      <LabeledRow label={UI_TEXT.LEFT_PANEL.CCRP_PS} labelClassName="lp-sog-label">
        <DataBox
          value={formatSpeedMagnitudeKnots(lateralKn)}
          size="sm"
          triangleDirection="right"
          badgeText={UI_TEXT.COMMON.GPS}
          badgeType="green"
          badgeClassName="lp-badge-mr"
        />
      </LabeledRow>

      <LabeledRow label={UI_TEXT.LEFT_PANEL.CCRP_FA} className="lp-sog-row-center" labelClassName="lp-sog-label">
        <DataBox
          value={`${formatSpeedMagnitudeKnots(foreAftKn)} ${SPEED_UNITS.KNOTS}`}
          size="med"
          triangleDirection="down"
        />
      </LabeledRow>

      <LabeledRow label={UI_TEXT.LEFT_PANEL.STERN_PS} labelClassName="lp-sog-label">
        <DataBox
          value={formatSpeedMagnitudeKnots(lateralKn)}
          size="sm"
          triangleDirection="right"
        />
      </LabeledRow>
    </Section>
  );
};
