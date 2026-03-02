import React from 'react'
import type { Telemetry } from '../hooks/useNavigationData'
import '../style/summeryBox.css'

const SummaryBox: React.FC<{telemetry: Telemetry}> = ({telemetry}) => {
  return (
    <div className="summary-box">
      <div className="summary-title">SUMMARY</div>
      <div className="summary-list">
        <div className="summary-row">
          <div className="summary-label">HDG</div>
          <div>{telemetry.Heading.toFixed(1)}°</div>
        </div>
        <div className="summary-row">
          <div className="summary-label">STW</div>
          <div>{telemetry.SpeedThroughWater.display}</div>
        </div>
        <div className="summary-row">
          <div className="summary-label">POS</div>
          <div className="summary-pos">
            <div className="summary-pos-line">{telemetry.Latitude}</div>
            <div className="summary-pos-line">{telemetry.Longitude}</div>
          </div>
        </div>
        <div className="summary-row">
          <div className="summary-label">COG</div>
          <div>{telemetry.COG.toFixed(1)}°</div>
        </div>
      </div>
    </div>
  )
}

export default SummaryBox
