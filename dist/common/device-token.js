/**
 * Device Token Claims
 *
 * Short-lived scoped JWTs minted by the device gateway (dnet) when a device
 * proves its identity (edge mTLS or API key). Downstream device-facing
 * resource servers (twin, telemetry ingest, firmware/OTA) verify these
 * against dnet's JWKS and authorize per-capability — they never see the
 * underlying certificate or API key.
 *
 * One audience is shared by ALL device-facing services; per-service
 * authorization happens via `caps`, not separate audiences.
 */
import { z } from 'zod';
/** Issuer URL — dnet publishes its JWKS at `${DNET_ISSUER_URL}/.well-known/jwks.json`. */
export const DNET_ISSUER_URL = 'https://vn.koios.sh';
/** Single audience for every device-facing resource server. */
export const DNET_DEVICE_AUDIENCE = 'koios-devices';
/**
 * Device capabilities — what a device token is allowed to do.
 * Effective caps come from the fleet's `default_caps` (or the platform
 * default below). Per-device overrides are intentionally not supported;
 * revocation is `devices.status = 'revoked'`.
 */
export const DEVICE_CAPS = [
    'twin.read',
    'twin.report',
    'telemetry.write',
    'ota.download',
    'logs.write',
];
export const DeviceCapSchema = z.enum(DEVICE_CAPS);
/** Caps minted when the fleet does not configure `default_caps`. */
export const DEFAULT_DEVICE_CAPS = [
    'twin.read',
    'twin.report',
    'telemetry.write',
    'ota.download',
];
/**
 * Claims carried by a dnet-minted device JWT (ES256, ~15 min TTL).
 */
export const DeviceTokenClaimsSchema = z.object({
    iss: z.string(),
    aud: z.literal(DNET_DEVICE_AUDIENCE),
    /** Device id (registry primary key). */
    sub: z.string(),
    tenant_id: z.string(),
    fleet_id: z.string(),
    /** Device class, e.g. 'esp32s3' — `COALESCE(device, fleet default, 'unknown')`. */
    device_class: z.string(),
    caps: z.array(DeviceCapSchema),
    jti: z.string(),
    iat: z.number(),
    exp: z.number(),
});
//# sourceMappingURL=device-token.js.map