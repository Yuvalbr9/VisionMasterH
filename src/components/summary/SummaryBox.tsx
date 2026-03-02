import React from 'react'
import type { Telemetry } from '../../types/telemetry'
import styles from './SummaryBox.module.css'

type SummaryBoxProps = {
    telemetry: Telemetry
}

/** Compact summary panel showing key navigation values. */
export default function SummaryBox({ telemetry }: SummaryBoxProps) {
    const rows = [
        { label: 'HDG', value: `${telemetry.Heading.toFixed(1)}°` },
        { label: 'STW', value: telemetry.SpeedThroughWater.display },
        { label: 'COG', value: `${telemetry.COG.toFixed(1)}°` },
    ]

    return (
        <div className={styles.box}>
            <div className={styles.title}>SUMMARY</div>
            <div className={styles.list}>
                {rows.map(({ label, value }) => (
                    <div key={label} className={styles.row}>
                        <div className={styles.label}>{label}</div>
                        <div>{value}</div>
                    </div>
                ))}

                {/* Position has special two-line layout */}
                <div className={styles.row}>
                    <div className={styles.label}>POS</div>
                    <div className={styles.pos}>
                        <div className={styles.posLine}>{telemetry.Latitude}</div>
                        <div className={styles.posLine}>{telemetry.Longitude}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
