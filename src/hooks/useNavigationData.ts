import { useEffect, useState } from 'react'
import type { Telemetry } from '../types/telemetry'

/** Default / mock telemetry state used until a real data source is wired in. */
const INITIAL_TELEMETRY: Telemetry = {
  Heading: 289.0,
  HeadingSource: 'T',
  manualOffset: 0,
  MOBActive: false,
  MOBManual: {
    bearingR: undefined,
    bearingT: undefined,
    range: { value: 0, unit: 'NM', display: '0 NM' },
    stopAfterSeconds: { value: 0, unit: 's', display: '00:00:00' },
  },
  SpeedThroughWater: { value: 10.8, unit: 'knots', display: '10.8 kn' },
  Latitude: "37°46.1234' N",
  Longitude: "122°25.5678' W",
  COG: 287.3,
  SOG: { value: 11.2, unit: 'knots', display: '11.2 kn' },
  RangeNM: 12,
  RadarTargets: [
    {
      id: 'T1',
      lat: 0.01,
      lon: -0.02,
      cog: 120,
      sog: { value: 8.2, unit: 'knots', display: '8.2 kn' },
      bearingDeg: 110,
      distanceNM: 3.2,
    },
    {
      id: 'T2',
      lat: -0.02,
      lon: 0.04,
      cog: 45,
      sog: { value: 12.0, unit: 'knots', display: '12.0 kn' },
      collision: true,
      bearingDeg: 45,
      distanceNM: 6.1,
    },
  ],
  SOGDetails: {
    bowPS: { value: 0, unit: 'knots', display: '0.0 kn' },
    ccrpPS: { value: 0, unit: 'knots', display: '0.0 kn' },
    ccrpFA: { value: 10.8, unit: 'knots', display: '10.8 kn' },
    sternPS: { value: 0, unit: 'knots', display: '0.0 kn' },
  },
}

/**
 * Hook that provides telemetry state with mock fallback.
 * Swap the `useEffect` body with a real fetch / WebSocket when ready.
 */
export const useNavigationData = () => {
  const [telemetry, setTelemetry] = useState<Telemetry>(INITIAL_TELEMETRY)

  // Simulate periodic updates (heading drift, etc.)
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        Heading: (prev.Heading + 0.02) % 360,
        COG: (prev.COG + 0.01) % 360,
        RadarTargets: prev.RadarTargets.map((r) => ({
          ...r,
          bearingDeg: ((r.bearingDeg ?? 0) + 0.01) % 360,
          distanceNM: r.distanceNM
            ? Math.max(0.2, r.distanceNM + (Math.random() - 0.5) * 0.01)
            : r.distanceNM,
        })),
      }))
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return { telemetry, setTelemetry }
}

export default useNavigationData
