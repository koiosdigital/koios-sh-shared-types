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
import { PLANS } from '../common/types'

// ====================
// Member Events
// ====================

export const MemberCreatedEventSchema = z.object({
  type: z.literal('member.created'),
  timestamp: z.number(),
  tenantId: z.string(),
  userId: z.string(),
  email: z.string().optional(),
  role: z.string(),
  metadata: z.record(z.unknown()).optional(),
})

export const MemberRemovedEventSchema = z.object({
  type: z.literal('member.removed'),
  timestamp: z.number(),
  tenantId: z.string(),
  userId: z.string(),
  reason: z.enum(['deleted', 'left', 'transferred']).optional(),
})

export const MemberUpdatedEventSchema = z.object({
  type: z.literal('member.updated'),
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
  timestamp: z.number(),
  tenantId: z.string(),
  name: z.string(),
  ownerId: z.string(),
  plan: z.enum(PLANS),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export const TenantUpdatedEventSchema = z.object({
  type: z.literal('tenant.updated'),
  timestamp: z.number(),
  tenantId: z.string(),
  changes: z.object({
    name: z.string().optional(),
    status: z.string().optional(),
  }),
})

export const TenantDeletedEventSchema = z.object({
  type: z.literal('tenant.deleted'),
  timestamp: z.number(),
  tenantId: z.string(),
  deletedBy: z.string(),
})

// ====================
// Service Account Events
// ====================

export const ServiceAccountCreatedEventSchema = z.object({
  type: z.literal('service_account.created'),
  timestamp: z.number(),
  tenantId: z.string(),
  serviceAccountId: z.string(),
  name: z.string(),
})

export const ServiceAccountDeletedEventSchema = z.object({
  type: z.literal('service_account.deleted'),
  timestamp: z.number(),
  tenantId: z.string(),
  serviceAccountId: z.string(),
})

// ====================
// API Usage Events
// ====================

export const ApiCallEventSchema = z.object({
  type: z.literal('api.call'),
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
  timestamp: z.number(),
  tenantId: z.string(),
  deviceId: z.string(),
  name: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export const DeviceDeletedEventSchema = z.object({
  type: z.literal('device.deleted'),
  timestamp: z.number(),
  tenantId: z.string(),
  deviceId: z.string(),
})

// ====================
// Certificate Authority Events (PKI)
// ====================

export const CertificateAuthorityCreatedEventSchema = z.object({
  type: z.literal('certificate_authority.created'),
  timestamp: z.number(),
  tenantId: z.string(),
  caId: z.string(),
  name: z.string(),
  caType: z.enum(['managed', 'byoca']), // managed = Koios-hosted, byoca = Bring Your Own CA
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export const CertificateAuthorityDeletedEventSchema = z.object({
  type: z.literal('certificate_authority.deleted'),
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
  data: Omit<MemberCreatedEvent, 'type' | 'timestamp'>
): MemberCreatedEvent {
  return {
    type: 'member.created',
    timestamp: Date.now(),
    ...data,
  }
}

export function createMemberRemovedEvent(
  data: Omit<MemberRemovedEvent, 'type' | 'timestamp'>
): MemberRemovedEvent {
  return {
    type: 'member.removed',
    timestamp: Date.now(),
    ...data,
  }
}

export function createMemberUpdatedEvent(
  data: Omit<MemberUpdatedEvent, 'type' | 'timestamp'>
): MemberUpdatedEvent {
  return {
    type: 'member.updated',
    timestamp: Date.now(),
    ...data,
  }
}

export function createTenantCreatedEvent(
  data: Omit<TenantCreatedEvent, 'type' | 'timestamp'>
): TenantCreatedEvent {
  return {
    type: 'tenant.created',
    timestamp: Date.now(),
    ...data,
  }
}

export function createTenantUpdatedEvent(
  data: Omit<TenantUpdatedEvent, 'type' | 'timestamp'>
): TenantUpdatedEvent {
  return {
    type: 'tenant.updated',
    timestamp: Date.now(),
    ...data,
  }
}

export function createTenantDeletedEvent(
  data: Omit<TenantDeletedEvent, 'type' | 'timestamp'>
): TenantDeletedEvent {
  return {
    type: 'tenant.deleted',
    timestamp: Date.now(),
    ...data,
  }
}

export function createServiceAccountCreatedEvent(
  data: Omit<ServiceAccountCreatedEvent, 'type' | 'timestamp'>
): ServiceAccountCreatedEvent {
  return {
    type: 'service_account.created',
    timestamp: Date.now(),
    ...data,
  }
}

export function createServiceAccountDeletedEvent(
  data: Omit<ServiceAccountDeletedEvent, 'type' | 'timestamp'>
): ServiceAccountDeletedEvent {
  return {
    type: 'service_account.deleted',
    timestamp: Date.now(),
    ...data,
  }
}

export function createApiCallEvent(data: Omit<ApiCallEvent, 'type' | 'timestamp'>): ApiCallEvent {
  return {
    type: 'api.call',
    timestamp: Date.now(),
    ...data,
  }
}

export function createDeviceCreatedEvent(
  data: Omit<DeviceCreatedEvent, 'type' | 'timestamp'>
): DeviceCreatedEvent {
  return {
    type: 'device.created',
    timestamp: Date.now(),
    ...data,
  }
}

export function createDeviceDeletedEvent(
  data: Omit<DeviceDeletedEvent, 'type' | 'timestamp'>
): DeviceDeletedEvent {
  return {
    type: 'device.deleted',
    timestamp: Date.now(),
    ...data,
  }
}

export function createCertificateAuthorityCreatedEvent(
  data: Omit<CertificateAuthorityCreatedEvent, 'type' | 'timestamp'>
): CertificateAuthorityCreatedEvent {
  return {
    type: 'certificate_authority.created',
    timestamp: Date.now(),
    ...data,
  }
}

export function createCertificateAuthorityDeletedEvent(
  data: Omit<CertificateAuthorityDeletedEvent, 'type' | 'timestamp'>
): CertificateAuthorityDeletedEvent {
  return {
    type: 'certificate_authority.deleted',
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
