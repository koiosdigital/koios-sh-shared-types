/**
 * Email Events (koios-email queue)
 *
 * Events for triggering email notifications.
 *
 * Queue: koios-email
 * Producer: Multiple services (Auth, Billing, etc.)
 * Consumer: Email service
 */
import { z } from 'zod';
export declare const EmailSendRequestedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"email.send_requested">;
    timestamp: z.ZodNumber;
    to: z.ZodString;
    template: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high"]>>;
}, "strip", z.ZodTypeAny, {
    type: "email.send_requested";
    timestamp: number;
    to: string;
    template: string;
    data: Record<string, unknown>;
    priority: "low" | "normal" | "high";
}, {
    type: "email.send_requested";
    timestamp: number;
    to: string;
    template: string;
    data: Record<string, unknown>;
    priority?: "low" | "normal" | "high" | undefined;
}>;
export declare const EmailSentEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"email.sent">;
    timestamp: z.ZodNumber;
    messageId: z.ZodString;
    to: z.ZodString;
    template: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "email.sent";
    timestamp: number;
    to: string;
    template: string;
    messageId: string;
}, {
    type: "email.sent";
    timestamp: number;
    to: string;
    template: string;
    messageId: string;
}>;
export declare const EmailFailedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"email.failed">;
    timestamp: z.ZodNumber;
    to: z.ZodString;
    template: z.ZodString;
    error: z.ZodString;
    retryCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "email.failed";
    timestamp: number;
    to: string;
    template: string;
    error: string;
    retryCount: number;
}, {
    type: "email.failed";
    timestamp: number;
    to: string;
    template: string;
    error: string;
    retryCount: number;
}>;
export declare const EmailEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"email.send_requested">;
    timestamp: z.ZodNumber;
    to: z.ZodString;
    template: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high"]>>;
}, "strip", z.ZodTypeAny, {
    type: "email.send_requested";
    timestamp: number;
    to: string;
    template: string;
    data: Record<string, unknown>;
    priority: "low" | "normal" | "high";
}, {
    type: "email.send_requested";
    timestamp: number;
    to: string;
    template: string;
    data: Record<string, unknown>;
    priority?: "low" | "normal" | "high" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"email.sent">;
    timestamp: z.ZodNumber;
    messageId: z.ZodString;
    to: z.ZodString;
    template: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "email.sent";
    timestamp: number;
    to: string;
    template: string;
    messageId: string;
}, {
    type: "email.sent";
    timestamp: number;
    to: string;
    template: string;
    messageId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"email.failed">;
    timestamp: z.ZodNumber;
    to: z.ZodString;
    template: z.ZodString;
    error: z.ZodString;
    retryCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "email.failed";
    timestamp: number;
    to: string;
    template: string;
    error: string;
    retryCount: number;
}, {
    type: "email.failed";
    timestamp: number;
    to: string;
    template: string;
    error: string;
    retryCount: number;
}>]>;
export type EmailSendRequestedEvent = z.infer<typeof EmailSendRequestedEventSchema>;
export type EmailSentEvent = z.infer<typeof EmailSentEventSchema>;
export type EmailFailedEvent = z.infer<typeof EmailFailedEventSchema>;
export type EmailEvent = z.infer<typeof EmailEventSchema>;
export declare function createEmailSendRequestedEvent(data: Omit<EmailSendRequestedEvent, 'type' | 'timestamp'>): EmailSendRequestedEvent;
export declare function createEmailSentEvent(data: Omit<EmailSentEvent, 'type' | 'timestamp'>): EmailSentEvent;
export declare function createEmailFailedEvent(data: Omit<EmailFailedEvent, 'type' | 'timestamp'>): EmailFailedEvent;
/**
 * Validate and parse incoming email event from queue
 */
export declare function parseEmailEvent(message: unknown): EmailEvent;
//# sourceMappingURL=email-events.d.ts.map