import React from 'react'
import type { Telemetry } from '../../types/telemetry'

type PageProps = {
  telemetry: Telemetry
  setTelemetry: (fn: any) => void
}

export default function DockingPage(_props: PageProps) {
  return (
    <div style={{ padding: 8, fontFamily: 'JetBrains Mono' }}>
      <h3>Docking</h3>
      <p style={{ opacity: 0.8 }}>
        Docking controls and information placeholder.
      </p>
      <div style={{ marginTop: 8 }}>
        <label style={{ fontSize: 12, opacity: 0.8 }}>Slip:</label>
        <div
          style={{
            height: 40,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            padding: 8,
          }}
        >
          Controls...
        </div>
      </div>
    </div>
  )
}
