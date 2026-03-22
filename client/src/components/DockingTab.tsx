import React from 'react';
import { BaseButton } from './Buttons';
import { GenericInput } from './Inputs';
import { SPEED_UNITS, UI_TEXT, UI_VALUES } from '../constants';

export const DockingTab: React.FC = () => {
  return (
    <div className="lp-docking-root">
      <section className="lp-docking-section lp-docking-rot">
        <div className="lp-docking-rot-header">
          <span>{UI_TEXT.DOCKING.ROT}</span>
          <span>{UI_VALUES.DOCKING.ROT_VALUE}</span>
        </div>
        <div className="lp-docking-rot-scale">
          {UI_VALUES.DOCKING.ROT_SCALE.map((value, index) => (
            <span key={`${value}-${index}`}>{value}</span>
          ))}
        </div>
        <div className="lp-docking-rot-bar-wrap">
          <div className="lp-docking-rot-bar" />
          <div className="lp-docking-rot-marker" />
        </div>
        <div className="lp-docking-rot-ends">
          <label>{UI_TEXT.DOCKING.PORT}</label>
          <label>{UI_TEXT.DOCKING.STARBOARD}</label>
        </div>
      </section>

      <section className="lp-docking-section">
        <div className="lp-docking-title">{UI_TEXT.DOCKING.SPEED_OVER_GROUND}</div>
        <div className="lp-docking-row">
          <label>{UI_TEXT.DOCKING.BOW_PS}</label>
          <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_SPEED} />
        </div>
        <div className="lp-docking-row">
          <label>{UI_TEXT.DOCKING.CCRP_PS}</label>
          <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_SPEED} />
        </div>
        <div className="lp-docking-row">
          <label>{UI_TEXT.DOCKING.STEM_PS}</label>
          <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_SPEED} />
        </div>
        <div className="lp-docking-row lp-docking-row-combo">
          <label>{UI_TEXT.DOCKING.CCRP_FA}</label>
          <div className="lp-docking-inline-values">
            <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_CCRP_FA} />
            <span className="lp-docking-pill">{SPEED_UNITS.KNOTS}</span>
            <span className="lp-docking-pill">{UI_TEXT.COMMON.GPS}</span>
          </div>
        </div>
      </section>

      <section className="lp-docking-section">
        <div className="lp-docking-rudder-head">
          <span>{UI_TEXT.DOCKING.PORT_RUDDER}</span>
          <span>{UI_TEXT.DOCKING.STARBOARD_RUDDER}</span>
        </div>
        <div className="lp-docking-gauge-row">
          <div className="lp-docking-gauge">
            <div className="lp-docking-gauge-dial">
              <span className="lp-docking-needle lp-docking-needle-left" />
            </div>
            <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_RUDDER} />
          </div>
          <div className="lp-docking-gauge">
            <div className="lp-docking-gauge-dial">
              <span className="lp-docking-needle lp-docking-needle-right" />
            </div>
            <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_RUDDER} />
          </div>
        </div>
      </section>

      <section className="lp-docking-section">
        <div className="lp-docking-title">{UI_TEXT.DOCKING.BOW_THRUSTER}</div>
        <div className="lp-docking-thruster-grid">
          {Array.from({ length: UI_VALUES.DOCKING.THRUSTER_COUNT }).map((_, index) => (
            <BaseButton key={index} className="lp-docking-thruster-btn">
              {index % 2 === 0 ? UI_VALUES.DOCKING.THRUSTER_LEFT : UI_VALUES.DOCKING.THRUSTER_RIGHT}
            </BaseButton>
          ))}
        </div>
        <div className="lp-docking-thruster-scale">
          {UI_VALUES.DOCKING.THRUSTER_SCALE.map((value, index) => (
            <span key={`${value}-${index}`}>{value}</span>
          ))}
        </div>
      </section>

      <section className="lp-docking-section lp-docking-last">
        <div className="lp-docking-rudder-head">
          <span>{UI_TEXT.DOCKING.RELATIVE_WIND}</span>
          <span>{UI_TEXT.DOCKING.TRUE_WIND}</span>
        </div>
        <div className="lp-docking-gauge-row">
          <div className="lp-docking-gauge">
            <div className="lp-docking-gauge-dial lp-docking-wind-dial">
              <span className="lp-docking-needle lp-docking-needle-up-left" />
            </div>
            <div className="lp-docking-wind-values">
              <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_RELATIVE_WIND_DIR} />
              <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_RELATIVE_WIND_SPEED} />
            </div>
          </div>
          <div className="lp-docking-gauge">
            <div className="lp-docking-gauge-dial lp-docking-wind-dial">
              <span className="lp-docking-needle lp-docking-needle-up-right" />
            </div>
            <div className="lp-docking-wind-values">
              <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_TRUE_WIND_DIR} />
              <GenericInput type="number" step="0.1" defaultValue={UI_VALUES.DOCKING.DEFAULT_TRUE_WIND_SPEED} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
