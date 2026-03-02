import React from 'react'
import styles from './RadarPPI.module.css'

type CompassRoseProps = {
    heading: number
}

/** SVG overlay: compass tick marks, North label, and heading line. */
export default function CompassRose({ heading }: CompassRoseProps) {
    const TICKS = 72 // every 5°
    const OUTER_R = 48

    return (
        <svg
            className={styles.svg}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
        >
            <g transform="translate(50,50)">
                {/* Outer ring */}
                <circle
                    cx="0"
                    cy="0"
                    r={OUTER_R}
                    stroke="rgba(255,255,255,0.06)"
                    fill="none"
                />

                {/* Tick marks every 5° */}
                {Array.from({ length: TICKS }, (_, i) => {
                    const deg = i * 5
                    const len = deg % 30 === 0 ? 4 : 2
                    const rad = ((deg - heading) * Math.PI) / 180
                    const x1 = Math.cos(rad) * OUTER_R
                    const y1 = Math.sin(rad) * OUTER_R
                    const x2 = Math.cos(rad) * (OUTER_R - len)
                    const y2 = Math.sin(rad) * (OUTER_R - len)
                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            strokeWidth={0.3}
                            stroke="rgba(200,255,200,0.5)"
                        />
                    )
                })}

                {/* North label */}
                <text
                    x="0"
                    y="-40"
                    textAnchor="middle"
                    fontSize="4"
                    fill="rgba(255,255,255,0.7)"
                >
                    N
                </text>

                {/* Heading line (bright green) */}
                <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2={-OUTER_R}
                    stroke="#3ee27a"
                    strokeWidth={0.8}
                    transform={`rotate(${heading})`}
                />
            </g>
        </svg>
    )
}
