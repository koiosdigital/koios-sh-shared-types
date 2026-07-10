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
    value: string;
    /** Human label for pickers, e.g. `ESP32-S3`. */
    label: string;
}
export declare const DEVICE_MODULES: readonly DeviceModule[];
/** Set of known class values, for O(1) membership checks. */
export declare const KNOWN_DEVICE_CLASSES: ReadonlySet<string>;
/** True when `value` is a known device class (exact match). */
export declare function isKnownDeviceClass(value: string): boolean;
//# sourceMappingURL=device-classes.d.ts.map