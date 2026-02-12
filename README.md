# @koios/shared-types

Shared TypeScript types and Zod schemas for Koios microservices queue communication.

## Overview

This package provides type-safe event schemas for cross-service communication via Cloudflare Queues. All Koios microservices (Auth, Billing, Notifications, etc.) import these shared types to ensure consistency and prevent schema drift.

## Installation

```bash
# Using pnpm workspaces (recommended for local development)
pnpm add @koios/shared-types@workspace:*

# Or from npm (when published)
pnpm add @koios/shared-types
```

## Queue Architecture

Koios uses three main queues for inter-service communication:

### 1. `koios-billable-events`
**Purpose:** Usage tracking events sent TO the billing service for metering

**Producers:** Auth service, App services
**Consumer:** Billing service

**Events:**
- `member.created` - Track new team members for billing
- `member.removed` - Track removed members
- `tenant.created` - Initialize billing for new tenant
- `api.call` - Track API usage for metered billing
- And more...

### 2. `koios-billing-events`
**Purpose:** Billing state change notifications sent FROM the billing service

**Producer:** Billing service
**Consumers:** Auth service, Notifications service, Analytics service

**Events:**
- `billing.plan_changed` - Subscription plan was upgraded/downgraded
- `billing.payment_failed` - Payment attempt failed
- `billing.subscription_cancelled` - Subscription was cancelled
- `billing.usage_limit_exceeded` - Tenant exceeded plan limits

### 3. `koios-email`
**Purpose:** Email notification requests

**Producers:** Multiple services (Auth, Billing, etc.)
**Consumer:** Email service

**Events:**
- `email.send_requested` - Request to send an email
- `email.sent` - Email was successfully sent
- `email.failed` - Email delivery failed

## Usage Examples

### Sending Billable Events (Auth Service → Billing Service)

```typescript
import { createMemberCreatedEvent } from '@koios/shared-types'

// When a new member joins a tenant
const event = createMemberCreatedEvent({
  tenantId: 'tenant_123',
  userId: 'user_456',
  email: 'member@example.com',
  role: 'member'
})

await env.BILLABLE_EVENTS_QUEUE.send(event)
```

### Consuming Billable Events (Billing Service)

```typescript
import { parseBillableEvent } from '@koios/shared-types'
import type { BillableEvent } from '@koios/shared-types'

export async function queue(
  batch: MessageBatch<BillableEvent>,
  env: Env
): Promise<void> {
  for (const message of batch.messages) {
    try {
      const event = parseBillableEvent(message.body)

      switch (event.type) {
        case 'member.created':
          await handleMemberCreated(event, env)
          break
        case 'api.call':
          await recordApiUsage(event, env)
          break
        // ... handle other event types
      }

      message.ack()
    } catch (error) {
      console.error('Failed to process event:', error)
      message.retry()
    }
  }
}
```

### Sending Billing Events (Billing Service → Auth Service)

```typescript
import { createPlanChangedEvent } from '@koios/shared-types'

// When a subscription plan changes
const event = createPlanChangedEvent({
  tenantId: 'tenant_123',
  oldPlan: 'starter',
  newPlan: 'pro',
  effectiveDate: Date.now(),
  reason: 'upgrade'
})

await env.BILLING_EVENTS_QUEUE.send(event)
```

### Consuming Billing Events (Auth Service)

```typescript
import { parseBillingEvent } from '@koios/shared-types'
import type { BillingEvent } from '@koios/shared-types'

export async function queue(
  batch: MessageBatch<BillingEvent>,
  env: Env
): Promise<void> {
  for (const message of batch.messages) {
    try {
      const event = parseBillingEvent(message.body)

      if (event.type === 'billing.plan_changed') {
        await updateTenantPlan(event.tenantId, event.newPlan)
      } else if (event.type === 'billing.payment_failed') {
        await notifyPaymentFailure(event)
      }

      message.ack()
    } catch (error) {
      console.error('Failed to process billing event:', error)
      message.retry()
    }
  }
}
```

## Type Safety

All events use Zod for runtime validation and TypeScript for compile-time type safety:

```typescript
import { MemberCreatedEventSchema } from '@koios/shared-types'
import type { MemberCreatedEvent } from '@koios/shared-types'

// Runtime validation
const event = MemberCreatedEventSchema.parse(untrustedData)

// TypeScript type checking
const typedEvent: MemberCreatedEvent = {
  type: 'member.created',
  timestamp: Date.now(),
  tenantId: 'tenant_123',
  userId: 'user_456',
  role: 'member'
}
```

## Common Types

The package also exports common domain types:

```typescript
import type { Plan, Currency, UserRole } from '@koios/shared-types'

const plan: Plan = 'pro'
const currency: Currency = 'usd'
const role: UserRole = 'admin'
```

## Development

```bash
# Install dependencies
pnpm install

# Type check
pnpm run type-check

# Build the package
pnpm run build

# Clean build artifacts
pnpm run clean
```

## Versioning

This package follows semantic versioning:

- **Major version** - Breaking changes to event schemas (requires coordinated deployment)
- **Minor version** - New event types or optional fields (backward compatible)
- **Patch version** - Bug fixes, documentation updates

## Contributing

When adding new event types:

1. Add the event schema to the appropriate file (`billable-events.ts`, `billing-events.ts`, or `email-events.ts`)
2. Export the schema, type, and creator function
3. Add exports to `src/index.ts`
4. Update this README with usage examples
5. Bump the version in `package.json`
6. Coordinate deployment with affected services

## License

MIT
