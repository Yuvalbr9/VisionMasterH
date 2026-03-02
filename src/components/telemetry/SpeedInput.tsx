import React from 'react'
import type { UnitNumber } from '../../types/telemetry'
import styles from './LeftTelemetry.module.css'

type SpeedInputProps = {
    stw: UnitNumber
    onChange: (value: UnitNumber) => void
}

/** STW (Speed Through Water) section: number input with unit badge. */
export default function SpeedInput({ stw, onChange }: SpeedInputProps) {
    return (
        <section className={styles.section}>
            <div className={styles.rowBetween}>
                <label>STW</label>
                <div className={styles.valueLarge}>{stw.display}</div>
            </div>
            <div className={styles.stwRow}>
                <input
                    type="number"
                    step="0.1"
                    value={stw.value}
                    onChange={(e) => {
                        const v = parseFloat(e.target.value || '0')
                        onChange({ value: v, unit: 'knots', display: `${v} kn` })
                    }}
                />
                <div className={styles.unit}>kn</div>
            </div>
        </section>
    )
}
