import React, { useEffect, useState } from 'react'
import type { Telemetry } from '../../types/telemetry'
import TabBar from './TabBar'
import TabContent from './TabContent'
import styles from './LeftSidebar.module.css'

type TabDef = { id: string; name: string; component: string }

type LeftSidebarProps = {
    telemetry: Telemetry
    setTelemetry: (fn: any) => void
}

/** Left sidebar: tab navigation + lazy-loaded page content. */
export default function LeftSidebar({ telemetry, setTelemetry }: LeftSidebarProps) {
    const [tabs, setTabs] = useState<TabDef[]>([])
    const [activeId, setActiveId] = useState<string | null>(null)
    const [PageComponent, setPageComponent] =
        useState<React.LazyExoticComponent<any> | null>(null)

    // Load tab definitions from tabs.json
    useEffect(() => {
        import('../../tabs.json').then((m) => {
            const loaded: TabDef[] = m.default || m
            setTabs(loaded)
            if (loaded.length > 0) {
                setActiveId(loaded[0].id)
            }
        })
    }, [])

    // Lazy-load the selected page component
    useEffect(() => {
        if (!activeId) return
        const def = tabs.find((t) => t.id === activeId)
        if (!def) return

        const lazy = React.lazy(() => import(`../pages/${def.component}`))
        setPageComponent(lazy)
    }, [activeId, tabs])

    return (
        <div className={styles.sidebar}>
            <TabBar tabs={tabs} activeId={activeId} onSelect={setActiveId} />
            <TabContent
                PageComponent={PageComponent}
                telemetry={telemetry}
                setTelemetry={setTelemetry}
            />
        </div>
    )
}
