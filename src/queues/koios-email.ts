/**
 * Koios Email Queue Types
 *
 * Queue: koios-email
 * Producer: Multiple services (Auth, Billing, etc.)
 * Consumer: Email worker
 */

// ====================
// Email Payloads
// ====================

export interface PasswordResetPayload {
  resetUrl: string
  email: string
}

export interface WelcomePayload {
  name: string
}

export interface BackupCodesPayload {
  codes: string[]
}

export interface VerifyEmailPayload {
  verifyUrl: string
}

export interface OrganizationInvitePayload {
  acceptInvitationUrl: string
  senderEmail: string
  recipientEmail: string
  organizationName: string
}

// ====================
// Email Queue Message
// ====================

export type EmailQueueMessage =
  | { type: 'password_reset'; recipient: string; payload: PasswordResetPayload }
  | { type: 'welcome'; recipient: string; payload: WelcomePayload }
  | { type: '2fa_backup_codes'; recipient: string; payload: BackupCodesPayload }
  | { type: 'verify_email'; recipient: string; payload: VerifyEmailPayload }
  | { type: 'organization_invite'; recipient: string; payload: OrganizationInvitePayload }

export type EmailType = EmailQueueMessage['type']
