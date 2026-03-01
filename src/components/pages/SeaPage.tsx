import React from 'react'
import type { Telemetry } from '../../hooks/useNavigationData'

const SeaPage: React.FC<{telemetry: Telemetry; setTelemetry:(t:any)=>void}> = ()=>{
  return (
    <div style={{padding:8,fontFamily:'JetBrains Mono'}}>
      <h3>Sea</h3>
      <p style={{opacity:0.8}}>Sea clutter and models placeholder.</p>
    </div>
  )
}

export default SeaPage
