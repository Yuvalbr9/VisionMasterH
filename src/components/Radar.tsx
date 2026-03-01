import React from 'react'
import './Radar.css'

const Radar: React.FC = () => {
  // A more detailed static SVG radar with ticks, labels, rings and sample targets
  const trace = 'M180 450 C230 360 290 320 360 300 C430 280 520 260 600 240'
  const targets = [
    { x: 220, y: 480 }, { x: 140, y: 380 }, { x: 200, y: 300 }, { x: 460, y: 200 }, { x: 600, y: 320 }
  ]

  const ticks = Array.from({length:36}).map((_,i)=> i*10)

  return (
    <div className="radar-wrap">
      <svg viewBox="0 0 800 800" className="radar-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="g" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#0f2a2a" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#071022" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        <g>
          <rect x="0" y="0" width="800" height="800" fill="url(#g)" rx="12" />
          {[1,2,3,4,5].map((i)=> (
            <circle key={i} className="ring" cx="400" cy="400" r={i*70} strokeDasharray={i%2? '6 6' : '2 6'} />
          ))}

          {/* compass ticks */}
          {ticks.map((deg, idx)=> {
            const a = (deg-90) * Math.PI/180
            const x1 = 400 + Math.cos(a)*285
            const y1 = 400 + Math.sin(a)*285
            const x2 = 400 + Math.cos(a)*300
            const y2 = 400 + Math.sin(a)*300
            const isLabel = deg % 30 === 0
            return (
              <g key={idx}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={isLabel? 'rgba(230,238,248,0.5)' : 'rgba(255,255,255,0.03)'} />
                {isLabel && (
                  <text x={400 + Math.cos(a)*320} y={400 + Math.sin(a)*320} className="compass-label" textAnchor="middle" alignmentBaseline="middle">{deg}</text>
                )}
              </g>
            )
          })}

          <line x1="400" y1="400" x2="760" y2="400" stroke="rgba(255,255,255,0.03)" />

          {/* sample targets */}
          {targets.map((t,i)=> (
            <circle key={i} cx={t.x} cy={t.y} r={4} className="target" />
          ))}

          <circle cx="400" cy="400" r="6" className="center-dot" />
          <path d={trace} className="trace" />

          {/* sweep arc - placeholder */}
          <g transform="rotate(42 400 400)">
            <path d="M400 400 L780 400" className="sweep" />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Radar
