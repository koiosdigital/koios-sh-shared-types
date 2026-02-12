/**
 * Permission Definitions
 *
 * Raw permission list shared across all Koios services.
 * Downstream services use this to validate permissions in JWT tokens.
 *
 * NOTE: Permission-to-role mappings and resolution logic are internal to the auth service.
 */
/**
 * All available permissions in the system
 */
export declare const PERMISSIONS: readonly [{
    readonly id: "devices.read";
    readonly resource: "devices";
    readonly action: "read";
    readonly description: "View devices";
}, {
    readonly id: "devices.write";
    readonly resource: "devices";
    readonly action: "write";
    readonly description: "Create and update devices";
}, {
    readonly id: "devices.delete";
    readonly resource: "devices";
    readonly action: "delete";
    readonly description: "Delete devices";
}, {
    readonly id: "firmware.read";
    readonly resource: "firmware";
    readonly action: "read";
    readonly description: "View firmware";
}, {
    readonly id: "firmware.write";
    readonly resource: "firmware";
    readonly action: "write";
    readonly description: "Upload and update firmware";
}, {
    readonly id: "firmware.delete";
    readonly resource: "firmware";
    readonly action: "delete";
    readonly description: "Delete firmware";
}, {
    readonly id: "firmware.deploy";
    readonly resource: "firmware";
    readonly action: "deploy";
    readonly description: "Deploy firmware to devices";
}, {
    readonly id: "users.read";
    readonly resource: "users";
    readonly action: "read";
    readonly description: "View team members";
}, {
    readonly id: "users.invite";
    readonly resource: "users";
    readonly action: "invite";
    readonly description: "Invite new team members";
}, {
    readonly id: "users.manage";
    readonly resource: "users";
    readonly action: "manage";
    readonly description: "Manage team member roles";
}, {
    readonly id: "users.remove";
    readonly resource: "users";
    readonly action: "remove";
    readonly description: "Remove team members";
}, {
    readonly id: "billing.read";
    readonly resource: "billing";
    readonly action: "read";
    readonly description: "View billing information";
}, {
    readonly id: "billing.manage";
    readonly resource: "billing";
    readonly action: "manage";
    readonly description: "Manage billing and subscriptions";
}, {
    readonly id: "tenant.settings";
    readonly resource: "tenant";
    readonly action: "settings";
    readonly description: "Manage tenant settings";
}, {
    readonly id: "tenant.sso";
    readonly resource: "tenant";
    readonly action: "sso";
    readonly description: "Configure SSO connections";
}, {
    readonly id: "audit.read";
    readonly resource: "audit";
    readonly action: "read";
    readonly description: "View audit logs";
}, {
    readonly id: "audit.export";
    readonly resource: "audit";
    readonly action: "export";
    readonly description: "Export audit logs";
}, {
    readonly id: "pki.read";
    readonly resource: "pki";
    readonly action: "read";
    readonly description: "View CAs, certificates, stats, and audit logs";
}, {
    readonly id: "pki.sign";
    readonly resource: "pki";
    readonly action: "sign";
    readonly description: "Sign CSRs and issue leaf certificates";
}, {
    readonly id: "pki.revoke";
    readonly resource: "pki";
    readonly action: "revoke";
    readonly description: "Revoke certificates";
}, {
    readonly id: "pki.ca.create";
    readonly resource: "pki";
    readonly action: "ca.create";
    readonly description: "Create tenant intermediate CAs (managed mode)";
}, {
    readonly id: "pki.ca.upload";
    readonly resource: "pki";
    readonly action: "ca.upload";
    readonly description: "Upload BYOCA roots and intermediates";
}, {
    readonly id: "pki.ca.manage";
    readonly resource: "pki";
    readonly action: "ca.manage";
    readonly description: "Roll, retire, and revoke CAs";
}, {
    readonly id: "rbac.groups.read";
    readonly resource: "rbac";
    readonly action: "groups.read";
    readonly description: "View groups";
}, {
    readonly id: "rbac.groups.create";
    readonly resource: "rbac";
    readonly action: "groups.create";
    readonly description: "Create groups";
}, {
    readonly id: "rbac.groups.update";
    readonly resource: "rbac";
    readonly action: "groups.update";
    readonly description: "Update group details";
}, {
    readonly id: "rbac.groups.delete";
    readonly resource: "rbac";
    readonly action: "groups.delete";
    readonly description: "Delete groups";
}, {
    readonly id: "rbac.groups.members";
    readonly resource: "rbac";
    readonly action: "groups.members";
    readonly description: "Manage group membership";
}, {
    readonly id: "rbac.roles.assign";
    readonly resource: "rbac";
    readonly action: "roles.assign";
    readonly description: "Assign roles to groups/users/SAs";
}, {
    readonly id: "rbac.permissions.assign";
    readonly resource: "rbac";
    readonly action: "permissions.assign";
    readonly description: "Assign direct permissions";
}];
export type PermissionId = (typeof PERMISSIONS)[number]['id'];
//# sourceMappingURL=permissions.d.ts.map