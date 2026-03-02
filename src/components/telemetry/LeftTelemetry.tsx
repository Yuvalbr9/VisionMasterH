import React from 'react'
import type { Telemetry, UnitNumber, SOGDetails } from '../../types/telemetry'
import { normalizeAngle } from '../../utils/formatters'
import HeadingSlider from './HeadingSlider'
import SpeedInput from './SpeedInput'
import PositionInput from './PositionInput'
import CogSlider from './CogSlider'
import SogDetailsComp from './SogDetails'
import DateTimeDisplay from './DateTimeDisplay'
import styles from './LeftTelemetry.module.css'

type LeftTelemetryProps = {
    telemetry: Telemetry
    setTelemetry: (fn: any) => void
}

/**
 * Telemetry panel: composes heading, speed, position, COG, SOG details,
 * and a live clock.
 */
export default function LeftTelemetry({ telemetry, setTelemetry }: LeftTelemetryProps) {
    const handleHeadingChange = (v: number) => {
        setTelemetry((prev: Telemetry) => ({
            ...prev,
            Heading: normalizeAngle(v),
        }))
    }

    const handleCogChange = (v: number) => {
        setTelemetry((prev: Telemetry) => ({
            ...prev,
            COG: normalizeAngle(v),
        }))
    }

    const handleStwChange = (u: UnitNumber) => {
        setTelemetry((prev: Telemetry) => ({
            ...prev,
            SpeedThroughWater: u,
        }))
    }

    const handlePositionChange = (lat: string, lon: string) => {
        setTelemetry((prev: Telemetry) => ({
            ...prev,
            Latitude: lat,
            Longitude: lon,
        }))
    }

    const handleSogDetailsChange = (patch: Partial<SOGDetails>) => {
        setTelemetry((prev: Telemetry) => ({
            ...prev,
            SOGDetails: { ...(prev.SOGDetails || {}), ...patch },
        }))
    }

    return (
        <div className={styles.telemetry}>
            <HeadingSlider heading={telemetry.Heading} onChange={handleHeadingChange} />
            <SpeedInput stw={telemetry.SpeedThroughWater} onChange={handleStwChange} />
            <PositionInput
                latitude={telemetry.Latitude}
                longitude={telemetry.Longitude}
                onChange={handlePositionChange}
            />
            <CogSlider cog={telemetry.COG} onChange={handleCogChange} />
            <SogDetailsComp sogDetails={telemetry.SOGDetails} onChange={handleSogDetailsChange} />
            <DateTimeDisplay />
        </div>
    )
}
