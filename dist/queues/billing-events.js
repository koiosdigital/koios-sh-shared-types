/**
 * Billing Events (koios-billing-events queue)
 *
 * Events sent FROM the billing service about billing state changes.
 * These events notify other services about plan changes, payment failures, etc.
 *
 * Queue: koios-billing-events
 * Producer: Billing service
 * Consumer: Auth service, Notifications service, Analytics service
 */
import { z } from 'zod';
import { PLANS, BILLABLE_RESOURCES } from '../common/types';
// ====================
// Billing State Change Events
// ====================
export const PlanChangedEventSchema = z.object({
    type: z.literal('billing.plan_changed'),
    timestamp: z.number(),
    tenantId: z.string(),
    oldPlan: z.enum(PLANS),
    newPlan: z.enum(PLANS),
    effectiveDate: z.number(),
    reason: z.enum(['upgrade', 'downgrade', 'admin_override']).optional()
});
export const PaymentFailedEventSchema = z.object({
    type: z.literal('billing.payment_failed'),
    timestamp: z.number(),
    tenantId: z.string(),
    invoiceId: z.string(),
    amount: z.number(),
    currency: z.string(),
    attemptCount: z.number(),
    nextRetryDate: z.number().optional()
});
export const SubscriptionCancelledEventSchema = z.object({
    type: z.literal('billing.subscription_cancelled'),
    timestamp: z.number(),
    tenantId: z.string(),
    subscriptionId: z.string(),
    reason: z.enum(['customer_request', 'payment_failed', 'admin_action']),
    effectiveDate: z.number()
});
export const UsageLimitExceededEventSchema = z.object({
    type: z.literal('billing.usage_limit_exceeded'),
    timestamp: z.number(),
    tenantId: z.string(),
    resource: z.enum(BILLABLE_RESOURCES),
    limit: z.number(),
    current: z.number(),
    overage: z.number()
});
// ====================
// Union Schema
// ====================
export const BillingEventSchema = z.discriminatedUnion('type', [
    PlanChangedEventSchema,
    PaymentFailedEventSchema,
    SubscriptionCancelledEventSchema,
    UsageLimitExceededEventSchema
]);
// ====================
// Event Creators
// ====================
export function createPlanChangedEvent(data) {
    return {
        type: 'billing.plan_changed',
        timestamp: Date.now(),
        ...data
    };
}
export function createPaymentFailedEvent(data) {
    return {
        type: 'billing.payment_failed',
        timestamp: Date.now(),
        ...data
    };
}
export function createSubscriptionCancelledEvent(data) {
    return {
        type: 'billing.subscription_cancelled',
        timestamp: Date.now(),
        ...data
    };
}
export function createUsageLimitExceededEvent(data) {
    return {
        type: 'billing.usage_limit_exceeded',
        timestamp: Date.now(),
        ...data
    };
}
// ====================
// Parser
// ====================
/**
 * Validate and parse incoming billing event from queue
 */
export function parseBillingEvent(message) {
    return BillingEventSchema.parse(message);
}
//# sourceMappingURL=billing-events.js.map