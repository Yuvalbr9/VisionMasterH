import React from 'react'
import styles from './LeftTelemetry.module.css'
import DegSlider from './DegSlider'

type CogSliderProps = {
    cog: number
    onChange: (value: number) => void
}

/** COG section: displays the current COG and a range slider. */
export default function CogSlider({ cog, onChange }: CogSliderProps) {
    return (
        <DegSlider deg={cog} onChange={onChange} name="COG" />
    )
}
