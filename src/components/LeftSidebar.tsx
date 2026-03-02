import React, { Suspense, useEffect, useState } from 'react'
import type { Telemetry } from '../hooks/useNavigationData'
import '../style/leftSidebar.css'
import TabPage from './tab';

type TabDef = { id: string; name: string; component: string }

const LeftSidebar: React.FC<{ telemetry: Telemetry; setTelemetry: (t:any)=>void }> = ({ telemetry, setTelemetry }) => {
  const [tabs, setTabs] = useState<TabDef[]>([])
  const [active, setActive] = useState<string | null>(null)
  const [PageComp, setPageComp] = useState<React.LazyExoticComponent<any> | null>(null)

  useEffect(() => {
    // load tabs.json (bundled import)
    import('../tabs.json').then((m) => {
      setTabs(m.default || m)
      if ((m.default || m).length) setActive((m.default || m)[0].id)
    })
  }, [])

  useEffect(() => {
    if (!active) return
    const def = tabs.find(t => t.id === active)
    if (!def) return
    // dynamic import from pages folder using component name
    const compName = def.component
    const loader = React.lazy(() => import(`./pages/${compName}`))
    setPageComp(loader)
  }, [active, tabs])

  return (
    <div className="left-sidebar">
      <div className="tabs">
        {tabs.map(t => (
          <button key={t.id} className={`tab-btn ${t.id===active? 'active':''}`} onClick={()=>setActive(t.id)}>{t.name}</button>
        ))}
      </div>

      <div className="tab-content">
        {PageComp ? (
          <Suspense fallback={<div className="loading">Loading…</div>}>
            <TabPage title={tabs.find(t => t.id === active)?.name || 'Unknown'} />
          </Suspense>
        ) : <div className="loading">Loading tabs…</div> }
      </div>
    </div>
  )
}

export default LeftSidebar
