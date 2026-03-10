import React, { useRef, useEffect } from 'react';

interface DegreeRulerProps {
    value: number; // current degree value (e.g. 289.0)
}

/**
 * Renders a degree ruler matching the PCVM reference:
 * - Dense tick marks (every 1°), major ticks + labels every 10°
 * - Wide, flat green downward triangle indicator at the top center
 * - A bright green vertical line extending from the tip of the triangle downward
 */
export const DegreeRuler: React.FC<DegreeRulerProps> = ({ value }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const drawRuler = () => {
            const bounds = canvas.getBoundingClientRect();
            const width = Math.max(220, Math.floor(bounds.width || 500));
            const height = Math.max(24, Math.floor(bounds.height || 36));
            const dpr = window.devicePixelRatio || 1;
            const pixelWidth = Math.floor(width * dpr);
            const pixelHeight = Math.floor(height * dpr);

            if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
                canvas.width = pixelWidth;
                canvas.height = pixelHeight;
            }

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // We don't fill a background here to let CSS panel background show through.
            ctx.clearRect(0, 0, width, height);

            // Fine top border line
            ctx.strokeStyle = '#5a4080';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(width, 0);
            ctx.stroke();

            const degreesVisible = 50; // how many degrees visible
            const pixelsPerDeg = width / degreesVisible;
            const centerX = width / 2;
            const startDeg = value - degreesVisible / 2;

            const firstWholeDeg = Math.ceil(startDeg);

            for (let deg = firstWholeDeg; deg <= startDeg + degreesVisible + 1; deg++) {
                const normalizedDeg = ((deg % 360) + 360) % 360;
                const x = centerX + (deg - value) * pixelsPerDeg;

                if (x < -2 || x > width + 2) continue;

                const isMajor = normalizedDeg % 10 === 0;
                const isMid = normalizedDeg % 5 === 0 && !isMajor;

                // Tick heights
                const tickH = isMajor ? height * 0.5 : isMid ? height * 0.3 : height * 0.18;

                // Bottom ticks
                ctx.lineWidth = isMajor ? 1.5 : 0.8;
                ctx.strokeStyle = '#9090c0';
                ctx.beginPath();
                ctx.moveTo(x, height);
                ctx.lineTo(x, height - tickH);
                ctx.stroke();

                // Top ticks (descending from the upper border)
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, tickH);
                ctx.stroke();

                if (isMajor) {
                    // Display 3-digit label in the middle, pushed down slightly by top ticks
                    const label = normalizedDeg === 0 ? '000' : normalizedDeg.toString().padStart(3, '0').slice(0, 3);
                    ctx.font = `bold ${Math.max(8, height * 0.33)}px var(--font-family-mono)`; // Using mono for rulers
                    ctx.fillStyle = '#c0c0d8';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(label, x, height / 2);
                }
            }

            // Bright green vertical line dropping down from the center
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, height);
            ctx.stroke();

            // Wide, flat green downward-pointing triangle at top center
            const triW = width * 0.12; // wide triangle
            const triH = height * 0.2; // relatively flat

            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(centerX - triW / 2, 0); // top left edge
            ctx.lineTo(centerX + triW / 2, 0); // top right edge
            ctx.lineTo(centerX, triH); // bottom tip
            ctx.closePath();

            ctx.fill();
            ctx.stroke();
        };

        drawRuler();
        window.addEventListener('resize', drawRuler);
        return () => window.removeEventListener('resize', drawRuler);
    }, [value]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: 'clamp(36px, 4.5vh, 50px)', display: 'block', marginTop: '4px' }}
        />
    );
};
