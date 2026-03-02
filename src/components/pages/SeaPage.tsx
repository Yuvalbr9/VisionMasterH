import React from 'react'
import type { Telemetry } from '../../types/telemetry'

type PageProps = {
  telemetry: Telemetry
  setTelemetry: (fn: any) => void
}

export default function SeaPage(_props: PageProps) {
  return (
    <div style={{ padding: 8, fontFamily: 'JetBrains Mono' }}>
      <h3>Sea</h3>
      <p style={{ opacity: 0.8 }}>Sea clutter and models placeholder.</p>
    </div>
  )
}
