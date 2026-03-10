import React, { useState } from 'react';
import { RadarControlState, ARPATarget } from '../types';
import { LeftBar } from './LeftPanel/LeftBar';
import { RadarDisplay } from './RadarDisplay/RadarDisplay';
import { RightPanel } from './RightPanel/RightPanel';
import { BaseButton } from './Buttons/BaseButton';
import { UI_TEXT } from '../constants';
import { useRadarNavigation } from '../hooks/useRadarNavigation';
import { useRadarPointPicker } from '../hooks/useRadarPointPicker';

const defaultRadarControls: RadarControlState = {
    northUp: true,
    selectedRangeNm: 12,
    trailsOn: false,
    vectorTimeMin: 6.0,
    aisOn: true,
    chartOverlayOn: false,
    ebl1Deg: 303.4,
    ebl2Deg: 5.0,
    vrm1Nm: 5.07,
    vrm2Nm: 7.56,
};

const defaultArpaTargets: ARPATarget[] = [];

export const AppContainer: React.FC = () => {
    const [radarControls, setRadarControls] = useState<RadarControlState>(defaultRadarControls);
    const arpaTargets = defaultArpaTargets;

    const { navData, updateNavData, leewayDeg } = useRadarNavigation();
    const {
        radarPointPickerActive,
        selectedRadarPoints,
        openRadarPointPicker,
        closeRadarPointPicker,
        cancelRadarPointPicker,
        handleRadarPointAdded,
        handleRadarPointMoved,
        handleRadarPointMoveStart,
        handleRadarPointDeleted,
        handleRadarPointReplaced,
        undoRadarPointChange,
        canUndoRadarPointChange,
    } = useRadarPointPicker();

    return (
        <div className="app-viewport">
            <div className="app">
                <div className="legacy-topbar">
                    <div className="legacy-topbar-left">
                        <span className="legacy-app-icon" aria-hidden="true">◉</span>
                        <span className="legacy-app-name">{UI_TEXT.TOPBAR.APP_NAME}</span>
                    </div>
                    <div className="legacy-topbar-right">
                        <BaseButton className="legacy-win-btn" aria-label={UI_TEXT.TOPBAR.MINIMIZE} />
                        <BaseButton className="legacy-win-btn" aria-label={UI_TEXT.TOPBAR.MAXIMIZE} />
                        <BaseButton className="legacy-win-btn legacy-win-btn-close" aria-label={UI_TEXT.TOPBAR.CLOSE} />
                    </div>
                </div>
                <div className="main-container">
                    <LeftBar navData={navData} updateNavData={updateNavData} />
                    <RadarDisplay
                        navData={navData}
                        radarControls={radarControls}
                        arpaTargets={arpaTargets}
                        leewayDeg={leewayDeg}
                        radarPointPickerActive={radarPointPickerActive}
                        selectedRadarPoints={selectedRadarPoints}
                        onCloseRadarPointPicker={closeRadarPointPicker}
                        onCancelRadarPointPicker={cancelRadarPointPicker}
                        onUndoRadarPointChange={undoRadarPointChange}
                        canUndoRadarPointChange={canUndoRadarPointChange}
                        onRadarPointAdded={handleRadarPointAdded}
                        onRadarPointMoveStart={handleRadarPointMoveStart}
                        onRadarPointMoved={handleRadarPointMoved}
                        onRadarPointDeleted={handleRadarPointDeleted}
                        onRadarPointReplaced={handleRadarPointReplaced}
                    />
                    <RightPanel
                        radarControls={radarControls}
                        onRadarControlsChange={setRadarControls}
                        arpaTargets={arpaTargets}
                        radarPointPickerActive={radarPointPickerActive}
                        onOpenRadarPointPicker={openRadarPointPicker}
                    />
                </div>
            </div>
        </div>
    );
};
