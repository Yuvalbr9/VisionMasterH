import React, { useState } from 'react'
import { useApi } from '../hooks/useApi'
import './LeftPanel.css'

const LeftPanel: React.FC = () => {
  const { post } = useApi()
  const [hdg, setHdg] = useState<number>(289)
  const [stw, setStw] = useState<number>(10.8)
  const [pos, setPos] = useState<string>("40°27.269'N, 73°49.490'W")

  async function pushUpdate() {
    try {
      await post('/navigation/update', { hdg, stw, pos })
    } catch (e) {
      console.warn('push update failed', e)
    }
  }

  return (
    <div>
      <div className="panel-section">
        <div className="stat">
          <div>
            <div className="label">HDG</div>
            <div className="value">{hdg.toFixed(1)}°</div>
          </div>
          <div className="small">GPS</div>
        </div>

        <div className="stat">
          <div>
            <div className="label">STW</div>
            <div className="value">{stw.toFixed(1)} kn</div>
          </div>
          <div className="small">Log</div>
        </div>

        <div className="stat">
          <div>
            <div className="label">POS</div>
            <div className="value">{pos}</div>
          </div>
          <div className="small">GPS</div>
        </div>
      </div>

      <div className="panel-section">
        <div className="small">Manual Controls</div>
        <div style={{display:'grid',gap:8}}>
          <label className="small">Heading</label>
          <input type="range" min={0} max={360} value={hdg} onChange={e=>setHdg(Number(e.target.value))} />
          <label className="small">Speed (kn)</label>
          <input type="number" value={stw} step={0.1} onChange={e=>setStw(Number(e.target.value))} />
          <label className="small">Position</label>
          <input value={pos} onChange={e=>setPos(e.target.value)} />
          <div style={{display:'flex',gap:8}}>
            <button onClick={pushUpdate}>Send</button>
            <button onClick={()=>{ setHdg(289); setStw(10.8); setPos("40°27.269'N, 73°49.490'W")}}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
