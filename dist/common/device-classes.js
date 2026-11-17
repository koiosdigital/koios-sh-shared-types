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
export const DEVICE_MODULES = [
    { value: 'esp32', label: 'ESP32', family: 'esp' },
    { value: 'esp32s2', label: 'ESP32-S2', family: 'esp' },
    { value: 'esp32s3', label: 'ESP32-S3', family: 'esp' },
    { value: 'esp32c2', label: 'ESP32-C2', family: 'esp' },
    { value: 'esp32c3', label: 'ESP32-C3', family: 'esp' },
    { value: 'esp32c5', label: 'ESP32-C5', family: 'esp' },
    { value: 'esp32c6', label: 'ESP32-C6', family: 'esp' },
    { value: 'esp32h2', label: 'ESP32-H2', family: 'esp' },
    { value: 'esp32p4', label: 'ESP32-P4', family: 'esp' },
    // Linux devices (koios-agent). A board with its own OS image reports its
    // system-on-chip; anything else reports `linux-<architecture>`.
    { value: 'tegra234', label: 'NVIDIA Jetson Orin (T234)', family: 'linux' },
    { value: 'linux-arm64', label: 'Linux (arm64)', family: 'linux' },
    { value: 'linux-x86_64', label: 'Linux (x86-64)', family: 'linux' },
];
/** The classes of one family, e.g. what an ESP-IDF image can target. */
export function deviceModulesOf(family) {
    return DEVICE_MODULES.filter((m) => m.family === family);
}
/** Set of known class values, for O(1) membership checks. */
export const KNOWN_DEVICE_CLASSES = new Set(DEVICE_MODULES.map((m) => m.value));
/** True when `value` is a known device class (exact match). */
export function isKnownDeviceClass(value) {
    return KNOWN_DEVICE_CLASSES.has(value);
}
//# sourceMappingURL=device-classes.js.map