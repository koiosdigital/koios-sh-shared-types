/**
 * Audit Events (koios-audit-events queue)
 *
 * Tenant-facing audit trail of actions taken across Koios services.
 * Every API service produces an event for each mutating action; the audit
 * service is the sole consumer and persists events for the dashboard's
 * audit log.
 *
 * Queue: koios-audit-events
 * Producers: All Koios API services
 * Consumer: Audit service
 */
import { z } from 'zod';
/**
 * Services known to emit audit events. Used for UI filter dropdowns.
 * The `service` field itself is an open string so that newly onboarded
 * services are accepted by the deployed audit consumer without a
 * shared-types bump.
 */
export declare const KNOWN_AUDIT_SERVICES: readonly ["pki", "app-updates", "iot", "auth", "billing"];
export type KnownAuditService = (typeof KNOWN_AUDIT_SERVICES)[number];
export declare const AuditActorSchema: z.ZodObject<{
    type: z.ZodEnum<{
        user: "user";
        service_account: "service_account";
        system: "system";
    }>;
    id: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const AuditActionEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"audit.action">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    service: z.ZodString;
    action: z.ZodString;
    actor: z.ZodObject<{
        type: z.ZodEnum<{
            user: "user";
            service_account: "service_account";
            system: "system";
        }>;
        id: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    resourceType: z.ZodOptional<z.ZodString>;
    resourceId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    ip: z.ZodOptional<z.ZodString>;
    requestId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const AuditEventSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"audit.action">;
    eventId: z.ZodString;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    service: z.ZodString;
    action: z.ZodString;
    actor: z.ZodObject<{
        type: z.ZodEnum<{
            user: "user";
            service_account: "service_account";
            system: "system";
        }>;
        id: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    resourceType: z.ZodOptional<z.ZodString>;
    resourceId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    ip: z.ZodOptional<z.ZodString>;
    requestId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>], "type">;
export type AuditActor = z.infer<typeof AuditActorSchema>;
export type AuditActionEvent = z.infer<typeof AuditActionEventSchema>;
export type AuditEvent = z.infer<typeof AuditEventSchema>;
export declare function createAuditActionEvent(data: Omit<AuditActionEvent, 'type' | 'eventId' | 'timestamp'>): AuditActionEvent;
/**
 * Validate and parse incoming audit event from queue
 */
export declare function parseAuditEvent(message: unknown): AuditEvent;
//# sourceMappingURL=audit-events.d.ts.map