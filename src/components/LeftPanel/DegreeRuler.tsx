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

        const W = canvas.width;
        const H = canvas.height;

        // We don't fill a background here to let CSS panel background show through.
        ctx.clearRect(0, 0, W, H);

        // Fine top border line
        ctx.strokeStyle = '#5a4080';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(W, 0);
        ctx.stroke();

        const degreesVisible = 50; // how many degrees visible
        const pixelsPerDeg = W / degreesVisible;
        const centerX = W / 2;
        const startDeg = value - degreesVisible / 2;

        const firstWholeDeg = Math.ceil(startDeg);

        for (let deg = firstWholeDeg; deg <= startDeg + degreesVisible + 1; deg++) {
            const normalizedDeg = ((deg % 360) + 360) % 360;
            const x = centerX + (deg - value) * pixelsPerDeg;

            if (x < -2 || x > W + 2) continue;

            const isMajor = normalizedDeg % 10 === 0;
            const isMid = normalizedDeg % 5 === 0 && !isMajor;

            // Tick heights
            const tickH = isMajor ? H * 0.5 : isMid ? H * 0.3 : H * 0.18;
            const tickBottom = H;

            ctx.lineWidth = isMajor ? 1.5 : 0.8;
            ctx.strokeStyle = '#9090c0';
            ctx.beginPath();
            ctx.moveTo(x, tickBottom);
            ctx.lineTo(x, tickBottom - tickH);
            ctx.stroke();

            if (isMajor) {
                // Display 3-digit label
                const label = normalizedDeg === 0 ? '000' : normalizedDeg.toString().padStart(3, '0').slice(0, 3);
                ctx.font = `bold ${Math.max(8, H * 0.33)}px var(--font-family-sans, Arial)`;
                ctx.fillStyle = '#c0c0d8';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(label, x, H * 0.05);
            }
        }

        // Bright green vertical line dropping down from the center
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, H);
        ctx.stroke();

        // Wide, flat green downward-pointing triangle at top center
        const triW = W * 0.12; // wide triangle
        const triH = H * 0.3;  // relatively flat

        ctx.fillStyle = '#00ff00';
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(centerX - triW / 2, 0); // top left edge
        ctx.lineTo(centerX + triW / 2, 0); // top right edge
        ctx.lineTo(centerX, triH);         // bottom tip
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

    }, [value]);

    return (
        <canvas
            ref={canvasRef}
            width={500}
            height={36}
            style={{ width: '100%', height: '2.8vh', minHeight: '26px', display: 'block' }}
        />
    );
};
