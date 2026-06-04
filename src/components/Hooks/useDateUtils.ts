import React from 'react';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import dayjs, { type ConfigType, Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

type DateInputType = {
	input?: ConfigType;
	timezone?: string;
};

/**
 * Get user's IANA timezone (e.g., 'Asia/Kolkata', 'America/New_York')
 */
export const currentTimezone = (): string => dayjs.tz.guess();

/**
 * Get a Dayjs UTC instance.
 *
 * @param input - Date input (string, number, Date, or Dayjs)
 * @param format - Optional format string for string parsing
 * @param strict - Optional strict parsing
 * @returns A Dayjs instance in UTC
 */
export const getUTCDate = ({ input, timezone }: DateInputType): Dayjs => {
	if (!input) {
		return dayjs().utc();
	}

	if (dayjs.isDayjs(input)) {
		// The picker returns a Dayjs object with local time values
		// We need to treat these values as "time in the user's timezone"
		// Format it as ISO string and parse it explicitly in the timezone
		const localTimeString = input.format('YYYY-MM-DD HH:mm:ss');

		// dayjs.tz() handles DST transitions automatically:
		// - For non-existent times (spring forward): shifts to next valid time
		// - For ambiguous times (fall back): defaults to first occurrence (standard time)
		return dayjs.tz(localTimeString, timezone).utc();
	}
	// For string inputs that are already in UTC format (ending with Z),
	// parse them as UTC directly
	if (typeof input === 'string' && input.endsWith('Z')) {
		return dayjs.utc(input);
	}

	// For string inputs, parse in the specified timezone, then convert to UTC
	return dayjs.tz(input, timezone).utc();
};

/**
 * Convert a UTC input into a Dayjs instance in local time.
 *
 * @param input - UTC datetime input
 * @param timezone - IANA timezone (default: user's timezone)
 * @returns Dayjs instance in local timezone
 */
export const getLocalDate = ({ input, timezone }: DateInputType): Dayjs => {
	if (!input) {
		return dayjs().tz(timezone);
	}

	if (dayjs.isDayjs(input)) {
		// If it's a Dayjs object, ensure it's treated as UTC then convert to timezone
		// Use utc() to ensure we're treating it as a UTC moment
		return input.utc().tz(timezone);
	}

	// If it's a string (like ISO), parse as UTC first, then convert to timezone
	return dayjs.utc(input).tz(timezone);
};

/**
 * Parse a time string
 * Supports both 12-hour (AM/PM) and 24-hour formats.
 *
 * @param format Time string, e.g., "14:30" or "02:30 PM"
 * @param is12Hour Boolean flag: true = 12-hour, false = 24-hour (default)
 * @returns Dayjs object
 */
export function parseTimeString(format: string, is12Hour = true) {
	if (is12Hour) {
		return format.replace('HH', 'hh') + ' A';
	}
	return format;
}

/**
 * React hook providing date utilities based on Dayjs with UTC and timezone support.
 *
 * @example
 * const { getUTC, getLocal } = useDateUtils({ timezone: "Asia/Kolkata" });
 *
 * const utcDate = getUTC("2025-09-25T12:00:00Z");
 * const localDate = getLocal("2025-09-25T12:00:00Z");
 */
const useDateUtils = (timezone: string = currentTimezone()) => {
	/**
	 * Get a Dayjs instance in local date-time.
	 *
	 * @param input - Date/time input (string, number, Date, or Dayjs-compatible value)
	 * @returns Dayjs instance converted to the specified or local timezone
	 */
	const getLocal = React.useCallback(
		(input?: ConfigType) => {
			return getLocalDate({ input, timezone });
		},
		[timezone]
	);

	/**
	 * Get a Dayjs instance in utc date-time.
	 *
	 * @param input - Date/time input (string, number, Date, or Dayjs-compatible value)
	 * @returns Dayjs instance converted to the specified or local timezone
	 */
	const getUTC = React.useCallback(
		(input?: ConfigType) => {
			return getUTCDate({ input, timezone });
		},
		[timezone]
	);

	return {
		getUTC,
		getLocal,
		timezone,
	};
};

export default useDateUtils;
