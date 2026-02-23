export const mutationKeys = {
    validateTenant: (tenantName: string) => ['validate-tenant', tenantName] as const,
    validateAuthCode: () => ['validate-auth-code'] as const,
    
}