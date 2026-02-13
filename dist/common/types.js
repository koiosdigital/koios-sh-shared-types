/**
 * Common Types for Koios Microservices
 *
 * Shared domain types used across multiple services and event schemas.
 */
/**
 * Subscription plan tiers
 */
export const PLANS = ['free', 'pro', 'enterprise'];
/**
 * Billable resource types
 */
export const BILLABLE_RESOURCES = ['members', 'certificate_authorities', 'devices'];
/**
 * Plan limits by tier
 */
export const PLAN_LIMITS = {
    free: {
        members: 1,
        certificate_authorities: 1,
        devices: 10,
    },
    pro: {
        members: 5,
        certificate_authorities: 1,
        devices: 50,
    },
    enterprise: {
        members: 25,
        certificate_authorities: null, // Unlimited with BYOCA
        devices: null, // Unlimited
    },
};
/**
 * Feature gates by plan tier
 */
export const PLAN_FEATURES = {
    free: {
        customRoles: false,
        sso: false,
        auditExport: false,
        saml_scim: false,
        byoca: false,
        log_retention: 7,
    },
    pro: {
        customRoles: false,
        sso: true,
        auditExport: false,
        saml_scim: false,
        byoca: false,
        log_retention: 30,
    },
    enterprise: {
        customRoles: true,
        sso: true,
        auditExport: true,
        saml_scim: true,
        byoca: true,
        log_retention: 365,
    },
};
//# sourceMappingURL=types.js.map