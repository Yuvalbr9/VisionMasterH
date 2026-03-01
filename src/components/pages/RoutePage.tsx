import React from 'react'
import type { Telemetry } from '../../hooks/useNavigationData'

const RoutePage: React.FC<{telemetry: Telemetry; setTelemetry:(t:any)=>void}> = ()=>{
  return (
    <div style={{padding:8,fontFamily:'JetBrains Mono'}}>
      <h3>Route</h3>
      <p style={{opacity:0.8}}>Route planning and waypoints placeholder.</p>
    </div>
  )
}

export default RoutePage
