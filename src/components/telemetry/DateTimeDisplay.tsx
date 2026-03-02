import React, { useEffect, useState } from 'react'
import styles from './LeftTelemetry.module.css'

/** Displays the current date and time, updating every second. */
export default function DateTimeDisplay() {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <div className={styles.dateTimeLabel}>Date &amp; Time</div>
            <div className={styles.dateTimeValue}>{now.toLocaleString()}</div>
        </>
    )
}
