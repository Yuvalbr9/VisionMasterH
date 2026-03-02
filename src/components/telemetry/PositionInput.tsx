import React from 'react'
import styles from './LeftTelemetry.module.css'

type PositionInputProps = {
    latitude: string
    longitude: string
    onChange: (lat: string, lon: string) => void
}

/** POS section: two text inputs for lat/lon. */
export default function PositionInput({ latitude, longitude, onChange }: PositionInputProps) {
    return (
        <section className={styles.section}>
            <label>POS</label>
            <div className={styles.posList}>
                <input
                    value={latitude}
                    onChange={(e) => onChange(e.target.value, longitude)}
                />
                <input
                    value={longitude}
                    onChange={(e) => onChange(latitude, e.target.value)}
                />
            </div>
        </section>
    )
}
