import React from 'react';
import { UI_TEXT, UI_VALUES } from '../../constants';
import { formatUtcOffset, getOffsetMinutesFromIso } from '../../util';

interface DateTimeDisplayProps {
  isoDateTime: string | null;
}

export const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ isoDateTime }) => {
  const parsedDate = isoDateTime ? new Date(isoDateTime) : null;
  const isValidDate = parsedDate instanceof Date && !Number.isNaN(parsedDate.valueOf());

  const dateText = isValidDate
    ? new Intl.DateTimeFormat(UI_VALUES.DATE_TIME.LOCALE, {
        timeZone: UI_TEXT.COMMON.UTC,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(parsedDate)
    : UI_VALUES.DATE_TIME.FALLBACK_DATE;

  const utcTimeText = isValidDate
    ? new Intl.DateTimeFormat(UI_VALUES.DATE_TIME.LOCALE, {
        timeZone: UI_TEXT.COMMON.UTC,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(parsedDate)
    : UI_VALUES.DATE_TIME.FALLBACK_TIME;

  const timeText = `${utcTimeText} ${UI_TEXT.COMMON.UTC}`;

  const offsetMinutes = isoDateTime ? getOffsetMinutesFromIso(isoDateTime) : null;
  const timezoneText = offsetMinutes === null ? '+0' : formatUtcOffset(offsetMinutes);

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
