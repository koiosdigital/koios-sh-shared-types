/**
 * Device modules — the canonical set of known hardware device classes.
 *
 * A device's "class" is the hardware target its firmware or OS image is built
 * for: the chip on a microcontroller (`esp32s3`), the system-on-chip or the
 * architecture on a Linux machine (`tegra234`, `linux-arm64`). This is the
 * single source of truth the platform pulls from — never hardcode the list per
 * service:
 *
 *  - the VN gateway enforces that a device's self-reported `fw.class` is one of
 *    these (unknown ⇒ the device is disconnected);
 *  - the OTA service's ESP adapter derives its `device_classes` from the `esp`
 *    family (so `GET /v1/device-classes` stays in sync as new silicon is added);
 *  - the IoT control plane validates classes against it.
 *
 * Adding support for a new target is a one-line change here that lands everywhere.
 */
/** What kind of device a class is; decides which firmware formats can target it. */
export type DeviceFamily = 'esp' | 'linux';
export interface DeviceModule {
    /** Class value stored/reported/targeted, e.g. `esp32s3`. */
    value: string;
    /** Human label for pickers, e.g. `ESP32-S3`. */
    label: string;
    family: DeviceFamily;
}
export declare const DEVICE_MODULES: readonly DeviceModule[];
/** The classes of one family, e.g. what an ESP-IDF image can target. */
export declare function deviceModulesOf(family: DeviceFamily): DeviceModule[];
/** Set of known class values, for O(1) membership checks. */
export declare const KNOWN_DEVICE_CLASSES: ReadonlySet<string>;
/** True when `value` is a known device class (exact match). */
export declare function isKnownDeviceClass(value: string): boolean;
//# sourceMappingURL=device-classes.d.ts.map