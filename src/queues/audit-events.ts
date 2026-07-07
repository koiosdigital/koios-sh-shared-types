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

import { z } from 'zod'

// ====================
// Services
// ====================

/**
 * Services known to emit audit events. Used for UI filter dropdowns.
 * The `service` field itself is an open string so that newly onboarded
 * services are accepted by the deployed audit consumer without a
 * shared-types bump.
 */
export const KNOWN_AUDIT_SERVICES = ['pki', 'app-updates', 'iot', 'auth', 'billing'] as const

export type KnownAuditService = (typeof KNOWN_AUDIT_SERVICES)[number]

// ====================
// Actor
// ====================

export const AuditActorSchema = z.object({
  type: z.enum(['user', 'service_account', 'system']),
  id: z.string(),
  email: z.string().optional(),
})

// ====================
// Audit Action Event
// ====================

export const AuditActionEventSchema = z.object({
  type: z.literal('audit.action'),
  eventId: z.string().uuid(),
  timestamp: z.number(), // ms since epoch
  tenantId: z.string(),
  service: z.string(), // e.g. 'pki' — see KNOWN_AUDIT_SERVICES
  action: z.string(), // dotted convention: 'ca.created', 'member.removed'
  actor: AuditActorSchema,
  resourceType: z.string().optional(),
  resourceId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  ip: z.string().optional(),
  requestId: z.string().optional(),
})

// ====================
// Union Schema
// ====================

export const AuditEventSchema = z.discriminatedUnion('type', [AuditActionEventSchema])

// ====================
// TypeScript Types
// ====================

export type AuditActor = z.infer<typeof AuditActorSchema>
export type AuditActionEvent = z.infer<typeof AuditActionEventSchema>
export type AuditEvent = z.infer<typeof AuditEventSchema>

// ====================
// Event Creators
// ====================

export function createAuditActionEvent(
  data: Omit<AuditActionEvent, 'type' | 'eventId' | 'timestamp'>
): AuditActionEvent {
  return {
    type: 'audit.action',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

// ====================
// Parser
// ====================

/**
 * Validate and parse incoming audit event from queue
 */
export function parseAuditEvent(message: unknown): AuditEvent {
  return AuditEventSchema.parse(message)
}
