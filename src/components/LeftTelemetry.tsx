import React, { useEffect, useState } from 'react'
import type { Telemetry, UnitNumber } from '../hooks/useNavigationData'

type Props = { telemetry: Telemetry; setTelemetry: (t:any)=>void }

const LeftTelemetry: React.FC<Props> = ({ telemetry, setTelemetry }) => {
  const [now, setNow] = useState(new Date())

  useEffect(()=>{
    const id = setInterval(()=> setNow(new Date()), 1000)
    return ()=> clearInterval(id)
  },[])

  const setHeading = (v:number) => {
    const nv = ((v % 360) + 360) % 360
    setTelemetry((prev:any)=> ({...prev, Heading: nv}))
  }

  const setCOG = (v:number) => {
    const nv = ((v % 360) + 360) % 360
    setTelemetry((prev:any)=> ({...prev, COG: nv}))
  }

  const setSTW = (u:UnitNumber) => setTelemetry((prev:any)=> ({...prev, SpeedThroughWater: u}))

  const setPOS = (lat:string, lon:string) => setTelemetry((prev:any)=> ({...prev, Latitude: lat, Longitude: lon}))

  const setSOGDetails = (patch: Partial<Record<string,UnitNumber>>) => {
    setTelemetry((prev:any)=> ({...prev, SOGDetails: {...(prev.SOGDetails||{}), ...patch}}))
  }

  return (
    <div style={{padding:8,fontFamily:'JetBrains Mono'}}>

      <section style={{marginBottom:12}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <label>HDG</label>
          <div style={{fontSize:14}}>{telemetry.Heading.toFixed(1)}°</div>
        </div>
        <input type="range" min={0} max={359} value={Math.round(telemetry.Heading)} onChange={e=>setHeading(parseInt(e.target.value))} />
        <div style={{display:'flex',justifyContent:'space-between',fontSize:12,opacity:0.7}}>
          <div>000</div><div>090</div><div>180</div><div>270</div><div>359</div>
        </div>
      </section>

      <section style={{marginBottom:12}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <label>STW</label>
          <div style={{fontSize:14}}>{telemetry.SpeedThroughWater.display}</div>
        </div>
        <div style={{display:'flex',gap:8,marginTop:6}}>
          <input type="number" step="0.1" value={telemetry.SpeedThroughWater.value} onChange={e=>{
            const v = parseFloat(e.target.value||'0')
            setSTW({value: v, unit: 'knots', display: `${v} kn`})
          }} />
          <div style={{alignSelf:'center',opacity:0.7}}>kn</div>
        </div>
      </section>

      <section style={{marginBottom:12}}>
        <label>POS</label>
        <div style={{display:'flex',flexDirection:'column',gap:6,marginTop:6}}>
          <input value={telemetry.Latitude} onChange={e=> setPOS(e.target.value, telemetry.Longitude)} />
          <input value={telemetry.Longitude} onChange={e=> setPOS(telemetry.Latitude, e.target.value)} />
        </div>
      </section>

      <section style={{marginBottom:12}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <label>COG</label>
          <div style={{fontSize:14}}>{telemetry.COG.toFixed(1)}°</div>
        </div>
        <input type="range" min={0} max={359} value={Math.round(telemetry.COG)} onChange={e=>setCOG(parseInt(e.target.value))} />
        <div style={{display:'flex',justifyContent:'space-between',fontSize:12,opacity:0.7}}>
          <div>000</div><div>090</div><div>180</div><div>270</div><div>359</div>
        </div>
      </section>

      <section style={{marginBottom:12}}>
        <label>SOG (details)</label>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:6}}>
          <div>
            <div style={{fontSize:12,opacity:0.7}}>Bow P/S</div>
            <input type="number" step="0.1" value={telemetry.SOGDetails?.bowPS?.value ?? 0} onChange={e=> setSOGDetails({bowPS: {value: parseFloat(e.target.value||'0'), unit:'knots', display: `${e.target.value} kn`}})} />
          </div>
          <div>
            <div style={{fontSize:12,opacity:0.7}}>CCRP P/S</div>
            <input type="number" step="0.1" value={telemetry.SOGDetails?.ccrpPS?.value ?? 0} onChange={e=> setSOGDetails({ccrpPS: {value: parseFloat(e.target.value||'0'), unit:'knots', display: `${e.target.value} kn`}})} />
          </div>
          <div>
            <div style={{fontSize:12,opacity:0.7}}>CCRP F/A</div>
            <input type="number" step="0.1" value={telemetry.SOGDetails?.ccrpFA?.value ?? 0} onChange={e=> setSOGDetails({ccrpFA: {value: parseFloat(e.target.value||'0'), unit:'knots', display: `${e.target.value} kn`}})} />
          </div>
          <div>
            <div style={{fontSize:12,opacity:0.7}}>Stern P/S</div>
            <input type="number" step="0.1" value={telemetry.SOGDetails?.sternPS?.value ?? 0} onChange={e=> setSOGDetails({sternPS: {value: parseFloat(e.target.value||'0'), unit:'knots', display: `${e.target.value} kn`}})} />
          </div>
        </div>
      </section>

      <div style={{marginTop:12,fontSize:12,opacity:0.8}}>Date & Time</div>
      <div style={{fontFamily:'JetBrains Mono',fontSize:14}}>{now.toLocaleString()}</div>
    </div>
  )
}

export default LeftTelemetry
