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
import { z } from 'zod';
import { PLANS, BillingAddressSchema } from '../common/types';
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
});
export const MemberRemovedEventSchema = z.object({
    type: z.literal('member.removed'),
    eventId: z.string().uuid(),
    timestamp: z.number(),
    tenantId: z.string(),
    userId: z.string(),
    reason: z.enum(['deleted', 'left', 'transferred']).optional(),
});
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
});
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
});
export const TenantUpdatedEventSchema = z.object({
    type: z.literal('tenant.updated'),
    eventId: z.string().uuid(),
    timestamp: z.number(),
    tenantId: z.string(),
    changes: z.object({
        name: z.string().optional(),
        status: z.string().optional(),
    }),
});
export const TenantDeletedEventSchema = z.object({
    type: z.literal('tenant.deleted'),
    eventId: z.string().uuid(),
    timestamp: z.number(),
    tenantId: z.string(),
    deletedBy: z.string(),
});
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
});
export const ServiceAccountDeletedEventSchema = z.object({
    type: z.literal('service_account.deleted'),
    eventId: z.string().uuid(),
    timestamp: z.number(),
    tenantId: z.string(),
    serviceAccountId: z.string(),
});
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
});
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
});
export const DeviceDeletedEventSchema = z.object({
    type: z.literal('device.deleted'),
    eventId: z.string().uuid(),
    timestamp: z.number(),
    tenantId: z.string(),
    deviceId: z.string(),
});
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
});
export const CertificateAuthorityDeletedEventSchema = z.object({
    type: z.literal('certificate_authority.deleted'),
    eventId: z.string().uuid(),
    timestamp: z.number(),
    tenantId: z.string(),
    caId: z.string(),
});
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
]);
// ====================
// Event Creators
// ====================
export function createMemberCreatedEvent(data) {
    return {
        type: 'member.created',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createMemberRemovedEvent(data) {
    return {
        type: 'member.removed',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createMemberUpdatedEvent(data) {
    return {
        type: 'member.updated',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createTenantCreatedEvent(data) {
    return {
        type: 'tenant.created',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createTenantUpdatedEvent(data) {
    return {
        type: 'tenant.updated',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createTenantDeletedEvent(data) {
    return {
        type: 'tenant.deleted',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createServiceAccountCreatedEvent(data) {
    return {
        type: 'service_account.created',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createServiceAccountDeletedEvent(data) {
    return {
        type: 'service_account.deleted',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createApiCallEvent(data) {
    return {
        type: 'api.call',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createDeviceCreatedEvent(data) {
    return {
        type: 'device.created',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createDeviceDeletedEvent(data) {
    return {
        type: 'device.deleted',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createCertificateAuthorityCreatedEvent(data) {
    return {
        type: 'certificate_authority.created',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
export function createCertificateAuthorityDeletedEvent(data) {
    return {
        type: 'certificate_authority.deleted',
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...data,
    };
}
// ====================
// Parser
// ====================
/**
 * Validate and parse incoming billable event from queue
 */
export function parseBillableEvent(message) {
    return BillableEventSchema.parse(message);
}
//# sourceMappingURL=billable-events.js.map