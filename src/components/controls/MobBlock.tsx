import React, { useState, useEffect } from 'react'
import type { Telemetry, MOBManual } from '../../types/telemetry'
import { formatSeconds } from '../../utils/formatters'
import MobManualForm from './MobManualForm'
import styles from './RightControls.module.css'

type MobBlockProps = {
    telemetry: Telemetry
    setTelemetry: (fn: any) => void
}

/** Man-overboard block: mode toggle, timer, start/stop, and manual form. */
export default function MobBlock({ telemetry, setTelemetry }: MobBlockProps) {
    const [mobActive, setMobActive] = useState(!!telemetry.MOBActive)
    const [elapsed, setElapsed] = useState(0)
    const [mobMode, setMobMode] = useState<'select' | 'manual'>('manual')

    useEffect(() => {
        setTelemetry((prev: Telemetry) => ({ ...prev, MOBActive: mobActive }))

        let timer: ReturnType<typeof setInterval> | undefined
        if (mobActive) {
            timer = setInterval(() => setElapsed((e) => e + 1), 1000)
        } else {
            setElapsed(0)
        }

        // Auto-stop when elapsed reaches the configured threshold
        const stopAfter = telemetry.MOBManual?.stopAfterSeconds?.value || 0
        if (mobActive && stopAfter > 0 && elapsed >= stopAfter) {
            setMobActive(false)
        }

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [mobActive, setTelemetry, elapsed, telemetry.MOBManual?.stopAfterSeconds])

    const handleManualFieldChange = (patch: Partial<MOBManual>) => {
        setTelemetry((prev: Telemetry) => ({
            ...prev,
            MOBManual: { ...(prev.MOBManual || {}), ...patch },
        }))
    }

    return (
        <div className={styles.mobBlock}>
            <div className={styles.mobHeader}>MAN OVERBOARD</div>

            <div className={styles.mobModeButtons}>
                <button
                    className={`${styles.mobModeBtn} ${mobMode === 'select' ? styles.mobModeBtnActive : ''}`}
                    onClick={() => setMobMode('select')}
                >
                    Select a position on chart
                </button>
                <button
                    className={`${styles.mobModeBtn} ${mobMode === 'manual' ? styles.mobModeBtnActive : ''}`}
                    onClick={() => setMobMode('manual')}
                >
                    Manual Edit
                </button>
            </div>

            <div className={styles.mobTimer}>{formatSeconds(elapsed)}</div>

            <button
                className={styles.mobStart}
                onClick={() => setMobActive((a) => !a)}
            >
                {mobActive ? 'STOP' : 'START'}
            </button>

            {mobMode === 'manual' && (
                <MobManualForm
                    mobManual={telemetry.MOBManual}
                    onChangeField={handleManualFieldChange}
                />
            )}
        </div>
    )
}
