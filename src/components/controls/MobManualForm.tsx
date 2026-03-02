import React from 'react'
import type { MOBManual } from '../../types/telemetry'
import { formatSeconds } from '../../utils/formatters'
import TimerInput from './TimerInput'
import styles from './RightControls.module.css'

type MobManualFormProps = {
    mobManual: MOBManual | undefined
    onChangeField: (patch: Partial<MOBManual>) => void
}

/** Manual-entry form for MOB fields: bearing, range, and timer. */
export default function MobManualForm({ mobManual, onChangeField }: MobManualFormProps) {
    return (
        <div className={styles.mobManualForm}>
            <label>Bearing (R)</label>
            <input
                type="number"
                value={mobManual?.bearingR ?? ''}
                disabled
                placeholder="---"
            />

            <label>Bearing (T)</label>
            <input
                type="number"
                value={mobManual?.bearingT ?? ''}
                disabled
                placeholder="---"
            />

            <label>Range (NM)</label>
            <div className={styles.rangeInput}>
                <input
                    type="number"
                    step="0.1"
                    value={mobManual?.range?.value ?? 0}
                    onChange={(e) => {
                        const v = parseFloat(e.target.value || '0')
                        onChangeField({ range: { value: v, unit: 'NM', display: `${v} NM` } })
                    }}
                />
                <div className={styles.rangeInputUnit}>NM</div>
            </div>

            <label>Elapsed Time (stop after)</label>
            <div className={styles.elapsedInput}>
                <TimerInput
                    valueSeconds={mobManual?.stopAfterSeconds?.value ?? 0}
                    onCommit={(seconds) => {
                        onChangeField({
                            stopAfterSeconds: {
                                value: seconds,
                                unit: 's',
                                display: formatSeconds(seconds),
                            },
                        })
                    }}
                />
            </div>
        </div>
    )
}
