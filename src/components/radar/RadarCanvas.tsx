import React from 'react'
import { useRadarCanvas } from './useRadarCanvas'

/** Renders the animated radar canvas (background, noise, rings, sweep). */
export default function RadarCanvas() {
    const canvasRef = useRadarCanvas()
    return <canvas ref={canvasRef} />
}
