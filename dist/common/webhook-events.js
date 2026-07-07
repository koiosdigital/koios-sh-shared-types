/**
 * IoT Webhook Event Types
 *
 * Every event the device gateway (dnet) can POST to a tenant webhook. The
 * gateway delivers an event to a webhook when the webhook subscribes to that
 * event name or to the wildcard.
 *
 * Adding an event here is the contract change; dnet's emit() and the console's
 * event picker both derive from this list.
 */
import { z } from 'zod';
/** Subscribes a webhook to every event, present and future. */
export const WEBHOOK_EVENT_WILDCARD = '*';
export const WEBHOOK_EVENTS = [
    'device.connected',
    'device.disconnected',
    'device.message',
    'twin.reported',
    'twin.desired_changed',
];
/** What a webhook may subscribe to: a concrete event or the wildcard. */
export const WebhookEventSubscriptionSchema = z.union([
    z.enum(WEBHOOK_EVENTS),
    z.literal(WEBHOOK_EVENT_WILDCARD),
]);
//# sourceMappingURL=webhook-events.js.map