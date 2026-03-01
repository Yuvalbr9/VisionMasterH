import React, { useState } from 'react'
import { useApi } from '../hooks/useApi'
import './RightPanel.css'

const RightPanel: React.FC = () => {
  const { post } = useApi()
  const [mode, setMode] = useState('Ground Stabilised')
  const [rings, setRings] = useState('2 NM')
  const [alarmsOn, setAlarmsOn] = useState(true)

  async function apply() {
    try {
      await post('/radar/config', { mode, rings, alarmsOn })
    } catch (e) {
      console.warn('apply config failed', e)
    }
  }

  return (
    <div>
      <div className="control">
        <div className="small">Mode</div>
        <select value={mode} onChange={e=>setMode(e.target.value)}>
          <option>Ground Stabilised</option>
          <option>Sea Stabilised</option>
          <option>North Up</option>
        </select>
      </div>

      <div className="control">
        <div className="small">Rings</div>
        <select value={rings} onChange={e=>setRings(e.target.value)}>
          <option>0.5 NM</option>
          <option>1 NM</option>
          <option>2 NM</option>
          <option>4 NM</option>
        </select>
      </div>

      <div className="control">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div className="small">Alarms</div>
            <div style={{fontWeight:700,color:alarmsOn? '#7ee787' : '#ffd24a'}}>{alarmsOn? 'On':'Off'}</div>
          </div>
          <div>
            <label style={{display:'inline-flex',alignItems:'center',gap:6}}>
              <input type="checkbox" checked={alarmsOn} onChange={e=>setAlarmsOn(e.target.checked)} />
              <span className="small">Enable</span>
            </label>
          </div>
        </div>
      </div>

      <div style={{display:'flex',gap:8}}>
        <button onClick={apply}>Apply</button>
        <button onClick={()=>post('/radar/ping', {})}>Ping</button>
      </div>
    </div>
  )
}

export default RightPanel
