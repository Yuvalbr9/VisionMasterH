import React from 'react'
import styles from './LeftSidebar.module.css'

type TabDef = {
    id: string
    name: string
}

type TabBarProps = {
    tabs: TabDef[]
    activeId: string | null
    onSelect: (id: string) => void
}

/** Renders a vertical list of tab buttons. */
export default function TabBar({ tabs, activeId, onSelect }: TabBarProps) {
    return (
        <div className={styles.tabBar}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`${styles.tabBtn} ${tab.id === activeId ? styles.tabBtnActive : ''}`}
                    onClick={() => onSelect(tab.id)}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    )
}
