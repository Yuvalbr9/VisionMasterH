import React from 'react'
import type { UnitNumber, SOGDetails as SOGDetailsType } from '../../types/telemetry'
import styles from './LeftTelemetry.module.css'

type SogDetailsProps = {
    sogDetails: SOGDetailsType | undefined
    onChange: (patch: Partial<SOGDetailsType>) => void
}

/** Individual SOG field row. */
function SogField({
    label,
    value,
    onValueChange,
}: {
    label: string
    value: number
    onValueChange: (v: number) => void
}) {
    return (
        <div>
            <div className={styles.sogSubtitle}>{label}</div>
            <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => onValueChange(parseFloat(e.target.value || '0'))}
            />
        </div>
    )
}

/** SOG details section: sub-fields for Bow P/S, CCRP P/S, CCRP F/A, Stern P/S. */
export default function SogDetails({ sogDetails, onChange }: SogDetailsProps) {
    const fields: { key: keyof SOGDetailsType; label: string }[] = [
        { key: 'bowPS', label: 'Bow P/S' },
        { key: 'ccrpPS', label: 'CCRP P/S' },
        { key: 'ccrpFA', label: 'CCRP F/A' },
        { key: 'sternPS', label: 'Stern P/S' },
    ]

    const handleChange = (key: keyof SOGDetailsType, v: number) => {
        const unit: UnitNumber = { value: v, unit: 'knots', display: `${v} kn` }
        onChange({ [key]: unit })
    }

    return (
        <section className={styles.section}>
            <label>SOG (details)</label>
            <div className={styles.sogList}>
                {fields.map(({ key, label }) => (
                    <SogField
                        key={key}
                        label={label}
                        value={sogDetails?.[key]?.value ?? 0}
                        onValueChange={(v) => handleChange(key, v)}
                    />
                ))}
            </div>
        </section>
    )
}
