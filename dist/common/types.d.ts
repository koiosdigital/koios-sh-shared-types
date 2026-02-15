/**
 * Common Types for Koios Microservices
 *
 * Shared domain types used across multiple services and event schemas.
 */
import { z } from 'zod';
/**
 * Subscription plan tiers
 */
export declare const PLANS: readonly ["free", "pro", "enterprise"];
export type Plan = (typeof PLANS)[number];
/**
 * Billing address (international format)
 */
export declare const BillingAddressSchema: z.ZodObject<{
    line1: z.ZodString;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    country: z.ZodString;
}, "strip", z.ZodTypeAny, {
    line1: string;
    city: string;
    country: string;
    line2?: string | undefined;
    state?: string | undefined;
    postalCode?: string | undefined;
}, {
    line1: string;
    city: string;
    country: string;
    line2?: string | undefined;
    state?: string | undefined;
    postalCode?: string | undefined;
}>;
export type BillingAddress = z.infer<typeof BillingAddressSchema>;
/**
 * Supported currencies
 */
export type Currency = 'usd';
/**
 * Billable resource types
 */
export declare const BILLABLE_RESOURCES: readonly ["members", "certificate_authorities", "devices"];
export type BillableResource = (typeof BILLABLE_RESOURCES)[number];
/**
 * Subscription status
 */
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid';
/**
 * Tenant status
 */
export type TenantStatus = 'active' | 'suspended' | 'deleted';
/**
 * Feature gates for plan tiers
 */
export interface FeatureGates {
    customRoles: boolean;
    sso: boolean;
    auditExport: boolean;
    saml_scim: boolean;
    byoca: boolean;
    log_retention: number;
}
/**
 * Plan resource limits
 */
export interface PlanLimits {
    members: number | null;
    certificate_authorities: number | null;
    devices: number | null;
}
/**
 * Pricing tier for graduated pricing
 */
export interface PricingTier {
    start?: number;
    upTo: number | null;
    unitPrice: number;
}
/**
 * Metered pricing configuration
 */
export interface MeteredPricing {
    priceId: string;
    meterId: string;
    unitPrice?: number;
    tiers?: PricingTier[];
}
/**
 * Plan configuration
 */
export interface PlanConfig {
    name: string;
    priceId: string | null;
    basePrice?: number;
    limits: PlanLimits;
    features: FeatureGates;
    meteredPricing?: {
        members?: MeteredPricing;
        devices?: MeteredPricing;
        certificate_authorities?: MeteredPricing;
    };
}
/**
 * Plan limits by tier
 */
export declare const PLAN_LIMITS: Record<Plan, PlanLimits>;
/**
 * Feature gates by plan tier
 */
export declare const PLAN_FEATURES: Record<Plan, FeatureGates>;
/**
 * Plan pricing information
 */
export interface PlanPricing {
    basePrice: number;
    stripePriceId: string | null;
    meteredPricing?: {
        members?: MeteredPricing;
        devices?: MeteredPricing;
        certificate_authorities?: MeteredPricing;
    };
}
/**
 * Pricing by plan tier
 */
export declare const PLAN_PRICING: Record<Plan, PlanPricing>;
/**
 * Complete plan configuration combining limits, features, and pricing
 */
export declare const PLANS_CONFIG: Record<Plan, PlanConfig>;
//# sourceMappingURL=types.d.ts.map