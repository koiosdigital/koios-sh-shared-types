/**
 * Common Types for Koios Microservices
 *
 * Shared domain types used across multiple services and event schemas.
 */

/**
 * Subscription plan tiers
 */
export const PLANS = ['free', 'pro', 'enterprise'] as const
export type Plan = (typeof PLANS)[number]

/**
 * Supported currencies
 */
export type Currency = 'usd'

/**
 * Billable resource types
 */
export const BILLABLE_RESOURCES = ['members', 'certificate_authorities', 'devices'] as const
export type BillableResource = (typeof BILLABLE_RESOURCES)[number]

/**
 * Subscription status
 */
export type SubscriptionStatus =
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'unpaid'

/**
 * Tenant status
 */
export type TenantStatus = 'active' | 'suspended' | 'deleted'

/**
 * Feature gates for plan tiers
 */
export interface FeatureGates {
  customRoles: boolean
  sso: boolean
  auditExport: boolean
  saml_scim: boolean
  byoca: boolean
  log_retention: number
}

/**
 * Plan resource limits
 */
export interface PlanLimits {
  members: number | null // null = unlimited
  certificate_authorities: number | null
  devices: number | null
}

/**
 * Pricing tier for graduated pricing
 */
export interface PricingTier {
  upTo: number | null // null = infinity
  unitPrice: number
}

/**
 * Metered pricing configuration
 */
export interface MeteredPricing {
  priceId: string
  meterId: string
  unitPrice?: number
  tiers?: PricingTier[]
}

/**
 * Plan configuration
 */
export interface PlanConfig {
  name: string
  priceId: string | null
  basePrice?: number
  limits: PlanLimits
  features: FeatureGates
  meteredPricing?: {
    members?: MeteredPricing
    devices?: MeteredPricing
    certificate_authorities?: MeteredPricing
  }
}

/**
 * Plan limits by tier
 */
export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
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
}

/**
 * Feature gates by plan tier
 */
export const PLAN_FEATURES: Record<Plan, FeatureGates> = {
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
}
