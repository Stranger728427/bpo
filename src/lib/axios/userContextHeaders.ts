import useCurrentUser from "@/app/store/Hooks/useCurrentUser";
import { RequestHeaders } from "./types";
import { siteConfig } from "@/components/constants/Constant";
export const userContextHeaders = () => {

    const tenantName = siteConfig.tenantName;
    
    // Extract user details from the passed user object
    const { currentUserId, currentEmail, userRoles } = useCurrentUser();

    return {
        ...(tenantName && { [RequestHeaders.TENANT_ID]: tenantName }),
        ...(currentUserId && { [RequestHeaders.USER_ID]: currentUserId }),
        ...(currentEmail && { [RequestHeaders.USER_NAME]: currentEmail }),
        ...(userRoles && userRoles.length > 0 && { [RequestHeaders.USER_ROLE]: userRoles }),
    };
    
}