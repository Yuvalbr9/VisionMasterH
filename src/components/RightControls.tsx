import React, { useState, useEffect } from 'react'
import type { Telemetry } from '../hooks/useNavigationData'

type Props = { telemetry: Telemetry; setTelemetry: (t:any)=>void }

const RightControls: React.FC<Props> = ({ telemetry, setTelemetry }) => {
  const [gain, setGain] = useState(50)
  const [rain, setRain] = useState(20)
  const [sea, setSea] = useState(15)
  const [mobActive, setMobActive] = useState(!!telemetry.MOBActive)
  const [elapsed, setElapsed] = useState(0)

  useEffect(()=>{
    let it: any
    setTelemetry((prev:any)=>({...prev, MOBActive: mobActive}))
    if (mobActive) {
      it = setInterval(()=> setElapsed(e=>e+1), 1000)
    } else {
      setElapsed(0)
    }
    // if manual stop specified, stop automatically when elapsed reaches it
    const stopAfter = telemetry.MOBManual?.stopAfterSeconds?.value || 0
    if (mobActive && stopAfter > 0 && elapsed >= stopAfter) {
      setMobActive(false)
    }
    return ()=> clearInterval(it)
  },[mobActive, setTelemetry, elapsed, telemetry.MOBManual?.stopAfterSeconds])

  const fmt = (s:number) => new Date(s*1000).toISOString().substr(11,8)

  const [mobMode, setMobMode] = useState<'select' | 'manual'>('manual')

  const setManualField = (patch:Partial<{bearingR:number|undefined; bearingT:number|undefined; range:{value:number;unit:string;display:string}; stopAfterSeconds:{value:number;unit:string;display:string}}>) => {
    setTelemetry((prev:any)=> ({
      ...prev,
      MOBManual: {...(prev.MOBManual||{}), ...patch}
    }))
  }

  // helper to format seconds to HH:MM:SS
  const formatSeconds = (s:number) => {
    const h = Math.floor(s/3600)
    const m = Math.floor((s%3600)/60)
    const sec = s%60
    return [h,m,sec].map(v=>v.toString().padStart(2,'0')).join(':')
  }

  // Segmented timer input - three fixed fields (HH, MM, SS)
  const TimerInput: React.FC<{valueSeconds:number; onCommit:(s:number)=>void}> = ({valueSeconds, onCommit}) => {
    const pad = (n:number) => n.toString().padStart(2,'0')
    const h0 = Math.floor(valueSeconds/3600)
    const m0 = Math.floor((valueSeconds%3600)/60)
    const s0 = valueSeconds%60
    const [hh, setHh] = useState<string>(pad(h0))
    const [mm, setMm] = useState<string>(pad(m0))
    const [ss, setSs] = useState<string>(pad(s0))

    // sync when external value changes
    useEffect(()=>{
      const h = Math.floor(valueSeconds/3600)
      const m = Math.floor((valueSeconds%3600)/60)
      const s = valueSeconds%60
      setHh(pad(h)); setMm(pad(m)); setSs(pad(s))
    }, [valueSeconds])

    const commit = () => {
      const hv = parseInt(hh||'0') || 0
      const mv = parseInt(mm||'0') || 0
      const sv = parseInt(ss||'0') || 0
      const total = hv*3600 + mv*60 + sv
      onCommit(total)
    }

    const onSegChange = (v:string, setFn:(s:string)=>void) => {
      // filter non-digits, limit to 2 chars
      const cleaned = v.replace(/\D/g,'').slice(0,2)
      setFn(cleaned.padStart(2,'0'))
    }

    return (
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <input inputMode="numeric" pattern="\d*" maxLength={2} className="timer-seg" value={hh} onChange={e=>onSegChange(e.target.value,setHh)} />
          <div style={{width:6,textAlign:'center'}}>:</div>
          <input inputMode="numeric" pattern="\d*" maxLength={2} className="timer-seg" value={mm} onChange={e=>onSegChange(e.target.value,setMm)} />
          <div style={{width:6,textAlign:'center'}}>:</div>
          <input inputMode="numeric" pattern="\d*" maxLength={2} className="timer-seg" value={ss} onChange={e=>onSegChange(e.target.value,setSs)} />
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="timer-save" onClick={()=>commit()}>Save</button>
          <button className="timer-cancel" onClick={()=>{
            // reset to external value
            const h = Math.floor(valueSeconds/3600)
            const m = Math.floor((valueSeconds%3600)/60)
            const s = valueSeconds%60
            setHh(pad(h)); setMm(pad(m)); setSs(pad(s))
          }}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="right-stack">
      <div className="mob-block">
        <div className="mob-header">MAN OVERBOARD</div>
        <div className="mob-mode-buttons">
          <button className={`mob-mode-btn ${mobMode==='select'?'active':''}`} onClick={()=>setMobMode('select')}>Select a position on chart</button>
          <button className={`mob-mode-btn ${mobMode==='manual'?'active':''}`} onClick={()=>setMobMode('manual')}>Manual Edit</button>
        </div>
        <div className="mob-timer">{fmt(elapsed)}</div>
        <button className="mob-start" onClick={()=> setMobActive(a=>!a)}>{mobActive? 'STOP':'START'}</button>

        {mobMode==='manual' && (
          <div className="mob-manual-form">
            <label>Bearing (R)</label>
            <input type="number" value={telemetry.MOBManual?.bearingR ?? ''} disabled placeholder="---" />

            <label>Bearing (T)</label>
            <input type="number" value={telemetry.MOBManual?.bearingT ?? ''} disabled placeholder="---" />

            <label>Range (NM)</label>
            <div className="range-input">
              <input type="number" step="0.1" value={telemetry.MOBManual?.range?.value ?? 0} onChange={e=>{
                const v = parseFloat(e.target.value||'0')
                setManualField({ range: { value: v, unit: 'NM', display: `${v} NM` } })
              }} />
              <div className="unit">NM</div>
            </div>

                <label>Elapsed Time (stop after)</label>
                <div className="elapsed-input">
                  <TimerInput valueSeconds={telemetry.MOBManual?.stopAfterSeconds?.value ?? 0} onCommit={(seconds)=>{
                    const formatted = formatSeconds(seconds)
                    setManualField({ stopAfterSeconds: { value: seconds, unit: 's', display: formatted } })
                  }} />
                </div>
          </div>
        )}
      </div>

      <div className="sliders">
        <label>GAIN <span className="pct">{gain}%</span></label>
        <input type="range" min={0} max={100} value={gain} onChange={e=>setGain(parseInt(e.target.value))} />
        <label>RAIN <span className="pct">{rain}%</span></label>
        <input type="range" min={0} max={100} value={rain} onChange={e=>setRain(parseInt(e.target.value))} />
        <label>SEA <span className="pct">{sea}%</span></label>
        <input type="range" min={0} max={100} value={sea} onChange={e=>setSea(parseInt(e.target.value))} />
      </div>

      <div className="ebl-vrm">
        <div className="ebl-header">EBL / VRM</div>
        <table>
          <thead><tr><th>EBL</th><th>VRM</th><th>Unit</th><th></th></tr></thead>
          <tbody>
            <tr><td>045°</td><td>2.0</td><td>NM</td><td className="edit">✎</td></tr>
            <tr><td>120°</td><td>4.0</td><td>NM</td><td className="edit">✎</td></tr>
            <tr><td>210°</td><td>6.0</td><td>NM</td><td className="edit">✎</td></tr>
            <tr><td>300°</td><td>8.0</td><td>NM</td><td className="edit">✎</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RightControls
