/**
 * IoT Webhook Event Types
 *
 * Every event the device gateway (vn) can POST to a tenant webhook. The
 * gateway delivers an event to a webhook when the webhook subscribes to that
 * event name or to the wildcard.
 *
 * Adding an event here is the contract change; vn's emit() and the console's
 * event picker both derive from this list.
 */
import { z } from 'zod';
/** Subscribes a webhook to every event, present and future. */
export declare const WEBHOOK_EVENT_WILDCARD = "*";
export declare const WEBHOOK_EVENTS: readonly ["device.connected", "device.disconnected", "device.message", "twin.reported", "twin.desired_changed"];
export type WebhookEvent = (typeof WEBHOOK_EVENTS)[number];
/** What a webhook may subscribe to: a concrete event or the wildcard. */
export declare const WebhookEventSubscriptionSchema: z.ZodUnion<readonly [z.ZodEnum<{
    "device.connected": "device.connected";
    "device.disconnected": "device.disconnected";
    "device.message": "device.message";
    "twin.reported": "twin.reported";
    "twin.desired_changed": "twin.desired_changed";
}>, z.ZodLiteral<"*">]>;
export type WebhookEventSubscription = z.infer<typeof WebhookEventSubscriptionSchema>;
//# sourceMappingURL=webhook-events.d.ts.map