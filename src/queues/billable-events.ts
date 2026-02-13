/**
 * Billable Events (koios-billable-events queue)
 *
 * Events sent TO the billing service for usage tracking and metering.
 * These events represent actions that should be billed (members added, API calls, etc.)
 *
 * Queue: koios-billable-events
 * Producer: Auth service, App services
 * Consumer: Billing service
 */

import { z } from 'zod'
import { PLANS, BillingAddressSchema } from '../common/types'

// ====================
// Member Events
// ====================

export const MemberCreatedEventSchema = z.object({
  type: z.literal('member.created'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  userId: z.string(),
  email: z.string().optional(),
  role: z.string(),
  metadata: z.record(z.unknown()).optional(),
})

export const MemberRemovedEventSchema = z.object({
  type: z.literal('member.removed'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  userId: z.string(),
  reason: z.enum(['deleted', 'left', 'transferred']).optional(),
})

export const MemberUpdatedEventSchema = z.object({
  type: z.literal('member.updated'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  userId: z.string(),
  changes: z.object({
    role: z.string().optional(),
    status: z.string().optional(),
  }),
})

// ====================
// Tenant Events
// ====================

export const TenantCreatedEventSchema = z.object({
  type: z.literal('tenant.created'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  name: z.string(),
  ownerId: z.string(),
  ownerEmail: z.string().email(),
  ownerName: z.string(),
  plan: z.enum(PLANS),
  billingAddress: BillingAddressSchema.optional(),
  paymentMethodId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export const TenantUpdatedEventSchema = z.object({
  type: z.literal('tenant.updated'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  changes: z.object({
    name: z.string().optional(),
    status: z.string().optional(),
  }),
})

export const TenantDeletedEventSchema = z.object({
  type: z.literal('tenant.deleted'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  deletedBy: z.string(),
})

// ====================
// Service Account Events
// ====================

export const ServiceAccountCreatedEventSchema = z.object({
  type: z.literal('service_account.created'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  serviceAccountId: z.string(),
  name: z.string(),
})

export const ServiceAccountDeletedEventSchema = z.object({
  type: z.literal('service_account.deleted'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  serviceAccountId: z.string(),
})

// ====================
// API Usage Events
// ====================

export const ApiCallEventSchema = z.object({
  type: z.literal('api.call'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  endpoint: z.string(),
  method: z.string(),
  statusCode: z.number(),
  responseTime: z.number().optional(),
})

// ====================
// Device Events (PKI)
// ====================

export const DeviceCreatedEventSchema = z.object({
  type: z.literal('device.created'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  deviceId: z.string(),
  name: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export const DeviceDeletedEventSchema = z.object({
  type: z.literal('device.deleted'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  deviceId: z.string(),
})

// ====================
// Certificate Authority Events (PKI)
// ====================

export const CertificateAuthorityCreatedEventSchema = z.object({
  type: z.literal('certificate_authority.created'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  caId: z.string(),
  name: z.string(),
  caType: z.enum(['managed', 'byoca']), // managed = Koios-hosted, byoca = Bring Your Own CA
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export const CertificateAuthorityDeletedEventSchema = z.object({
  type: z.literal('certificate_authority.deleted'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  caId: z.string(),
})

// ====================
// Union Schema
// ====================

export const BillableEventSchema = z.discriminatedUnion('type', [
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
])

// ====================
// TypeScript Types
// ====================

export type MemberCreatedEvent = z.infer<typeof MemberCreatedEventSchema>
export type MemberRemovedEvent = z.infer<typeof MemberRemovedEventSchema>
export type MemberUpdatedEvent = z.infer<typeof MemberUpdatedEventSchema>

export type TenantCreatedEvent = z.infer<typeof TenantCreatedEventSchema>
export type TenantUpdatedEvent = z.infer<typeof TenantUpdatedEventSchema>
export type TenantDeletedEvent = z.infer<typeof TenantDeletedEventSchema>

export type ServiceAccountCreatedEvent = z.infer<typeof ServiceAccountCreatedEventSchema>
export type ServiceAccountDeletedEvent = z.infer<typeof ServiceAccountDeletedEventSchema>

export type ApiCallEvent = z.infer<typeof ApiCallEventSchema>

export type DeviceCreatedEvent = z.infer<typeof DeviceCreatedEventSchema>
export type DeviceDeletedEvent = z.infer<typeof DeviceDeletedEventSchema>

export type CertificateAuthorityCreatedEvent = z.infer<
  typeof CertificateAuthorityCreatedEventSchema
>
export type CertificateAuthorityDeletedEvent = z.infer<
  typeof CertificateAuthorityDeletedEventSchema
>

export type BillableEvent = z.infer<typeof BillableEventSchema>

// ====================
// Event Creators
// ====================

export function createMemberCreatedEvent(
  data: Omit<MemberCreatedEvent, 'type' | 'eventId' | 'timestamp'>
): MemberCreatedEvent {
  return {
    type: 'member.created',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createMemberRemovedEvent(
  data: Omit<MemberRemovedEvent, 'type' | 'eventId' | 'timestamp'>
): MemberRemovedEvent {
  return {
    type: 'member.removed',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createMemberUpdatedEvent(
  data: Omit<MemberUpdatedEvent, 'type' | 'eventId' | 'timestamp'>
): MemberUpdatedEvent {
  return {
    type: 'member.updated',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createTenantCreatedEvent(
  data: Omit<TenantCreatedEvent, 'type' | 'eventId' | 'timestamp'>
): TenantCreatedEvent {
  return {
    type: 'tenant.created',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createTenantUpdatedEvent(
  data: Omit<TenantUpdatedEvent, 'type' | 'eventId' | 'timestamp'>
): TenantUpdatedEvent {
  return {
    type: 'tenant.updated',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createTenantDeletedEvent(
  data: Omit<TenantDeletedEvent, 'type' | 'eventId' | 'timestamp'>
): TenantDeletedEvent {
  return {
    type: 'tenant.deleted',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createServiceAccountCreatedEvent(
  data: Omit<ServiceAccountCreatedEvent, 'type' | 'eventId' | 'timestamp'>
): ServiceAccountCreatedEvent {
  return {
    type: 'service_account.created',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createServiceAccountDeletedEvent(
  data: Omit<ServiceAccountDeletedEvent, 'type' | 'eventId' | 'timestamp'>
): ServiceAccountDeletedEvent {
  return {
    type: 'service_account.deleted',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createApiCallEvent(
  data: Omit<ApiCallEvent, 'type' | 'eventId' | 'timestamp'>
): ApiCallEvent {
  return {
    type: 'api.call',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createDeviceCreatedEvent(
  data: Omit<DeviceCreatedEvent, 'type' | 'eventId' | 'timestamp'>
): DeviceCreatedEvent {
  return {
    type: 'device.created',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createDeviceDeletedEvent(
  data: Omit<DeviceDeletedEvent, 'type' | 'eventId' | 'timestamp'>
): DeviceDeletedEvent {
  return {
    type: 'device.deleted',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createCertificateAuthorityCreatedEvent(
  data: Omit<CertificateAuthorityCreatedEvent, 'type' | 'eventId' | 'timestamp'>
): CertificateAuthorityCreatedEvent {
  return {
    type: 'certificate_authority.created',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createCertificateAuthorityDeletedEvent(
  data: Omit<CertificateAuthorityDeletedEvent, 'type' | 'eventId' | 'timestamp'>
): CertificateAuthorityDeletedEvent {
  return {
    type: 'certificate_authority.deleted',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

// ====================
// Parser
// ====================

/**
 * Validate and parse incoming billable event from queue
 */
export function parseBillableEvent(message: unknown): BillableEvent {
  return BillableEventSchema.parse(message)
}
