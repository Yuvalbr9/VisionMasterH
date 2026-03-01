import React, { useEffect, useRef } from 'react'
import type { Telemetry } from '../hooks/useNavigationData'

type Props = { telemetry: Telemetry }

const clamp = (v:number, a:number,b:number)=> Math.max(a, Math.min(b,v))

const RadarPPI: React.FC<Props> = ({ telemetry }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sweepRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0

    const resize = () => {
      const parent = canvas.parentElement!
      const size = Math.min(parent.clientWidth, parent.clientHeight)
      canvas.width = size * devicePixelRatio
      canvas.height = size * devicePixelRatio
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)
    }

    const noiseCanvas = document.createElement('canvas')
    const nCtx = noiseCanvas.getContext('2d')!

    const genNoise = () => {
      const s = canvas.width
      noiseCanvas.width = s
      noiseCanvas.height = s
      const image = nCtx.createImageData(s, s)
      for (let i = 0; i < image.data.length; i += 4) {
        const v = (Math.random() * 255)|0
        image.data[i] = v
        image.data[i+1] = (v*0.85)|0
        image.data[i+2] = (v*0.4)|0
        image.data[i+3] = 30
      }
      nCtx.putImageData(image, 0, 0)
    }

    resize()
    genNoise()

    const draw = (t:number) => {
      const size = canvas.width / devicePixelRatio
      const cx = size/2
      const cy = size/2
      const radius = size/2 * 0.98

      // clear with very dark radial vignette (glass)
      ctx.clearRect(0,0,size,size)
      const g = ctx.createRadialGradient(cx,cy, radius*0.1, cx,cy, radius)
      g.addColorStop(0, '#031021')
      g.addColorStop(1, '#000814')
      ctx.fillStyle = g
      ctx.fillRect(0,0,size,size)

      // draw noise (landmass) - tinted amber
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.globalAlpha = 0.7
      ctx.drawImage(noiseCanvas, 0, 0, size, size)
      ctx.restore()

      // range rings
      ctx.save()
      ctx.strokeStyle = 'rgba(200,255,200,0.15)'
      ctx.lineWidth = 1
      ctx.setLineDash([2,6])
      for (let i=1;i<=5;i++){
        ctx.beginPath()
        ctx.arc(cx,cy, (radius/5)*i,0,Math.PI*2)
        ctx.stroke()
      }
      ctx.restore()

      // sweeping beam with trail
      sweepRef.current = (sweepRef.current + 0.6) % 360
      const angle = sweepRef.current * Math.PI/180

      // phosphor trail: draw multiple fades
      for (let i=0;i<50;i++){
        const a = angle - i*0.02
        const alpha = clamp(0.8 * Math.exp(-i*0.08), 0, 0.8)
        const grad = ctx.createLinearGradient(cx,cy, cx + Math.cos(a)*radius, cy + Math.sin(a)*radius)
        grad.addColorStop(0, `rgba(120,255,120,${alpha*0.12})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.strokeStyle = grad as any
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(cx,cy)
        ctx.lineTo(cx + Math.cos(a)*radius, cy + Math.sin(a)*radius)
        ctx.stroke()
      }

      // targets removed — radar shows static background and moving sweep only

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [telemetry])

  return (
    <div className="radar-wrap">
      <div className="radar-canvas">
        <canvas ref={canvasRef} />
        <svg className="radar-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(50,50)">
            {/* Compass rose outer ring with ticks every 30 degrees and N marker */}
            <circle cx="0" cy="0" r="48" stroke="rgba(255,255,255,0.06)" fill="none" />
            {[...Array(72)].map((_,i)=>{
              const deg = i*5
              const len = (deg%30===0)?4:2
              const x1 = Math.cos((deg-telemetry.Heading)*Math.PI/180)*48
              const y1 = Math.sin((deg-telemetry.Heading)*Math.PI/180)*48
              const x2 = Math.cos((deg-telemetry.Heading)*Math.PI/180)*(48-len)
              const y2 = Math.sin((deg-telemetry.Heading)*Math.PI/180)*(48-len)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={0.3} stroke="rgba(200,255,200,0.5)" />
            })}
            <text x="0" y="-40" textAnchor="middle" fontSize="4" fill="rgba(255,255,255,0.7)">N</text>

            {/* Heading Line (HL) - bright green */}
            <line x1="0" y1="0" x2="0" y2="-48" stroke="#3ee27a" strokeWidth={0.8} transform={`rotate(${telemetry.Heading})`} />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default RadarPPI
