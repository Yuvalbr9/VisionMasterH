import React from 'react';
import { UI_TEXT, UI_VALUES } from '../../constants';

interface DateTimeDisplayProps {
  isoDateTime: string | null;
}

const getTimezoneLabelFromIso = (isoDateTime: string): string => {
  const match = isoDateTime.match(/(Z|[+-]\d{2}:\d{2})$/);
  if (!match) {
    return UI_TEXT.COMMON.UTC;
  }

  return match[1] === 'Z' ? UI_TEXT.COMMON.UTC : match[1];
};

export const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ isoDateTime }) => {
  const parsedDate = isoDateTime ? new Date(isoDateTime) : null;
  const isValidDate = parsedDate instanceof Date && !Number.isNaN(parsedDate.valueOf());

  const dateText = isValidDate
    ? new Intl.DateTimeFormat(UI_VALUES.DATE_TIME.LOCALE, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(parsedDate)
    : UI_VALUES.DATE_TIME.FALLBACK_DATE;

  const timeText = isValidDate
    ? new Intl.DateTimeFormat(UI_VALUES.DATE_TIME.LOCALE, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short',
      }).format(parsedDate)
    : UI_VALUES.DATE_TIME.FALLBACK_TIME;

  const timezoneText = isoDateTime ? getTimezoneLabelFromIso(isoDateTime) : UI_TEXT.COMMON.UTC;

  return (
    <div className="lp-datetime">
      <div className="lp-datetime-date">{dateText}</div>
      <div className="lp-datetime-time-row">
        <span className="lp-datetime-time">{timeText}</span>
        <span className="lp-badge lp-badge-green lp-badge-offset">{timezoneText}</span>
      </div>
    </div>
  );
};
