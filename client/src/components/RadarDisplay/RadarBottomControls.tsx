import React from 'react';
import { BaseButton } from '../Buttons';
import { GenericSlider } from '../Inputs';
import { UI_TEXT, UI_VALUES } from '../../constants';
import { clamp } from '../../util';

const radarRows = [...UI_TEXT.RADAR_BOTTOM.ROW_LABELS];
const rowMin = UI_VALUES.RADAR_BOTTOM.ROW_MIN;
const rowMax = UI_VALUES.RADAR_BOTTOM.ROW_MAX;
const rowWheelStep = UI_VALUES.RADAR_BOTTOM.ROW_WHEEL_STEP;

const getDefaultRowValue = (label: string, index: number): number => {
  const configuredValue = UI_VALUES.RADAR_BOTTOM.ROW_DEFAULT_VALUES[index];
  if (typeof configuredValue === 'number' && Number.isFinite(configuredValue)) {
    return clamp(configuredValue, rowMin, rowMax);
  }

  if (label === UI_VALUES.RADAR_BOTTOM.GAIN_FILL_MATCH) {
    return 86;
  }

  return rowMin;
};

export const RadarBottomControls: React.FC = () => {
  const [rowValues, setRowValues] = React.useState<number[]>(
    () => radarRows.map((label, index) => getDefaultRowValue(label, index))
  );

  const handleRowValueChange = React.useCallback((rowIndex: number, nextValue: number) => {
    if (!Number.isFinite(nextValue)) {
      return;
    }

    setRowValues((previousValues) => previousValues.map((value, index) => (
      index === rowIndex ? clamp(nextValue, rowMin, rowMax) : value
    )));
  }, []);

  return (
    <div className="radar-bottom-controls">
      <div className="radar-console-top-group">
        <div className="radar-console-main radar-console-block">
          <BaseButton className="radar-console-btn radar-console-btn-wide">{UI_TEXT.RADAR_BOTTOM.ENHANCE_OFF}</BaseButton>

          <div className="radar-console-rows">
            {radarRows.map((label, index) => {
              const rowValue = rowValues[index] ?? rowMin;

              return (
              <div className="radar-console-row" key={label}>
                <span className="radar-console-label">{label}</span>
                <GenericSlider
                  className="radar-console-value-box"
                  fillClassName="radar-console-fill"
                  ariaLabel={`${label} control`}
                  value={rowValue}
                  min={rowMin}
                  max={rowMax}
                  step={rowWheelStep}
                  onChange={(nextValue) => handleRowValueChange(index, nextValue)}
                  title={`${label}: ${Math.round(rowValue)}%`}
                  minVisualFillPx={2}
                />
              </div>
              );
            })}
          </div>
        </div>

        <div className="radar-console-side-buttons">
          <BaseButton className="radar-console-btn">{UI_TEXT.RADAR_BOTTOM.MAN}</BaseButton>
          <BaseButton className="radar-console-btn">{UI_TEXT.RADAR_BOTTOM.AFC}</BaseButton>
        </div>
      </div>

      <BaseButton className="radar-console-btn radar-console-btn-wide">{UI_TEXT.RADAR_BOTTOM.TXRX_A_MASTER}</BaseButton>

      <div className="radar-console-bottom-row">
        <BaseButton className="radar-console-btn radar-console-btn-grow">{UI_TEXT.RADAR_BOTTOM.TRANSMIT}</BaseButton>
        <BaseButton className="radar-console-btn radar-console-btn-small">{UI_TEXT.RADAR_BOTTOM.MP}</BaseButton>
      </div>
    </div>
  );
};
