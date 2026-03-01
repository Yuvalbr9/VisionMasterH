import React from 'react'
import LeftTelemetry from '../LeftTelemetry'
import type { Telemetry } from '../../hooks/useNavigationData'

const LeftTelemetryPage: React.FC<{telemetry: Telemetry; setTelemetry:(t:any)=>void}> = ({telemetry, setTelemetry}) => {
  return <div style={{padding:6}}><LeftTelemetry telemetry={telemetry} setTelemetry={setTelemetry} /></div>
}

export default LeftTelemetryPage
