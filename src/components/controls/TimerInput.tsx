import React, { useEffect, useState } from 'react'
import { pad2 } from '../../utils/formatters'
import styles from './RightControls.module.css'

type TimerInputProps = {
    valueSeconds: number
    onCommit: (seconds: number) => void
}

/**
 * Segmented HH:MM:SS timer input.
 * Separated from RightControls to follow the React rule
 * of never defining components inside other components.
 */
export default function TimerInput({ valueSeconds, onCommit }: TimerInputProps) {
    const decompose = (s: number) => ({
        hh: pad2(Math.floor(s / 3600)),
        mm: pad2(Math.floor((s % 3600) / 60)),
        ss: pad2(s % 60),
    })

    const [hh, setHh] = useState(decompose(valueSeconds).hh)
    const [mm, setMm] = useState(decompose(valueSeconds).mm)
    const [ss, setSs] = useState(decompose(valueSeconds).ss)

    // Sync when external value changes
    useEffect(() => {
        const d = decompose(valueSeconds)
        setHh(d.hh)
        setMm(d.mm)
        setSs(d.ss)
    }, [valueSeconds])

    const handleSegmentChange = (value: string, setter: (s: string) => void) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 2)
        setter(cleaned.padStart(2, '0'))
    }

    const handleCommit = () => {
        const total =
            (parseInt(hh || '0') || 0) * 3600 +
            (parseInt(mm || '0') || 0) * 60 +
            (parseInt(ss || '0') || 0)
        onCommit(total)
    }

    const handleCancel = () => {
        const d = decompose(valueSeconds)
        setHh(d.hh)
        setMm(d.mm)
        setSs(d.ss)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={2}
                    className={styles.timerSeg}
                    value={hh}
                    onChange={(e) => handleSegmentChange(e.target.value, setHh)}
                />
                <div style={{ width: 6, textAlign: 'center' }}>:</div>
                <input
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={2}
                    className={styles.timerSeg}
                    value={mm}
                    onChange={(e) => handleSegmentChange(e.target.value, setMm)}
                />
                <div style={{ width: 6, textAlign: 'center' }}>:</div>
                <input
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={2}
                    className={styles.timerSeg}
                    value={ss}
                    onChange={(e) => handleSegmentChange(e.target.value, setSs)}
                />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button className={styles.timerSave} onClick={handleCommit}>
                    Save
                </button>
                <button className={styles.timerCancel} onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    )
}
