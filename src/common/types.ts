/**
 * Common Types for Koios Microservices
 *
 * Shared domain types used across multiple services and event schemas.
 */

/**
 * Subscription plan tiers
 */
export const PLANS = ['free', 'pro', 'enterprise'] as const
export type Plan = typeof PLANS[number]

/**
 * Supported currencies
 */
export type Currency = 'usd'

/**
 * Billable resource types
 */
export const BILLABLE_RESOURCES = ['members', 'certificate_authorities', 'devices'] as const
export type BillableResource = typeof BILLABLE_RESOURCES[number]

/**
 * Subscription status
 */
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid'

/**
 * Tenant status
 */
export type TenantStatus = 'active' | 'suspended' | 'deleted'
