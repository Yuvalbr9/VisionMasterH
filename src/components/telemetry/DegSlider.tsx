import styles from './LeftTelemetry.module.css'

type CogSliderProps = {
    deg: number
    onChange: (value: number) => void
    name?: string
}

const unitLabels = [0, 90, 180, 270, 359]

/** COG section: displays the current COG and a range slider. */
export default function DegSlider({ deg, onChange, name }: CogSliderProps) {
    return (+
        <section className={styles.section}>
            <div className={styles.rowBetween}>
                <label>{name}</label>
                <div className={styles.valueLarge}>{deg.toFixed(1)}°</div>
            </div>
            <input
                type="range"
                min={0}
                max={359}
                value={Math.round(deg)}
                onChange={(e) => onChange(parseInt(e.target.value))}
            />
            <div className={styles.rangeLabels}>
                {unitLabels.map((label) => (
                    <div key={label}>{label.toString().padStart(3, '0')}</div>
                ))}
            </div>
        </section>
    )
}
