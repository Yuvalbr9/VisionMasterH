import React from 'react'
import type { Telemetry } from '../../hooks/useNavigationData'

const EnvironmentPage: React.FC<{telemetry: Telemetry; setTelemetry:(t:any)=>void}> = ()=>{
  return (
    <div style={{padding:8,fontFamily:'JetBrains Mono'}}>
      <h3>Environment</h3>
      <p style={{opacity:0.8}}>Wind, tide and environmental data placeholder.</p>
    </div>
  )
}

export default EnvironmentPage
