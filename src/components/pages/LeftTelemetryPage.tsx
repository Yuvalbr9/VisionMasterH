import React from 'react'
import type { Telemetry } from '../../types/telemetry'
import LeftTelemetry from '../telemetry/LeftTelemetry'

type PageProps = {
  telemetry: Telemetry
  setTelemetry: (fn: any) => void
}

export default function LeftTelemetryPage({ telemetry, setTelemetry }: PageProps) {
  return (
    <div style={{ padding: 6 }}>
      <LeftTelemetry telemetry={telemetry} setTelemetry={setTelemetry} />
    </div>
  )
}
