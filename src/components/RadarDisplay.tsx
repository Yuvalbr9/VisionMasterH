import React, { useRef, useEffect, useState, useMemo } from 'react';

interface RadarPoint {
  angle: number; // degrees
  distance: number; // 0-1 normalized
  intensity: number; // 0-1 for fade effect
}

interface NavigationData {
  hdg: number;
  stw: number;
  sog: number;
  cog: number;
  posLat: string;
  posLon: string;
  ccrpPS: number;
  ccrpFA: number;
  stemPS: number;
}

interface RadarDisplayProps {
  navData: NavigationData;
}

export const RadarDisplay: React.FC<RadarDisplayProps> = ({ navData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sweepAngle, setSweepAngle] = useState(0);

  // Static yellow dots - generated once
  const radarTracks: RadarPoint[][] = useMemo(() => [
    // Just some scattered dots in fixed positions
    Array.from({ length: 30 }, (_, i) => ({
      angle: (i * 37) % 360,
      distance: 0.3 + ((i * 13) % 50) / 100,
      intensity: 1.0,
    })),
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(centerX, centerY) - 20;

      // Clear canvas - transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw radar background circle only
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      bgGradient.addColorStop(0, 'rgba(30, 20, 50, 0.9)');
      bgGradient.addColorStop(1, 'rgba(15, 10, 30, 1)');
      ctx.fillStyle = bgGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw brighter range rings
      for (let i = 1; i <= 7; i++) {
        const radius = (maxRadius / 7) * i;
        
        // Outer glow
        ctx.strokeStyle = `rgba(120, 180, 200, ${0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Main line - brighter
        ctx.strokeStyle = `rgba(150, 200, 220, ${0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw brighter radial lines
      ctx.strokeStyle = 'rgba(120, 180, 200, 0.4)';
      ctx.lineWidth = 1;
      for (let angle = 0; angle < 360; angle += 30) {
        const rad = (angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + maxRadius * Math.sin(rad),
          centerY - maxRadius * Math.cos(rad)
        );
        ctx.stroke();
      }

      // Draw brighter degree markers
      ctx.fillStyle = '#e8f4ff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 3;
      
      for (let angle = 0; angle < 360; angle += 30) {
        const rad = (angle * Math.PI) / 180;
        const x = centerX + (maxRadius + 15) * Math.sin(rad);
        const y = centerY - (maxRadius + 15) * Math.cos(rad);
        ctx.fillText(`${angle}°`, x, y);
      }
      
      ctx.shadowBlur = 0;

      // Draw radar tracks as natural clustered returns
      radarTracks.forEach((track) => {
        track.forEach((point, index) => {
          const rad = (point.angle * Math.PI) / 180;
          const r = point.distance * maxRadius;
          const x = centerX + r * Math.sin(rad);
          const y = centerY - r * Math.cos(rad);

          // Small subtle glow
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
          glowGradient.addColorStop(0, 'rgba(255, 230, 80, 0.8)');
          glowGradient.addColorStop(0.6, 'rgba(255, 220, 60, 0.4)');
          glowGradient.addColorStop(1, 'rgba(255, 200, 40, 0)');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();

          // Small core dot
          ctx.fillStyle = 'rgba(255, 240, 100, 0.9)';
          ctx.fillRect(x - 1, y - 1, 2, 2);
        });
      });

      // Draw rotating sweep beam (slower rotation)
      const sweepRad = (sweepAngle * Math.PI) / 180;
      const sweepGradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + maxRadius * Math.sin(sweepRad),
        centerY - maxRadius * Math.cos(sweepRad)
      );
      sweepGradient.addColorStop(0, 'rgba(0, 255, 150, 0.6)');
      sweepGradient.addColorStop(0.3, 'rgba(0, 255, 150, 0.25)');
      sweepGradient.addColorStop(1, 'rgba(0, 255, 150, 0)');
      
      ctx.strokeStyle = sweepGradient;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + maxRadius * Math.sin(sweepRad),
        centerY - maxRadius * Math.cos(sweepRad)
      );
      ctx.stroke();

      // Sweep trail effect (brighter)
      for (let i = 1; i <= 12; i++) {
        const trailAngle = sweepAngle - i * 4;
        const trailRad = (trailAngle * Math.PI) / 180;
        const alpha = 0.15 * (1 - i / 12);
        ctx.strokeStyle = `rgba(0, 255, 150, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + maxRadius * Math.sin(trailRad),
          centerY - maxRadius * Math.cos(trailRad)
        );
        ctx.stroke();
      }

      // Draw center point with brighter pulsing effect
      const pulse = Math.sin(Date.now() / 500) * 0.3 + 0.7;
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 10);
      centerGradient.addColorStop(0, `rgba(50, 255, 150, ${pulse})`);
      centerGradient.addColorStop(0.5, `rgba(50, 255, 150, ${pulse * 0.6})`);
      centerGradient.addColorStop(1, 'rgba(50, 255, 150, 0)');
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#66ffaa';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw EBL lines (Electronic Bearing Lines) with brighter glow
      ctx.setLineDash([8, 8]);
      
      // EBL 1 glow
      ctx.strokeStyle = 'rgba(80, 255, 160, 0.5)';
      ctx.lineWidth = 4;
      const ebl1Angle = 135;
      const ebl1Rad = (ebl1Angle * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + maxRadius * Math.sin(ebl1Rad),
        centerY - maxRadius * Math.cos(ebl1Rad)
      );
      ctx.stroke();
      
      // EBL 1 main line - brighter
      ctx.strokeStyle = '#66ffaa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + maxRadius * Math.sin(ebl1Rad),
        centerY - maxRadius * Math.cos(ebl1Rad)
      );
      ctx.stroke();

      ctx.setLineDash([]);

      // Update sweep angle (very slow rotation speed)
      setSweepAngle((prev) => (prev + 0.08) % 360);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [sweepAngle]);

  return (
    <div className="radar-display">
      <div className="radar-top-info-form">
        <div className="radar-info-line">
          <span className="radar-label">HDG</span>
          <span className="radar-value-small">{navData.hdg.toFixed(1)}°</span>
          <button className="radar-btn-small">Gyro</button>
        </div>
        <div className="radar-info-line">
          <span className="radar-label">STW</span>
          <span className="radar-value-small">{navData.stw.toFixed(1)} kn</span>
          <button className="radar-btn-small">Log</button>
        </div>
        <div className="radar-info-line">
          <span className="radar-label">SOG</span>
          <span className="radar-value-small">{navData.sog.toFixed(1)} kn</span>
          <span className="radar-label-small">GPS</span>
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="radar-canvas"
      />

      <div className="radar-bottom-controls">
        <div className="form-title">Radar Controls</div>
        <button className="control-btn">Enhance Off</button>
        
        <div className="gain-control">
          <span>Gain</span>
          <input type="range" min="0" max="100" defaultValue="50" />
        </div>
        
        <div className="gain-control">
          <span>Save Value</span>
          <input type="range" min="0" max="100" defaultValue="50" />
        </div>
        
        <button className="control-btn">Main</button>
        <button className="control-btn">AFG</button>
        
        <div className="tune-control">
          <span>Tune & Attune</span>
          <button className="tune-btn">Manual</button>
        </div>
      </div>
    </div>
  );
};
