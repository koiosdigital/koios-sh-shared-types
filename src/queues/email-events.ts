/**
 * Email Events (koios-email queue)
 *
 * Events for triggering email notifications.
 *
 * Queue: koios-email
 * Producer: Multiple services (Auth, Billing, etc.)
 * Consumer: Email service
 */

import { z } from 'zod'

// ====================
// Email Events
// ====================

export const EmailSendRequestedEventSchema = z.object({
  type: z.literal('email.send_requested'),
  timestamp: z.number(),
  to: z.string().email(),
  template: z.string(),
  data: z.record(z.unknown()),
  priority: z.enum(['low', 'normal', 'high']).default('normal')
})

export const EmailSentEventSchema = z.object({
  type: z.literal('email.sent'),
  timestamp: z.number(),
  messageId: z.string(),
  to: z.string().email(),
  template: z.string()
})

export const EmailFailedEventSchema = z.object({
  type: z.literal('email.failed'),
  timestamp: z.number(),
  to: z.string().email(),
  template: z.string(),
  error: z.string(),
  retryCount: z.number()
})

// ====================
// Union Schema
// ====================

export const EmailEventSchema = z.discriminatedUnion('type', [
  EmailSendRequestedEventSchema,
  EmailSentEventSchema,
  EmailFailedEventSchema
])

// ====================
// TypeScript Types
// ====================

export type EmailSendRequestedEvent = z.infer<typeof EmailSendRequestedEventSchema>
export type EmailSentEvent = z.infer<typeof EmailSentEventSchema>
export type EmailFailedEvent = z.infer<typeof EmailFailedEventSchema>

export type EmailEvent = z.infer<typeof EmailEventSchema>

// ====================
// Event Creators
// ====================

export function createEmailSendRequestedEvent(data: Omit<EmailSendRequestedEvent, 'type' | 'timestamp'>): EmailSendRequestedEvent {
  return {
    type: 'email.send_requested',
    timestamp: Date.now(),
    ...data
  }
}

export function createEmailSentEvent(data: Omit<EmailSentEvent, 'type' | 'timestamp'>): EmailSentEvent {
  return {
    type: 'email.sent',
    timestamp: Date.now(),
    ...data
  }
}

export function createEmailFailedEvent(data: Omit<EmailFailedEvent, 'type' | 'timestamp'>): EmailFailedEvent {
  return {
    type: 'email.failed',
    timestamp: Date.now(),
    ...data
  }
}

// ====================
// Parser
// ====================

/**
 * Validate and parse incoming email event from queue
 */
export function parseEmailEvent(message: unknown): EmailEvent {
  return EmailEventSchema.parse(message)
}
