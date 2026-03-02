import React from 'react';
import type { Telemetry } from '../hooks/useNavigationData';
import '../../style/tab.css';

interface TabProps {
  title: string;
}

const TabPage: React.FC<TabProps> = ({ title }) => {
  return (
    <div className="tab-container">
        <h3>{title}</h3>
        <p className="tab-description">
            {`${title} controls and information placeholder.`}
        </p>
    </div>
  )
}

export default TabPage;
