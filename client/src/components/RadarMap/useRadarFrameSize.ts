import React from 'react';
import { RadarFrameSize } from './radarMapTypes';

const EmptyFrameSize: RadarFrameSize = {
  width: 0,
  height: 0,
};

export const useRadarFrameSize = (frameRef: React.RefObject<HTMLDivElement | null>) => {
  const [frameSize, setFrameSize] = React.useState<RadarFrameSize>(EmptyFrameSize);

  React.useEffect(() => {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const updateFrameSize = (width: number, height: number) => {
      setFrameSize((previousSize) => {
        if (previousSize.width === width && previousSize.height === height) {
          return previousSize;
        }

        return { width, height };
      });
    };

    const initialRect = frame.getBoundingClientRect();
    updateFrameSize(initialRect.width, initialRect.height);

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const nextEntry = entries[0];

      if (!nextEntry) {
        return;
      }

      updateFrameSize(nextEntry.contentRect.width, nextEntry.contentRect.height);
    });

    observer.observe(frame);

    return () => {
      observer.disconnect();
    };
  }, [frameRef]);

  return frameSize;
};