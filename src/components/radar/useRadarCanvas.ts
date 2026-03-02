import { useEffect, useRef } from 'react'
import { clamp } from '../../utils/formatters'

/**
 * Custom hook that handles all Canvas-based radar drawing:
 * background, noise texture, range rings, and sweep beam.
 *
 * Returns a ref to attach to the `<canvas>` element.
 */
export const useRadarCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const sweepRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        let raf = 0

        /* ── Resize to fit parent ────────────────────────── */
        const resize = () => {
            const parent = canvas.parentElement!
            const size = Math.min(parent.clientWidth, parent.clientHeight)
            canvas.width = size * devicePixelRatio
            canvas.height = size * devicePixelRatio
            canvas.style.width = `${size}px`
            canvas.style.height = `${size}px`
            ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
        }

        /* ── Noise texture (landmass tint) ───────────────── */
        const noiseCanvas = document.createElement('canvas')
        const nCtx = noiseCanvas.getContext('2d')!

        const generateNoise = () => {
            const s = canvas.width
            noiseCanvas.width = s
            noiseCanvas.height = s
            const image = nCtx.createImageData(s, s)
            for (let i = 0; i < image.data.length; i += 4) {
                const v = (Math.random() * 255) | 0
                image.data[i] = v
                image.data[i + 1] = (v * 0.85) | 0
                image.data[i + 2] = (v * 0.4) | 0
                image.data[i + 3] = 30
            }
            nCtx.putImageData(image, 0, 0)
        }

        resize()
        generateNoise()

        /* ── Animation loop ──────────────────────────────── */
        const draw = () => {
            const size = canvas.width / devicePixelRatio
            const cx = size / 2
            const cy = size / 2
            const radius = (size / 2) * 0.98

            // Background vignette
            ctx.clearRect(0, 0, size, size)
            const gradient = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius)
            gradient.addColorStop(0, '#031021')
            gradient.addColorStop(1, '#000814')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, size, size)

            // Noise layer
            ctx.save()
            ctx.globalCompositeOperation = 'lighter'
            ctx.globalAlpha = 0.7
            ctx.drawImage(noiseCanvas, 0, 0, size, size)
            ctx.restore()

            // Range rings
            ctx.save()
            ctx.strokeStyle = 'rgba(200,255,200,0.15)'
            ctx.lineWidth = 1
            ctx.setLineDash([2, 6])
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath()
                ctx.arc(cx, cy, (radius / 5) * i, 0, Math.PI * 2)
                ctx.stroke()
            }
            ctx.restore()

            // Sweep beam with phosphor trail
            sweepRef.current = (sweepRef.current + 0.6) % 360
            const angle = (sweepRef.current * Math.PI) / 180

            for (let i = 0; i < 50; i++) {
                const a = angle - i * 0.02
                const alpha = clamp(0.8 * Math.exp(-i * 0.08), 0, 0.8)
                const grad = ctx.createLinearGradient(
                    cx,
                    cy,
                    cx + Math.cos(a) * radius,
                    cy + Math.sin(a) * radius,
                )
                grad.addColorStop(0, `rgba(120,255,120,${alpha * 0.12})`)
                grad.addColorStop(1, 'rgba(0,0,0,0)')
                ctx.strokeStyle = grad as CanvasGradient
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(cx, cy)
                ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius)
                ctx.stroke()
            }

            raf = requestAnimationFrame(draw)
        }

        raf = requestAnimationFrame(draw)
        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return canvasRef
}
