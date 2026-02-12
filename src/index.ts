/**
 * Koios Shared Types
 *
 * Central repository for shared types across Koios microservices.
 * Provides type-safe event schemas for Cloudflare Queues communication.
 *
 * @packageDocumentation
 */

// ====================
// Common Types
// ====================

export type {
  Plan,
  Currency,
  BillableResource,
  SubscriptionStatus,
  TenantStatus
} from './common/types'

// ====================
// Billable Events (koios-billable-events queue)
// ====================

export {
  // Schemas
  MemberCreatedEventSchema,
  MemberRemovedEventSchema,
  MemberUpdatedEventSchema,
  TenantCreatedEventSchema,
  TenantUpdatedEventSchema,
  TenantDeletedEventSchema,
  ServiceAccountCreatedEventSchema,
  ServiceAccountDeletedEventSchema,
  ApiCallEventSchema,
  BillableEventSchema,

  // Event Creators
  createMemberCreatedEvent,
  createMemberRemovedEvent,
  createMemberUpdatedEvent,
  createTenantCreatedEvent,
  createTenantUpdatedEvent,
  createTenantDeletedEvent,
  createServiceAccountCreatedEvent,
  createServiceAccountDeletedEvent,
  createApiCallEvent,

  // Parser
  parseBillableEvent
} from './queues/billable-events'

export type {
  MemberCreatedEvent,
  MemberRemovedEvent,
  MemberUpdatedEvent,
  TenantCreatedEvent,
  TenantUpdatedEvent,
  TenantDeletedEvent,
  ServiceAccountCreatedEvent,
  ServiceAccountDeletedEvent,
  ApiCallEvent,
  BillableEvent
} from './queues/billable-events'

// ====================
// Billing Events (koios-billing-events queue)
// ====================

export {
  // Schemas
  PlanChangedEventSchema,
  PaymentFailedEventSchema,
  SubscriptionCancelledEventSchema,
  UsageLimitExceededEventSchema,
  BillingEventSchema,

  // Event Creators
  createPlanChangedEvent,
  createPaymentFailedEvent,
  createSubscriptionCancelledEvent,
  createUsageLimitExceededEvent,

  // Parser
  parseBillingEvent
} from './queues/billing-events'

export type {
  PlanChangedEvent,
  PaymentFailedEvent,
  SubscriptionCancelledEvent,
  UsageLimitExceededEvent,
  BillingEvent
} from './queues/billing-events'

// ====================
// Koios Email Queue (koios-email queue)
// ====================

export type {
  PasswordResetPayload,
  WelcomePayload,
  BackupCodesPayload,
  VerifyEmailPayload,
  OrganizationInvitePayload,
  EmailQueueMessage,
  EmailType
} from './queues/koios-email'
