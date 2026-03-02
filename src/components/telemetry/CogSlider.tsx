import React from 'react'
import styles from './LeftTelemetry.module.css'

type CogSliderProps = {
    cog: number
    onChange: (value: number) => void
}

/** COG section: displays the current COG and a range slider. */
export default function CogSlider({ cog, onChange }: CogSliderProps) {
    return (
        <section className={styles.section}>
            <div className={styles.rowBetween}>
                <label>COG</label>
                <div className={styles.valueLarge}>{cog.toFixed(1)}°</div>
            </div>
            <input
                type="range"
                min={0}
                max={359}
                value={Math.round(cog)}
                onChange={(e) => onChange(parseInt(e.target.value))}
            />
            <div className={styles.rangeLabels}>
                <div>000</div>
                <div>090</div>
                <div>180</div>
                <div>270</div>
                <div>359</div>
            </div>
        </section>
    )
}
