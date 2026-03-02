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
    <div className='left-telemetry'>
      <section className='left-telemetry-section'>
        <div className='lt-row-between'>
          <label>HDG</label>
          <div className='lt-value-large'>{telemetry.Heading.toFixed(1)}°</div>
        </div>
        <input type="range" min={0} max={359} value={Math.round(telemetry.Heading)} onChange={e=>setHeading(parseInt(e.target.value))} />
        <div className='lt-range-labels'>
          <div>000</div><div>090</div><div>180</div><div>270</div><div>359</div>
        </div>
      </section>

      <section className='left-telemetry-section'>
        <div className='lt-row-between'>
          <label>STW</label>
          <div className='lt-value-large'>{telemetry.SpeedThroughWater.display}</div>
        </div>
        <div className='lt-stw-row'>
          <input type="number" step="0.1" value={telemetry.SpeedThroughWater.value} onChange={e=>{
            const v = parseFloat(e.target.value||'0')
            setSTW({value: v, unit: 'knots', display: `${v} kn`})
          }} />
          <div className='lt-unit'>kn</div>
        </div>
      </section>

      <section className='left-telemetry-section'>
        <label>POS</label>
        <div className='lt-pos-list'>
          <input value={telemetry.Latitude} onChange={e=> setPOS(e.target.value, telemetry.Longitude)} />
          <input value={telemetry.Longitude} onChange={e=> setPOS(telemetry.Latitude, e.target.value)} />
        </div>
      </section>

      <section className='left-telemetry-section'>
        <div className='lt-row-between'>
          <label>COG</label>
          <div className='lt-value-large'>{telemetry.COG.toFixed(1)}°</div>
        </div>
        <input type="range" min={0} max={359} value={Math.round(telemetry.COG)} onChange={e=>setCOG(parseInt(e.target.value))} />
        <div className='lt-range-labels'>
          <div>000</div><div>090</div><div>180</div><div>270</div><div>359</div>
        </div>
      </section>

      <section className='left-telemetry-section'>
        <label>SOG (details)</label>
        <div className='lt-sog-list'>
          <div>
            <div className='lt-sog-subtitle'>Bow P/S</div>
            <input type="number" step="0.1" value={telemetry.SOGDetails?.bowPS?.value ?? 0} onChange={e=> setSOGDetails({bowPS: {value: parseFloat(e.target.value||'0'), unit:'knots', display: `${e.target.value} kn`}})} />
          </div>
          <div>
            <div className='lt-sog-subtitle'>CCRP P/S</div>
            <input type="number" step="0.1" value={telemetry.SOGDetails?.ccrpPS?.value ?? 0} onChange={e=> setSOGDetails({ccrpPS: {value: parseFloat(e.target.value||'0'), unit:'knots', display: `${e.target.value} kn`}})} />
          </div>
          <div>
            <div className='lt-sog-subtitle'>CCRP F/A</div>
            <input type="number" step="0.1" value={telemetry.SOGDetails?.ccrpFA?.value ?? 0} onChange={e=> setSOGDetails({ccrpFA: {value: parseFloat(e.target.value||'0'), unit:'knots', display: `${e.target.value} kn`}})} />
          </div>
          <div>
            <div className='lt-sog-subtitle'>Stern P/S</div>
            <input type="number" step="0.1" value={telemetry.SOGDetails?.sternPS?.value ?? 0} onChange={e=> setSOGDetails({sternPS: {value: parseFloat(e.target.value||'0'), unit:'knots', display: `${e.target.value} kn`}})} />
          </div>
        </div>
      </section>

      <div className='lt-date-time-label'>Date & Time</div>
      <div className='lt-date-time-value'>{now.toLocaleString()}</div>
    </div>
  )
}

export default LeftTelemetry
