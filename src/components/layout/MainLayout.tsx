import React from 'react'
import type { Telemetry } from '../../types/telemetry'
import LeftSidebar from '../sidebar/LeftSidebar'
import SummaryBox from '../summary/SummaryBox'
import RadarPPI from '../radar/RadarPPI'
import RightControls from '../controls/RightControls'
import styles from './MainLayout.module.css'

type MainLayoutProps = {
    telemetry: Telemetry
    setTelemetry: (fn: any) => void
}

/** Main application layout: grid with sidebar, summary, radar, and controls. */
const MainLayout: React.FC<MainLayoutProps> = ({ telemetry, setTelemetry }) => (
    <div className={styles.root}>
        <div className={styles.grid}>
            <aside className={styles.left}>
                <LeftSidebar telemetry={telemetry} setTelemetry={setTelemetry} />
            </aside>

            <div className={styles.summaryColumn}>
                <SummaryBox telemetry={telemetry} />
            </div>

            <main className={styles.main}>
                <RadarPPI telemetry={telemetry} />
            </main>

            <aside className={styles.right}>
                <RightControls telemetry={telemetry} setTelemetry={setTelemetry} />
            </aside>
        </div>
    </div>
)

export default MainLayout
