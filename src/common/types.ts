/**
 * Common Types for Koios Microservices
 *
 * Shared domain types used across multiple services and event schemas.
 */

/**
 * Subscription plan tiers
 */
export type Plan = 'free' | 'starter' | 'pro' | 'enterprise'

/**
 * Supported currencies
 */
export type Currency = 'usd' | 'eur' | 'gbp'

/**
 * User roles within a tenant
 */
export type UserRole = 'owner' | 'admin' | 'member' | 'readonly'

/**
 * Billable resource types
 */
export type BillableResource = 'members' | 'api_calls' | 'service_accounts' | 'storage'

/**
 * Subscription status
 */
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid'

/**
 * Tenant status
 */
export type TenantStatus = 'active' | 'suspended' | 'deleted'
