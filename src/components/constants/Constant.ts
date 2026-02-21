import { tenantName } from "@/utils/helpers/helper";

export const DEBOUNCE_TIMEOUT = 500;

export const siteConfig = {
    tenantName: tenantName,
    tenantBaseUrl: import.meta.env.VITE_TENANT_BASE_URL,
}