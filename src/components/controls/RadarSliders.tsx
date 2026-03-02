import React, { useState } from 'react'
import styles from './RightControls.module.css'

/** Self-contained GAIN / RAIN / SEA sliders. */
export default function RadarSliders() {
    const [gain, setGain] = useState(50)
    const [rain, setRain] = useState(20)
    const [sea, setSea] = useState(15)

    const sliders = [
        { label: 'GAIN', value: gain, onChange: setGain },
        { label: 'RAIN', value: rain, onChange: setRain },
        { label: 'SEA', value: sea, onChange: setSea },
    ]

    return (
        <div className={styles.sliders}>
            {sliders.map(({ label, value, onChange }) => (
                <React.Fragment key={label}>
                    <label>
                        {label} <span className={styles.pct}>{value}%</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={value}
                        onChange={(e) => onChange(parseInt(e.target.value))}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}
