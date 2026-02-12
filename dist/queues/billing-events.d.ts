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
export declare const PlanChangedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"billing.plan_changed">;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    oldPlan: z.ZodEnum<["free", "pro", "enterprise"]>;
    newPlan: z.ZodEnum<["free", "pro", "enterprise"]>;
    effectiveDate: z.ZodNumber;
    reason: z.ZodOptional<z.ZodEnum<["upgrade", "downgrade", "admin_override"]>>;
}, "strip", z.ZodTypeAny, {
    type: "billing.plan_changed";
    timestamp: number;
    tenantId: string;
    oldPlan: "free" | "pro" | "enterprise";
    newPlan: "free" | "pro" | "enterprise";
    effectiveDate: number;
    reason?: "upgrade" | "downgrade" | "admin_override" | undefined;
}, {
    type: "billing.plan_changed";
    timestamp: number;
    tenantId: string;
    oldPlan: "free" | "pro" | "enterprise";
    newPlan: "free" | "pro" | "enterprise";
    effectiveDate: number;
    reason?: "upgrade" | "downgrade" | "admin_override" | undefined;
}>;
export declare const PaymentFailedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"billing.payment_failed">;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    invoiceId: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodString;
    attemptCount: z.ZodNumber;
    nextRetryDate: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "billing.payment_failed";
    timestamp: number;
    tenantId: string;
    invoiceId: string;
    amount: number;
    currency: string;
    attemptCount: number;
    nextRetryDate?: number | undefined;
}, {
    type: "billing.payment_failed";
    timestamp: number;
    tenantId: string;
    invoiceId: string;
    amount: number;
    currency: string;
    attemptCount: number;
    nextRetryDate?: number | undefined;
}>;
export declare const SubscriptionCancelledEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"billing.subscription_cancelled">;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    subscriptionId: z.ZodString;
    reason: z.ZodEnum<["customer_request", "payment_failed", "admin_action"]>;
    effectiveDate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "billing.subscription_cancelled";
    timestamp: number;
    tenantId: string;
    reason: "customer_request" | "payment_failed" | "admin_action";
    effectiveDate: number;
    subscriptionId: string;
}, {
    type: "billing.subscription_cancelled";
    timestamp: number;
    tenantId: string;
    reason: "customer_request" | "payment_failed" | "admin_action";
    effectiveDate: number;
    subscriptionId: string;
}>;
export declare const UsageLimitExceededEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"billing.usage_limit_exceeded">;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    resource: z.ZodEnum<["members", "certificate_authorities", "devices"]>;
    limit: z.ZodNumber;
    current: z.ZodNumber;
    overage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "billing.usage_limit_exceeded";
    timestamp: number;
    tenantId: string;
    resource: "members" | "certificate_authorities" | "devices";
    limit: number;
    current: number;
    overage: number;
}, {
    type: "billing.usage_limit_exceeded";
    timestamp: number;
    tenantId: string;
    resource: "members" | "certificate_authorities" | "devices";
    limit: number;
    current: number;
    overage: number;
}>;
export declare const BillingEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"billing.plan_changed">;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    oldPlan: z.ZodEnum<["free", "pro", "enterprise"]>;
    newPlan: z.ZodEnum<["free", "pro", "enterprise"]>;
    effectiveDate: z.ZodNumber;
    reason: z.ZodOptional<z.ZodEnum<["upgrade", "downgrade", "admin_override"]>>;
}, "strip", z.ZodTypeAny, {
    type: "billing.plan_changed";
    timestamp: number;
    tenantId: string;
    oldPlan: "free" | "pro" | "enterprise";
    newPlan: "free" | "pro" | "enterprise";
    effectiveDate: number;
    reason?: "upgrade" | "downgrade" | "admin_override" | undefined;
}, {
    type: "billing.plan_changed";
    timestamp: number;
    tenantId: string;
    oldPlan: "free" | "pro" | "enterprise";
    newPlan: "free" | "pro" | "enterprise";
    effectiveDate: number;
    reason?: "upgrade" | "downgrade" | "admin_override" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"billing.payment_failed">;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    invoiceId: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodString;
    attemptCount: z.ZodNumber;
    nextRetryDate: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "billing.payment_failed";
    timestamp: number;
    tenantId: string;
    invoiceId: string;
    amount: number;
    currency: string;
    attemptCount: number;
    nextRetryDate?: number | undefined;
}, {
    type: "billing.payment_failed";
    timestamp: number;
    tenantId: string;
    invoiceId: string;
    amount: number;
    currency: string;
    attemptCount: number;
    nextRetryDate?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"billing.subscription_cancelled">;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    subscriptionId: z.ZodString;
    reason: z.ZodEnum<["customer_request", "payment_failed", "admin_action"]>;
    effectiveDate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "billing.subscription_cancelled";
    timestamp: number;
    tenantId: string;
    reason: "customer_request" | "payment_failed" | "admin_action";
    effectiveDate: number;
    subscriptionId: string;
}, {
    type: "billing.subscription_cancelled";
    timestamp: number;
    tenantId: string;
    reason: "customer_request" | "payment_failed" | "admin_action";
    effectiveDate: number;
    subscriptionId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"billing.usage_limit_exceeded">;
    timestamp: z.ZodNumber;
    tenantId: z.ZodString;
    resource: z.ZodEnum<["members", "certificate_authorities", "devices"]>;
    limit: z.ZodNumber;
    current: z.ZodNumber;
    overage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "billing.usage_limit_exceeded";
    timestamp: number;
    tenantId: string;
    resource: "members" | "certificate_authorities" | "devices";
    limit: number;
    current: number;
    overage: number;
}, {
    type: "billing.usage_limit_exceeded";
    timestamp: number;
    tenantId: string;
    resource: "members" | "certificate_authorities" | "devices";
    limit: number;
    current: number;
    overage: number;
}>]>;
export type PlanChangedEvent = z.infer<typeof PlanChangedEventSchema>;
export type PaymentFailedEvent = z.infer<typeof PaymentFailedEventSchema>;
export type SubscriptionCancelledEvent = z.infer<typeof SubscriptionCancelledEventSchema>;
export type UsageLimitExceededEvent = z.infer<typeof UsageLimitExceededEventSchema>;
export type BillingEvent = z.infer<typeof BillingEventSchema>;
export declare function createPlanChangedEvent(data: Omit<PlanChangedEvent, 'type' | 'timestamp'>): PlanChangedEvent;
export declare function createPaymentFailedEvent(data: Omit<PaymentFailedEvent, 'type' | 'timestamp'>): PaymentFailedEvent;
export declare function createSubscriptionCancelledEvent(data: Omit<SubscriptionCancelledEvent, 'type' | 'timestamp'>): SubscriptionCancelledEvent;
export declare function createUsageLimitExceededEvent(data: Omit<UsageLimitExceededEvent, 'type' | 'timestamp'>): UsageLimitExceededEvent;
/**
 * Validate and parse incoming billing event from queue
 */
export declare function parseBillingEvent(message: unknown): BillingEvent;
//# sourceMappingURL=billing-events.d.ts.map