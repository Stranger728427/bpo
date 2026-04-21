import dayjs, { Dayjs } from "dayjs";

// Formats a call timestamp into a readable string format: "DD MMM YYYY, hh:mm A"
// Example: 21 Apr 2026, 03:45 PM
export const formatCallTriggeredAt = (call_triggered_at: string) =>
  dayjs(call_triggered_at).format('DD MMM YYYY, hh:mm A');


export const tenantName = window.location.host.split('.')[0];

/**
 * Extracts the subdomain from a given URL.
 */
export const getSubDomain = (url: string) => {
	const subDomain = url.split('//')[1].split('.');
	return subDomain;
};

/* Formats a Dayjs date into a readable string format: "DD MMMM YYYY"
 * Example: 21 April 2026
 */
export const formatWithMonthWord = (date: Dayjs) => {
  return dayjs(date).format('DD MMMM YYYY');
};
