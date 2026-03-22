import React from 'react';
import { clamp } from '../../util';

const VALUE_EPSILON = 1e-9;

const getStepPrecision = (step: number): number => {
  const text = step.toString().toLowerCase();

  if (text.includes('e-')) {
    const [, exponentText] = text.split('e-');
    const exponent = Number.parseInt(exponentText, 10);
    return Number.isFinite(exponent) ? exponent : 0;
  }

  const decimalIndex = text.indexOf('.');
  return decimalIndex >= 0 ? text.length - decimalIndex - 1 : 0;
};

const roundToPrecision = (value: number, precision: number): number => {
  if (precision <= 0) {
    return Math.round(value);
  }

  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
};

const snapToStep = (value: number, min: number, max: number, step: number): number => {
  if (max <= min) {
    return min;
  }

  const stepCount = Math.round((value - min) / step);
  const precision = Math.max(
    getStepPrecision(step),
    getStepPrecision(min),
    getStepPrecision(max)
  );
  const snapped = roundToPrecision(min + stepCount * step, precision);

  return clamp(snapped, min, max);
};

type SliderManagedProps =
  | 'onChange'
  | 'onWheel'
  | 'onPointerDown'
  | 'onPointerMove'
  | 'onPointerUp'
  | 'onPointerCancel'
  | 'onKeyDown'
  | 'children'
  | 'role'
  | 'tabIndex'
  | 'aria-label'
  | 'aria-valuemin'
  | 'aria-valuemax'
  | 'aria-valuenow'
  | 'aria-disabled';

type DivPropsWithoutManagedHandlers = Omit<React.HTMLAttributes<HTMLDivElement>, SliderManagedProps>;

export interface GenericSliderProps extends DivPropsWithoutManagedHandlers {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (nextValue: number) => void;
  fillClassName?: string;
  minVisualFillPx?: number;
  ariaLabel: string;
  disabled?: boolean;
}

export const GenericSlider: React.FC<GenericSliderProps> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  className,
  fillClassName,
  minVisualFillPx = 0,
  ariaLabel,
  disabled = false,
  style,
  title,
  ...rest
}) => {
  const rawMin = Number.isFinite(min) ? min : 0;
  const rawMax = Number.isFinite(max) ? max : rawMin;
  const safeMin = Math.min(rawMin, rawMax);
  const safeMax = Math.max(rawMin, rawMax);
  const valueRange = Math.max(0, safeMax - safeMin);
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const safeMinVisualFillPx = Number.isFinite(minVisualFillPx) && minVisualFillPx > 0
    ? minVisualFillPx
    : 0;

  const normalizedValue = snapToStep(
    Number.isFinite(value) ? value : safeMin,
    safeMin,
    safeMax,
    safeStep
  );

  const valuePercent = valueRange > 0
    ? ((normalizedValue - safeMin) / valueRange) * 100
    : 0;

  const latestValueRef = React.useRef(normalizedValue);
  React.useEffect(() => {
    latestValueRef.current = normalizedValue;
  }, [normalizedValue]);

  const emitValue = React.useCallback((candidateValue: number) => {
    if (disabled) {
      return;
    }

    const nextValue = snapToStep(candidateValue, safeMin, safeMax, safeStep);
    if (Math.abs(nextValue - latestValueRef.current) <= VALUE_EPSILON) {
      return;
    }

    latestValueRef.current = nextValue;
    onChange(nextValue);
  }, [disabled, onChange, safeMax, safeMin, safeStep]);

  const setValueFromClientX = React.useCallback((clientX: number, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 || valueRange <= 0) {
      return;
    }

    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const nextValue = safeMin + ratio * valueRange;
    emitValue(nextValue);
  }, [emitValue, safeMin, valueRange]);

  const adjustValue = React.useCallback((delta: number) => {
    if (disabled || !Number.isFinite(delta) || delta === 0) {
      return;
    }

    emitValue(latestValueRef.current + delta);
  }, [disabled, emitValue]);

  const handleWheel = React.useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    event.preventDefault();
    const delta = event.deltaY < 0 ? safeStep : -safeStep;
    adjustValue(delta);
  }, [adjustValue, disabled, safeStep]);

  const handlePointerDown = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setValueFromClientX(event.clientX, event.currentTarget);
  }, [disabled, setValueFromClientX]);

  const handlePointerMove = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    setValueFromClientX(event.clientX, event.currentTarget);
  }, [disabled, setValueFromClientX]);

  const handlePointerEnd = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      adjustValue(-safeStep);
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      adjustValue(safeStep);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      emitValue(safeMin);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      emitValue(safeMax);
      return;
    }

    if (event.key === 'PageDown') {
      event.preventDefault();
      adjustValue(-(safeStep * 10));
      return;
    }

    if (event.key === 'PageUp') {
      event.preventDefault();
      adjustValue(safeStep * 10);
    }
  }, [adjustValue, disabled, emitValue, safeMax, safeMin, safeStep]);

  const mergedClassName = className ? `vm-generic-slider ${className}` : 'vm-generic-slider';
  const mergedFillClassName = fillClassName ? `vm-generic-slider-fill ${fillClassName}` : 'vm-generic-slider-fill';

  const fillWidthStyle = safeMinVisualFillPx > 0
    ? `max(${valuePercent}%, ${safeMinVisualFillPx}px)`
    : `${valuePercent}%`;

  return (
    <div
      {...rest}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-valuemin={safeMin}
      aria-valuemax={safeMax}
      aria-valuenow={Math.round(normalizedValue)}
      aria-disabled={disabled || undefined}
      className={mergedClassName}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
      title={title}
      style={{ touchAction: 'none', ...style }}
    >
      {normalizedValue > safeMin && (
        <div className={mergedFillClassName} style={{ width: fillWidthStyle }} />
      )}
    </div>
  );
};
