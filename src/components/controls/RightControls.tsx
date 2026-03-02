import React from 'react'
import type { Telemetry } from '../../types/telemetry'
import MobBlock from './MobBlock'
import RadarSliders from './RadarSliders'
import EblVrmTable from './EblVrmTable'
import styles from './RightControls.module.css'

type RightControlsProps = {
    telemetry: Telemetry
    setTelemetry: (fn: any) => void
}

/** Right panel: MOB block, radar sliders, and EBL/VRM table. */
export default function RightControls({ telemetry, setTelemetry }: RightControlsProps) {
    return (
        <div className={styles.stack}>
            <MobBlock telemetry={telemetry} setTelemetry={setTelemetry} />
            <RadarSliders />
            <EblVrmTable />
        </div>
    )
}
