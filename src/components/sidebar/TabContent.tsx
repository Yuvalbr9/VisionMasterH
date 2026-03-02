import React, { Suspense } from 'react'
import type { Telemetry } from '../../types/telemetry'
import styles from './LeftSidebar.module.css'

type PageComponentProps = {
    telemetry: Telemetry
    setTelemetry: (fn: any) => void
}

type TabContentProps = {
    PageComponent: React.LazyExoticComponent<React.ComponentType<PageComponentProps>> | null
    telemetry: Telemetry
    setTelemetry: (fn: any) => void
}

/** Renders the lazy-loaded page component inside a Suspense boundary. */
export default function TabContent({
    PageComponent,
    telemetry,
    setTelemetry,
}: TabContentProps) {
    if (!PageComponent) {
        return <div className={styles.loading}>Loading tabs…</div>
    }

    return (
        <div className={styles.tabContent}>
            <Suspense fallback={<div className={styles.loading}>Loading…</div>}>
                <PageComponent telemetry={telemetry} setTelemetry={setTelemetry} />
            </Suspense>
        </div>
    )
}
