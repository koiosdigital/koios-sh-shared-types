/**
 * Common Types for Koios Microservices
 *
 * Shared domain types used across multiple services and event schemas.
 */

/**
 * Subscription plan tiers
 */
export type Plan = 'free' | 'pro' | 'enterprise'

/**
 * Supported currencies
 */
export type Currency = 'usd'

/**
 * Billable resource types
 */
export type BillableResource = 'members' | 'certificate_authorities' | 'devices'

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
 * User role within a tenant (appears in JWT tokens)
 * Alias for DefaultRole - imported from permissions
 */
export type UserRole = 'owner' | 'admin' | 'member' | 'readonly'
