import React from 'react'
import { useApi } from '../hooks/useApi'
import Timer from './Timer'
import './TopBar.css'

const TopBar: React.FC = () => {
  const { get } = useApi()

  async function refreshStatus() {
    try {
      await get('/status')
    } catch (e) {
      console.warn('status refresh failed', e)
    }
  }

  return (
    <div className="vmh-topbar">
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <div style={{width:10,height:10,borderRadius:3,background:'#7ee787'}} />
        <div className="title">VisionMasterH Dashboard</div>
      </div>
      <div style={{marginLeft:'auto', display:'flex', gap:12, alignItems:'center'}}>
        <Timer />
        <button onClick={refreshStatus}>Refresh</button>
      </div>
    </div>
  )
}

export default TopBar;
