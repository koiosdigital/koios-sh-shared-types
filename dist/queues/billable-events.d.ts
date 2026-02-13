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
export declare const MemberCreatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"member.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    userId: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "member.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    role: string;
    email?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    type: "member.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    role: string;
    email?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const MemberRemovedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"member.removed">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    userId: z.ZodString;
    reason: z.ZodOptional<z.ZodEnum<["deleted", "left", "transferred"]>>;
}, "strip", z.ZodTypeAny, {
    type: "member.removed";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    reason?: "deleted" | "left" | "transferred" | undefined;
}, {
    type: "member.removed";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    reason?: "deleted" | "left" | "transferred" | undefined;
}>;
export declare const MemberUpdatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"member.updated">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    userId: z.ZodString;
    changes: z.ZodObject<{
        role: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status?: string | undefined;
        role?: string | undefined;
    }, {
        status?: string | undefined;
        role?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "member.updated";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    changes: {
        status?: string | undefined;
        role?: string | undefined;
    };
}, {
    type: "member.updated";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    changes: {
        status?: string | undefined;
        role?: string | undefined;
    };
}>;
export declare const TenantCreatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"tenant.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    name: z.ZodString;
    ownerId: z.ZodString;
    ownerEmail: z.ZodString;
    ownerName: z.ZodString;
    plan: z.ZodEnum<["free", "pro", "enterprise"]>;
    billingAddress: z.ZodOptional<z.ZodObject<{
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
    }>>;
    paymentMethodId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "tenant.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    ownerId: string;
    ownerEmail: string;
    ownerName: string;
    plan: "free" | "pro" | "enterprise";
    metadata?: Record<string, unknown> | undefined;
    billingAddress?: {
        line1: string;
        city: string;
        country: string;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    paymentMethodId?: string | undefined;
}, {
    type: "tenant.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    ownerId: string;
    ownerEmail: string;
    ownerName: string;
    plan: "free" | "pro" | "enterprise";
    metadata?: Record<string, unknown> | undefined;
    billingAddress?: {
        line1: string;
        city: string;
        country: string;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    paymentMethodId?: string | undefined;
}>;
export declare const TenantUpdatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"tenant.updated">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    changes: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status?: string | undefined;
        name?: string | undefined;
    }, {
        status?: string | undefined;
        name?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "tenant.updated";
    eventId: string;
    timestamp: number;
    tenantId: string;
    changes: {
        status?: string | undefined;
        name?: string | undefined;
    };
}, {
    type: "tenant.updated";
    eventId: string;
    timestamp: number;
    tenantId: string;
    changes: {
        status?: string | undefined;
        name?: string | undefined;
    };
}>;
export declare const TenantDeletedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"tenant.deleted">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    deletedBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "tenant.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deletedBy: string;
}, {
    type: "tenant.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deletedBy: string;
}>;
export declare const ServiceAccountCreatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"service_account.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    serviceAccountId: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "service_account.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    serviceAccountId: string;
}, {
    type: "service_account.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    serviceAccountId: string;
}>;
export declare const ServiceAccountDeletedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"service_account.deleted">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    serviceAccountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "service_account.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    serviceAccountId: string;
}, {
    type: "service_account.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    serviceAccountId: string;
}>;
export declare const ApiCallEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"api.call">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    endpoint: z.ZodString;
    method: z.ZodString;
    statusCode: z.ZodNumber;
    responseTime: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "api.call";
    eventId: string;
    timestamp: number;
    tenantId: string;
    endpoint: string;
    method: string;
    statusCode: number;
    responseTime?: number | undefined;
}, {
    type: "api.call";
    eventId: string;
    timestamp: number;
    tenantId: string;
    endpoint: string;
    method: string;
    statusCode: number;
    responseTime?: number | undefined;
}>;
export declare const DeviceCreatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"device.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    deviceId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "device.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deviceId: string;
    metadata?: Record<string, unknown> | undefined;
    name?: string | undefined;
}, {
    type: "device.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deviceId: string;
    metadata?: Record<string, unknown> | undefined;
    name?: string | undefined;
}>;
export declare const DeviceDeletedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"device.deleted">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    deviceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "device.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deviceId: string;
}, {
    type: "device.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deviceId: string;
}>;
export declare const CertificateAuthorityCreatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"certificate_authority.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    caId: z.ZodString;
    name: z.ZodString;
    caType: z.ZodEnum<["managed", "byoca"]>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "certificate_authority.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    caId: string;
    caType: "managed" | "byoca";
    metadata?: Record<string, unknown> | undefined;
}, {
    type: "certificate_authority.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    caId: string;
    caType: "managed" | "byoca";
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const CertificateAuthorityDeletedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"certificate_authority.deleted">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    caId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "certificate_authority.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    caId: string;
}, {
    type: "certificate_authority.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    caId: string;
}>;
export declare const BillableEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"member.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    userId: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "member.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    role: string;
    email?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    type: "member.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    role: string;
    email?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"member.removed">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    userId: z.ZodString;
    reason: z.ZodOptional<z.ZodEnum<["deleted", "left", "transferred"]>>;
}, "strip", z.ZodTypeAny, {
    type: "member.removed";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    reason?: "deleted" | "left" | "transferred" | undefined;
}, {
    type: "member.removed";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    reason?: "deleted" | "left" | "transferred" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"member.updated">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    userId: z.ZodString;
    changes: z.ZodObject<{
        role: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status?: string | undefined;
        role?: string | undefined;
    }, {
        status?: string | undefined;
        role?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "member.updated";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    changes: {
        status?: string | undefined;
        role?: string | undefined;
    };
}, {
    type: "member.updated";
    eventId: string;
    timestamp: number;
    tenantId: string;
    userId: string;
    changes: {
        status?: string | undefined;
        role?: string | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"tenant.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    name: z.ZodString;
    ownerId: z.ZodString;
    ownerEmail: z.ZodString;
    ownerName: z.ZodString;
    plan: z.ZodEnum<["free", "pro", "enterprise"]>;
    billingAddress: z.ZodOptional<z.ZodObject<{
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
    }>>;
    paymentMethodId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "tenant.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    ownerId: string;
    ownerEmail: string;
    ownerName: string;
    plan: "free" | "pro" | "enterprise";
    metadata?: Record<string, unknown> | undefined;
    billingAddress?: {
        line1: string;
        city: string;
        country: string;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    paymentMethodId?: string | undefined;
}, {
    type: "tenant.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    ownerId: string;
    ownerEmail: string;
    ownerName: string;
    plan: "free" | "pro" | "enterprise";
    metadata?: Record<string, unknown> | undefined;
    billingAddress?: {
        line1: string;
        city: string;
        country: string;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    paymentMethodId?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"tenant.updated">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    changes: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status?: string | undefined;
        name?: string | undefined;
    }, {
        status?: string | undefined;
        name?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "tenant.updated";
    eventId: string;
    timestamp: number;
    tenantId: string;
    changes: {
        status?: string | undefined;
        name?: string | undefined;
    };
}, {
    type: "tenant.updated";
    eventId: string;
    timestamp: number;
    tenantId: string;
    changes: {
        status?: string | undefined;
        name?: string | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"tenant.deleted">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    deletedBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "tenant.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deletedBy: string;
}, {
    type: "tenant.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deletedBy: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"service_account.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    serviceAccountId: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "service_account.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    serviceAccountId: string;
}, {
    type: "service_account.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    serviceAccountId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"service_account.deleted">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    serviceAccountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "service_account.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    serviceAccountId: string;
}, {
    type: "service_account.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    serviceAccountId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"api.call">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    endpoint: z.ZodString;
    method: z.ZodString;
    statusCode: z.ZodNumber;
    responseTime: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "api.call";
    eventId: string;
    timestamp: number;
    tenantId: string;
    endpoint: string;
    method: string;
    statusCode: number;
    responseTime?: number | undefined;
}, {
    type: "api.call";
    eventId: string;
    timestamp: number;
    tenantId: string;
    endpoint: string;
    method: string;
    statusCode: number;
    responseTime?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"device.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    deviceId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "device.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deviceId: string;
    metadata?: Record<string, unknown> | undefined;
    name?: string | undefined;
}, {
    type: "device.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deviceId: string;
    metadata?: Record<string, unknown> | undefined;
    name?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"device.deleted">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    deviceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "device.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deviceId: string;
}, {
    type: "device.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    deviceId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"certificate_authority.created">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    caId: z.ZodString;
    name: z.ZodString;
    caType: z.ZodEnum<["managed", "byoca"]>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "certificate_authority.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    caId: string;
    caType: "managed" | "byoca";
    metadata?: Record<string, unknown> | undefined;
}, {
    type: "certificate_authority.created";
    eventId: string;
    timestamp: number;
    tenantId: string;
    name: string;
    caId: string;
    caType: "managed" | "byoca";
    metadata?: Record<string, unknown> | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"certificate_authority.deleted">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    caId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "certificate_authority.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    caId: string;
}, {
    type: "certificate_authority.deleted";
    eventId: string;
    timestamp: number;
    tenantId: string;
    caId: string;
}>]>;
export type MemberCreatedEvent = z.infer<typeof MemberCreatedEventSchema>;
export type MemberRemovedEvent = z.infer<typeof MemberRemovedEventSchema>;
export type MemberUpdatedEvent = z.infer<typeof MemberUpdatedEventSchema>;
export type TenantCreatedEvent = z.infer<typeof TenantCreatedEventSchema>;
export type TenantUpdatedEvent = z.infer<typeof TenantUpdatedEventSchema>;
export type TenantDeletedEvent = z.infer<typeof TenantDeletedEventSchema>;
export type ServiceAccountCreatedEvent = z.infer<typeof ServiceAccountCreatedEventSchema>;
export type ServiceAccountDeletedEvent = z.infer<typeof ServiceAccountDeletedEventSchema>;
export type ApiCallEvent = z.infer<typeof ApiCallEventSchema>;
export type DeviceCreatedEvent = z.infer<typeof DeviceCreatedEventSchema>;
export type DeviceDeletedEvent = z.infer<typeof DeviceDeletedEventSchema>;
export type CertificateAuthorityCreatedEvent = z.infer<typeof CertificateAuthorityCreatedEventSchema>;
export type CertificateAuthorityDeletedEvent = z.infer<typeof CertificateAuthorityDeletedEventSchema>;
export type BillableEvent = z.infer<typeof BillableEventSchema>;
export declare function createMemberCreatedEvent(data: Omit<MemberCreatedEvent, 'type' | 'eventId' | 'timestamp'>): MemberCreatedEvent;
export declare function createMemberRemovedEvent(data: Omit<MemberRemovedEvent, 'type' | 'eventId' | 'timestamp'>): MemberRemovedEvent;
export declare function createMemberUpdatedEvent(data: Omit<MemberUpdatedEvent, 'type' | 'eventId' | 'timestamp'>): MemberUpdatedEvent;
export declare function createTenantCreatedEvent(data: Omit<TenantCreatedEvent, 'type' | 'eventId' | 'timestamp'>): TenantCreatedEvent;
export declare function createTenantUpdatedEvent(data: Omit<TenantUpdatedEvent, 'type' | 'eventId' | 'timestamp'>): TenantUpdatedEvent;
export declare function createTenantDeletedEvent(data: Omit<TenantDeletedEvent, 'type' | 'eventId' | 'timestamp'>): TenantDeletedEvent;
export declare function createServiceAccountCreatedEvent(data: Omit<ServiceAccountCreatedEvent, 'type' | 'eventId' | 'timestamp'>): ServiceAccountCreatedEvent;
export declare function createServiceAccountDeletedEvent(data: Omit<ServiceAccountDeletedEvent, 'type' | 'eventId' | 'timestamp'>): ServiceAccountDeletedEvent;
export declare function createApiCallEvent(data: Omit<ApiCallEvent, 'type' | 'eventId' | 'timestamp'>): ApiCallEvent;
export declare function createDeviceCreatedEvent(data: Omit<DeviceCreatedEvent, 'type' | 'eventId' | 'timestamp'>): DeviceCreatedEvent;
export declare function createDeviceDeletedEvent(data: Omit<DeviceDeletedEvent, 'type' | 'eventId' | 'timestamp'>): DeviceDeletedEvent;
export declare function createCertificateAuthorityCreatedEvent(data: Omit<CertificateAuthorityCreatedEvent, 'type' | 'eventId' | 'timestamp'>): CertificateAuthorityCreatedEvent;
export declare function createCertificateAuthorityDeletedEvent(data: Omit<CertificateAuthorityDeletedEvent, 'type' | 'eventId' | 'timestamp'>): CertificateAuthorityDeletedEvent;
/**
 * Validate and parse incoming billable event from queue
 */
export declare function parseBillableEvent(message: unknown): BillableEvent;
//# sourceMappingURL=billable-events.d.ts.map