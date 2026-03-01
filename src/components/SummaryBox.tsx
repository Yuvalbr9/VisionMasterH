import React from 'react'
import type { Telemetry } from '../hooks/useNavigationData'

const SummaryBox: React.FC<{telemetry: Telemetry}> = ({telemetry}) => {
  return (
    <div style={{width:160,background:'rgba(255,255,255,0.02)',padding:8,borderRadius:8,border:'1px solid rgba(255,255,255,0.03)'}}>
      <div style={{fontFamily:'JetBrains Mono',fontSize:12,opacity:0.8,marginBottom:6}}>SUMMARY</div>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        <div style={{display:'flex',justifyContent:'space-between',fontFamily:'JetBrains Mono'}}>
          <div style={{opacity:0.7}}>HDG</div>
          <div>{telemetry.Heading.toFixed(1)}°</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontFamily:'JetBrains Mono'}}>
          <div style={{opacity:0.7}}>STW</div>
          <div>{telemetry.SpeedThroughWater.display}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontFamily:'JetBrains Mono'}}>
          <div style={{opacity:0.7}}>POS</div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:12}}>{telemetry.Latitude}</div>
            <div style={{fontSize:12}}>{telemetry.Longitude}</div>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontFamily:'JetBrains Mono'}}>
          <div style={{opacity:0.7}}>COG</div>
          <div>{telemetry.COG.toFixed(1)}°</div>
        </div>
      </div>
    </div>
  )
}

export default SummaryBox
