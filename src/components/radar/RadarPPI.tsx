import React from 'react'
import type { Telemetry } from '../../types/telemetry'
import RadarCanvas from './RadarCanvas'
import CompassRose from './CompassRose'
import styles from './RadarPPI.module.css'

type RadarPPIProps = {
    telemetry: Telemetry
}

/** Composition component: renders the radar canvas with the compass overlay. */
export default function RadarPPI({ telemetry }: RadarPPIProps) {
    return (
        <div className={styles.wrap}>
            <div className={styles.canvas}>
                <RadarCanvas />
                <CompassRose heading={telemetry.Heading} />
            </div>
        </div>
    )
}
