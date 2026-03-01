import React from 'react'
import './index.css'
import RadarPPI from './components/RadarPPI'
import LeftSidebar from './components/LeftSidebar'
import SummaryBox from './components/SummaryBox'
import { useNavigationData } from './hooks/useNavigationData'
import RightControls from './components/RightControls'

const App: React.FC = () => {
  const { telemetry, setTelemetry } = useNavigationData()

  return (
    <div className="vmh-root">
      <div className="vmh-grid">
        <aside className="vmh-left">
          <LeftSidebar telemetry={telemetry} setTelemetry={setTelemetry} />
        </aside>

        <div className="vmh-summary-column">
          <SummaryBox telemetry={telemetry} />
        </div>

        <main className="vmh-main">
          <RadarPPI telemetry={telemetry} />
        </main>

        <aside className="vmh-right">
          <RightControls telemetry={telemetry} setTelemetry={setTelemetry} />
        </aside>
      </div>
      {/* MOB overlay removed to avoid UI lock when START is pressed */}
    </div>
  )
}

export default App
