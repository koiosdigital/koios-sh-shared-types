/**
 * Billing Events (koios-billing-events queue)
 *
 * Events sent FROM the billing service about billing state changes.
 * These events notify other services about plan changes, payment failures, etc.
 *
 * Queue: koios-billing-events
 * Producer: Billing service
 * Consumer: koios-billing-events-fanout dispatcher → per-service queues
 *           (auth, pki, ...). A Cloudflare queue has one consumer, so the
 *           dispatcher fans each event out to one queue per subscriber.
 *
 * Idempotency: every event carries a unique `eventId`. Because delivery is
 * at-least-once and fan-out can duplicate on retry, consumers MUST dedupe on
 * `eventId` (e.g. a processed_events table) before mutating their database.
 */

import { z } from 'zod'
import { PLANS, BILLABLE_RESOURCES } from '../common/types'

// ====================
// Billing State Change Events
// ====================

export const PlanChangedEventSchema = z.object({
  type: z.literal('billing.plan_changed'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  oldPlan: z.enum(PLANS),
  newPlan: z.enum(PLANS),
  effectiveDate: z.number(),
  reason: z.enum(['upgrade', 'downgrade', 'admin_override']).optional(),
})

export const PaymentFailedEventSchema = z.object({
  type: z.literal('billing.payment_failed'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  invoiceId: z.string(),
  amount: z.number(),
  currency: z.string(),
  attemptCount: z.number(),
  nextRetryDate: z.number().optional(),
})

export const SubscriptionCancelledEventSchema = z.object({
  type: z.literal('billing.subscription_cancelled'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  subscriptionId: z.string(),
  reason: z.enum(['customer_request', 'payment_failed', 'admin_action']),
  effectiveDate: z.number(),
})

export const UsageLimitExceededEventSchema = z.object({
  type: z.literal('billing.usage_limit_exceeded'),
  eventId: z.string().uuid(),
  timestamp: z.number(),
  tenantId: z.string(),
  resource: z.enum(BILLABLE_RESOURCES),
  limit: z.number(),
  current: z.number(),
  overage: z.number(),
})

// ====================
// Union Schema
// ====================

export const BillingEventSchema = z.discriminatedUnion('type', [
  PlanChangedEventSchema,
  PaymentFailedEventSchema,
  SubscriptionCancelledEventSchema,
  UsageLimitExceededEventSchema,
])

// ====================
// TypeScript Types
// ====================

export type PlanChangedEvent = z.infer<typeof PlanChangedEventSchema>
export type PaymentFailedEvent = z.infer<typeof PaymentFailedEventSchema>
export type SubscriptionCancelledEvent = z.infer<typeof SubscriptionCancelledEventSchema>
export type UsageLimitExceededEvent = z.infer<typeof UsageLimitExceededEventSchema>

export type BillingEvent = z.infer<typeof BillingEventSchema>

// ====================
// Event Creators
// ====================

export function createPlanChangedEvent(
  data: Omit<PlanChangedEvent, 'type' | 'eventId' | 'timestamp'>
): PlanChangedEvent {
  return {
    type: 'billing.plan_changed',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createPaymentFailedEvent(
  data: Omit<PaymentFailedEvent, 'type' | 'eventId' | 'timestamp'>
): PaymentFailedEvent {
  return {
    type: 'billing.payment_failed',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createSubscriptionCancelledEvent(
  data: Omit<SubscriptionCancelledEvent, 'type' | 'eventId' | 'timestamp'>
): SubscriptionCancelledEvent {
  return {
    type: 'billing.subscription_cancelled',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

export function createUsageLimitExceededEvent(
  data: Omit<UsageLimitExceededEvent, 'type' | 'eventId' | 'timestamp'>
): UsageLimitExceededEvent {
  return {
    type: 'billing.usage_limit_exceeded',
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  }
}

// ====================
// Parser
// ====================

/**
 * Validate and parse incoming billing event from queue
 */
export function parseBillingEvent(message: unknown): BillingEvent {
  return BillingEventSchema.parse(message)
}
