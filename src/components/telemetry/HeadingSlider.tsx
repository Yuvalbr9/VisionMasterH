import React from 'react'
import styles from './LeftTelemetry.module.css'

type HeadingSliderProps = {
    heading: number
    onChange: (value: number) => void
}

/** HDG section: displays the current heading and a range slider. */
export default function HeadingSlider({ heading, onChange }: HeadingSliderProps) {
    return (
        <section className={styles.section}>
            <div className={styles.rowBetween}>
                <label>HDG</label>
                <div className={styles.valueLarge}>{heading.toFixed(1)}°</div>
            </div>
            <input
                type="range"
                min={0}
                max={359}
                value={Math.round(heading)}
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
