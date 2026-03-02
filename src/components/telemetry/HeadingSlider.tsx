import React from 'react'
import styles from './LeftTelemetry.module.css'
import DegSlider from './DegSlider'

type HeadingSliderProps = {
    heading: number
    onChange: (value: number) => void
}

/** HDG section: displays the current heading and a range slider. */
export default function HeadingSlider({ heading, onChange }: HeadingSliderProps) {
    return (
        <DegSlider deg={heading} onChange={onChange} name="HDG" />
    )
}
