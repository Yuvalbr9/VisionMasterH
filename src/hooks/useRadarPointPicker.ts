import { useState, useCallback } from 'react';
import { RadarSelectedPoint } from '../types';

const cloneRadarPoints = (points: RadarSelectedPoint[]): RadarSelectedPoint[] => {
    return points.map((point) => ({ ...point }));
};

const areRadarPointListsEqual = (left: RadarSelectedPoint[], right: RadarSelectedPoint[]): boolean => {
    if (left.length !== right.length) {
        return false;
    }

    for (let index = 0; index < left.length; index += 1) {
        if (
            left[index].bearingDeg !== right[index].bearingDeg
            || left[index].rangeNm !== right[index].rangeNm
        ) {
            return false;
        }
    }

    return true;
};

export const useRadarPointPicker = () => {
    const [radarPointPickerActive, setRadarPointPickerActive] = useState(false);
    const [selectedRadarPoints, setSelectedRadarPoints] = useState<RadarSelectedPoint[]>([]);
    const [radarPointHistory, setRadarPointHistory] = useState<RadarSelectedPoint[][]>([]);
    const [radarPointPickerInitialPoints, setRadarPointPickerInitialPoints] = useState<RadarSelectedPoint[] | null>(null);

    const openRadarPointPicker = useCallback(() => {
        if (radarPointPickerActive) {
            return;
        }

        setRadarPointPickerInitialPoints(cloneRadarPoints(selectedRadarPoints));
        setRadarPointHistory([]);
        setRadarPointPickerActive(true);
    }, [radarPointPickerActive, selectedRadarPoints]);

    const closeRadarPointPicker = useCallback(() => {
        setRadarPointPickerActive(false);
        setRadarPointHistory([]);
        setRadarPointPickerInitialPoints(null);
    }, []);

    const cancelRadarPointPicker = useCallback(() => {
        if (radarPointPickerInitialPoints) {
            setSelectedRadarPoints(cloneRadarPoints(radarPointPickerInitialPoints));
        }

        setRadarPointPickerActive(false);
        setRadarPointHistory([]);
        setRadarPointPickerInitialPoints(null);
    }, [radarPointPickerInitialPoints]);

    const pushRadarPointHistory = useCallback((pointsSnapshot: RadarSelectedPoint[]) => {
        setRadarPointHistory((previousHistory) => {
            const nextSnapshot = cloneRadarPoints(pointsSnapshot);
            const latestSnapshot = previousHistory[previousHistory.length - 1];

            if (latestSnapshot && areRadarPointListsEqual(latestSnapshot, nextSnapshot)) {
                return previousHistory;
            }

            return [...previousHistory, nextSnapshot];
        });
    }, []);

    const handleRadarPointAdded = useCallback((selectedPoint: RadarSelectedPoint) => {
        setSelectedRadarPoints((previousPoints) => {
            pushRadarPointHistory(previousPoints);
            return [...previousPoints, selectedPoint];
        });
    }, [pushRadarPointHistory]);

    const handleRadarPointMoved = useCallback((pointIndex: number, nextPoint: RadarSelectedPoint) => {
        setSelectedRadarPoints((previousPoints) => previousPoints.map((point, index) => (
            index === pointIndex ? nextPoint : point
        )));
    }, []);

    const handleRadarPointMoveStart = useCallback((pointIndex: number) => {
        setSelectedRadarPoints((previousPoints) => {
            if (pointIndex < 0 || pointIndex >= previousPoints.length) {
                return previousPoints;
            }

            pushRadarPointHistory(previousPoints);
            return previousPoints;
        });
    }, [pushRadarPointHistory]);

    const handleRadarPointDeleted = useCallback((pointIndex: number) => {
        setSelectedRadarPoints((previousPoints) => {
            if (pointIndex < 0 || pointIndex >= previousPoints.length) {
                return previousPoints;
            }

            pushRadarPointHistory(previousPoints);
            return previousPoints.filter((_, index) => index !== pointIndex);
        });
    }, [pushRadarPointHistory]);

    const handleRadarPointReplaced = useCallback((pointIndex: number, nextPoint: RadarSelectedPoint) => {
        setSelectedRadarPoints((previousPoints) => {
            if (pointIndex < 0 || pointIndex >= previousPoints.length) {
                return previousPoints;
            }

            const currentPoint = previousPoints[pointIndex];
            if (
                currentPoint.bearingDeg === nextPoint.bearingDeg
                && currentPoint.rangeNm === nextPoint.rangeNm
            ) {
                return previousPoints;
            }

            pushRadarPointHistory(previousPoints);
            return previousPoints.map((point, index) => (index === pointIndex ? nextPoint : point));
        });
    }, [pushRadarPointHistory]);

    const undoRadarPointChange = useCallback(() => {
        setRadarPointHistory((previousHistory) => {
            const previousIndex = previousHistory.length - 1;
            if (previousIndex < 0) {
                return previousHistory;
            }

            const previousSnapshot = previousHistory[previousIndex];
            setSelectedRadarPoints(cloneRadarPoints(previousSnapshot));
            return previousHistory.slice(0, previousIndex);
        });
    }, []);

    const canUndoRadarPointChange = radarPointHistory.length > 0;

    return {
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
    };
};
