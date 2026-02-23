import dayjs from "dayjs";

export const formatCallTriggeredAt = (call_triggered_at: string) =>
    dayjs(call_triggered_at).format('DD MMM YYYY, hh:mm A');

export const tenantName = window.location.host.split('.')[0];

/**
 *
 * Extracts the subdomain from a given URL.
 */
export const getSubDomain = (url: string) => {
	const subDomain = url.split('//')[1].split('.');
	return subDomain;
};