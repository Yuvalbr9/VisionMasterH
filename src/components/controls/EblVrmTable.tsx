import React from 'react'
import styles from './RightControls.module.css'

/** Static EBL / VRM reference table. */
export default function EblVrmTable() {
    const rows = [
        { ebl: '045°', vrm: '2.0', unit: 'NM' },
        { ebl: '120°', vrm: '4.0', unit: 'NM' },
        { ebl: '210°', vrm: '6.0', unit: 'NM' },
        { ebl: '300°', vrm: '8.0', unit: 'NM' },
    ]

    return (
        <div className={styles.eblVrm}>
            <div className={styles.eblHeader}>EBL / VRM</div>
            <table>
                <thead>
                    <tr>
                        <th>EBL</th>
                        <th>VRM</th>
                        <th>Unit</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.ebl}>
                            <td>{row.ebl}</td>
                            <td>{row.vrm}</td>
                            <td>{row.unit}</td>
                            <td className={styles.edit}>✎</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
