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
export declare const DNET_ISSUER_URL = "https://vn.koios.sh";
/** Single audience for every device-facing resource server. */
export declare const DNET_DEVICE_AUDIENCE = "koios-devices";
/**
 * Device capabilities — what a device token is allowed to do.
 * Effective caps come from the fleet's `default_caps` (or the platform
 * default below). Per-device overrides are intentionally not supported;
 * revocation is `devices.status = 'revoked'`.
 */
export declare const DEVICE_CAPS: readonly ["twin.read", "twin.report", "telemetry.write", "ota.download", "logs.write"];
export type DeviceCap = (typeof DEVICE_CAPS)[number];
export declare const DeviceCapSchema: z.ZodEnum<{
    "twin.read": "twin.read";
    "twin.report": "twin.report";
    "telemetry.write": "telemetry.write";
    "ota.download": "ota.download";
    "logs.write": "logs.write";
}>;
/** Caps minted when the fleet does not configure `default_caps`. */
export declare const DEFAULT_DEVICE_CAPS: DeviceCap[];
/**
 * Claims carried by a dnet-minted device JWT (ES256, ~15 min TTL).
 */
export declare const DeviceTokenClaimsSchema: z.ZodObject<{
    iss: z.ZodString;
    aud: z.ZodLiteral<"koios-devices">;
    sub: z.ZodString;
    tenant_id: z.ZodString;
    fleet_id: z.ZodString;
    device_class: z.ZodString;
    caps: z.ZodArray<z.ZodEnum<{
        "twin.read": "twin.read";
        "twin.report": "twin.report";
        "telemetry.write": "telemetry.write";
        "ota.download": "ota.download";
        "logs.write": "logs.write";
    }>>;
    jti: z.ZodString;
    iat: z.ZodNumber;
    exp: z.ZodNumber;
}, z.core.$strip>;
export type DeviceTokenClaims = z.infer<typeof DeviceTokenClaimsSchema>;
//# sourceMappingURL=device-token.d.ts.map