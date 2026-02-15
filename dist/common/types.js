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
                priceId: 'price_1T0ARmPEBowdz9OiFK2RJp59',
                meterId: 'mtr_test_61U9YOsC8ZLIAKms641PEBowdz9Oi81Y',
                unitPrice: 15, // $15 per member overage
            },
            devices: {
                priceId: 'price_1T0ARqPEBowdz9OiDVOhrwEY',
                meterId: 'mtr_test_61U9YOyuNvWuyOsxw41PEBowdz9Oi79U',
                unitPrice: 0.12, // $0.12 per device overage
            },
        },
    },
    enterprise: {
        basePrice: 299,
        stripePriceId: 'price_1T0ARvPEBowdz9OiakMUiQ36',
        meteredPricing: {
            members: {
                priceId: 'price_1T0AS4PEBowdz9OierMMwfeZ',
                meterId: 'mtr_test_61U9YOsC8ZLIAKms641PEBowdz9Oi81Y',
                // Graduated: $12/0-50, $10/50-100, $8/100+
                tiers: [
                    { start: 11, upTo: 50, unitPrice: 12 },
                    { upTo: 100, unitPrice: 10 },
                    { upTo: null, unitPrice: 8 }, // null = infinity
                ],
            },
            certificate_authorities: {
                priceId: 'price_1T0ASAPEBowdz9Oi47B7pmXt',
                meterId: 'mtr_test_61U9YOygdyg6UVDLS41PEBowdz9Oi532',
                unitPrice: 50, // $50 per managed CA
            },
            devices: {
                priceId: 'price_1T0ASGPEBowdz9OiyYYIbFI9',
                meterId: 'mtr_test_61U9YOyuNvWuyOsxw41PEBowdz9Oi79U',
                // Graduated: $0.10/0-1K, $0.08/1K-10K, $0.05/10K+
                tiers: [
                    { start: 101, upTo: 1000, unitPrice: 0.1 },
                    { upTo: 10000, unitPrice: 0.08 },
                    { upTo: null, unitPrice: 0.05 }, // null = infinity
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