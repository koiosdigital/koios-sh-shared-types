/**
 * Device modules — the canonical set of known hardware device classes.
 *
 * A device's "class" is its silicon target (e.g. `esp32s3`). This is the single
 * source of truth the platform pulls from — never hardcode the list per service:
 *
 *  - the VN gateway enforces that a device's self-reported `fw.class` is one of
 *    these (unknown ⇒ the device is disconnected);
 *  - the OTA service's ESP adapter derives its `device_classes` from this list
 *    (so `GET /v1/device-classes` stays in sync as new silicon is added);
 *  - the IoT control plane validates classes against it.
 *
 * Adding support for a new chip is a one-line change here that lands everywhere.
 */

export interface DeviceModule {
  /** Class value stored/reported/targeted, e.g. `esp32s3`. */
  value: string
  /** Human label for pickers, e.g. `ESP32-S3`. */
  label: string
}

export const DEVICE_MODULES: readonly DeviceModule[] = [
  { value: 'esp32', label: 'ESP32' },
  { value: 'esp32s2', label: 'ESP32-S2' },
  { value: 'esp32s3', label: 'ESP32-S3' },
  { value: 'esp32c2', label: 'ESP32-C2' },
  { value: 'esp32c3', label: 'ESP32-C3' },
  { value: 'esp32c5', label: 'ESP32-C5' },
  { value: 'esp32c6', label: 'ESP32-C6' },
  { value: 'esp32h2', label: 'ESP32-H2' },
  { value: 'esp32p4', label: 'ESP32-P4' },
] as const

/** Set of known class values, for O(1) membership checks. */
export const KNOWN_DEVICE_CLASSES: ReadonlySet<string> = new Set(
  DEVICE_MODULES.map((m) => m.value)
)

/** True when `value` is a known device class (exact match). */
export function isKnownDeviceClass(value: string): boolean {
  return KNOWN_DEVICE_CLASSES.has(value)
}
