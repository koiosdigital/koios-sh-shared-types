/**
 * Common Types for Koios Microservices
 *
 * Shared domain types used across multiple services and event schemas.
 */
import { z } from 'zod';
/**
 * Subscription plan tiers
 */
export const PLANS = ['free', 'pro', 'enterprise'];
/**
 * Billing address (international format)
 */
export const BillingAddressSchema = z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().length(2), // ISO 3166-1 alpha-2
});
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
        members: 10,
        certificate_authorities: 1,
        devices: 100,
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
/**
 * Pricing by plan tier
 */
export const PLAN_PRICING = {
    free: {
        basePrice: 0,
        stripePriceId: 'price_1T0SiPPEBowdz9OiQUFoboS4', // $0/month - subscription for fraud prevention
    },
    pro: {
        basePrice: 49,
        stripePriceId: 'price_1T0ARHPEBowdz9OibIUNmeap',
        meteredPricing: {
            members: {
                priceId: 'price_1T1sm1PEBowdz9OirAL0NkJI',
                meterId: 'mtr_test_61UBGfr7dkGp5gWPp41PEBowdz9OiEU4',
                unitPrice: 15, // $15 per member overage (5 included @ $0)
                tiers: [
                    { upTo: 5, unitPrice: 0 }, // Included in plan
                    { upTo: null, unitPrice: 15 },
                ],
            },
            devices: {
                priceId: 'price_1T1smBPEBowdz9Oi0xMyFoW6',
                meterId: 'mtr_test_61UBGfvSjp0qHil2Y41PEBowdz9Oi4oa',
                unitPrice: 0.12, // $0.12 per device overage (50 included @ $0)
                tiers: [
                    { upTo: 50, unitPrice: 0 }, // Included in plan
                    { upTo: null, unitPrice: 0.12 },
                ],
            },
        },
    },
    enterprise: {
        basePrice: 299,
        stripePriceId: 'price_1T0ARvPEBowdz9OiakMUiQ36',
        meteredPricing: {
            members: {
                priceId: 'price_1T1smIPEBowdz9OiBVv6jc5T',
                meterId: 'mtr_test_61UBGfr7dkGp5gWPp41PEBowdz9OiEU4',
                // Graduated: 10 included @ $0, 11-50 @ $12, 51-100 @ $10, 101+ @ $8
                tiers: [
                    { upTo: 10, unitPrice: 0 }, // Included in plan
                    { start: 11, upTo: 50, unitPrice: 12 },
                    { upTo: 100, unitPrice: 10 },
                    { upTo: null, unitPrice: 8 },
                ],
            },
            certificate_authorities: {
                priceId: 'price_1T1smNPEBowdz9OinqOojxeu',
                meterId: 'mtr_test_61UBGfwZe3jFXiT4m41PEBowdz9OiKE4',
                unitPrice: 50, // $50 per managed CA (1 included @ $0)
                tiers: [
                    { upTo: 1, unitPrice: 0 }, // Included in plan
                    { upTo: null, unitPrice: 50 },
                ],
            },
            devices: {
                priceId: 'price_1T1smUPEBowdz9OiszHwUz8X',
                meterId: 'mtr_test_61UBGfvSjp0qHil2Y41PEBowdz9Oi4oa',
                // Graduated: 100 included @ $0, 101-1K @ $0.10, 1K-10K @ $0.08, 10K+ @ $0.05
                tiers: [
                    { upTo: 100, unitPrice: 0 }, // Included in plan
                    { start: 101, upTo: 1000, unitPrice: 0.1 },
                    { upTo: 10000, unitPrice: 0.08 },
                    { upTo: null, unitPrice: 0.05 },
                ],
            },
        },
    },
};
/**
 * Complete plan configuration combining limits, features, and pricing
 */
export const PLANS_CONFIG = {
    free: {
        name: 'Free',
        priceId: PLAN_PRICING.free.stripePriceId,
        basePrice: PLAN_PRICING.free.basePrice,
        limits: PLAN_LIMITS.free,
        features: PLAN_FEATURES.free,
    },
    pro: {
        name: 'Pro',
        priceId: PLAN_PRICING.pro.stripePriceId,
        basePrice: PLAN_PRICING.pro.basePrice,
        limits: PLAN_LIMITS.pro,
        features: PLAN_FEATURES.pro,
        meteredPricing: PLAN_PRICING.pro.meteredPricing,
    },
    enterprise: {
        name: 'Enterprise',
        priceId: PLAN_PRICING.enterprise.stripePriceId,
        basePrice: PLAN_PRICING.enterprise.basePrice,
        limits: PLAN_LIMITS.enterprise,
        features: PLAN_FEATURES.enterprise,
        meteredPricing: PLAN_PRICING.enterprise.meteredPricing,
    },
};
//# sourceMappingURL=types.js.map