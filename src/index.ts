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

export {
  PLANS,
  BILLABLE_RESOURCES,
  PLAN_LIMITS,
  PLAN_FEATURES,
  PLAN_PRICING,
  PLANS_CONFIG,
  BillingAddressSchema,
} from './common/types'

export type {
  Plan,
  Currency,
  BillableResource,
  SubscriptionStatus,
  TenantStatus,
  FeatureGates,
  PlanLimits,
  PlanConfig,
  PricingTier,
  MeteredPricing,
  PlanPricing,
  BillingAddress,
} from './common/types'

// ====================
// Device Tokens (dnet-minted device JWTs)
// ====================

export {
  DNET_ISSUER_URL,
  DNET_DEVICE_AUDIENCE,
  DEVICE_CAPS,
  DEFAULT_DEVICE_CAPS,
  DeviceCapSchema,
  DeviceTokenClaimsSchema,
} from './common/device-token'

export type { DeviceCap, DeviceTokenClaims } from './common/device-token'

// ====================
// Permissions
// ====================

export { PERMISSIONS } from './common/permissions'
export type { PermissionId } from './common/permissions'

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
  DeviceCreatedEventSchema,
  DeviceDeletedEventSchema,
  CertificateAuthorityCreatedEventSchema,
  CertificateAuthorityDeletedEventSchema,
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
  createDeviceCreatedEvent,
  createDeviceDeletedEvent,
  createCertificateAuthorityCreatedEvent,
  createCertificateAuthorityDeletedEvent,

  // Parser
  parseBillableEvent,
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
  DeviceCreatedEvent,
  DeviceDeletedEvent,
  CertificateAuthorityCreatedEvent,
  CertificateAuthorityDeletedEvent,
  BillableEvent,
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
  parseBillingEvent,
} from './queues/billing-events'

export type {
  PlanChangedEvent,
  PaymentFailedEvent,
  SubscriptionCancelledEvent,
  UsageLimitExceededEvent,
  BillingEvent,
} from './queues/billing-events'

// ====================
// Audit Events (koios-audit-events queue)
// ====================

export {
  // Constants
  KNOWN_AUDIT_SERVICES,

  // Schemas
  AuditActorSchema,
  AuditActionEventSchema,
  AuditEventSchema,

  // Event Creators
  createAuditActionEvent,

  // Parser
  parseAuditEvent,
} from './queues/audit-events'

export type {
  KnownAuditService,
  AuditActor,
  AuditActionEvent,
  AuditEvent,
} from './queues/audit-events'

// ====================
// Email Events (koios-email queue)
// ====================

export type {
  PasswordResetPayload,
  WelcomePayload,
  BackupCodesPayload,
  VerifyEmailPayload,
  OrganizationInvitePayload,
  EmailQueueMessage,
  EmailType,
} from './queues/koios-email'
