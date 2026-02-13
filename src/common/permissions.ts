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
export const PERMISSIONS = [
  { id: 'devices.read', resource: 'devices', action: 'read', description: 'View devices' },
  {
    id: 'devices.write',
    resource: 'devices',
    action: 'write',
    description: 'Create and update devices',
  },
  { id: 'devices.delete', resource: 'devices', action: 'delete', description: 'Delete devices' },
  { id: 'firmware.read', resource: 'firmware', action: 'read', description: 'View firmware' },
  {
    id: 'firmware.write',
    resource: 'firmware',
    action: 'write',
    description: 'Upload and update firmware',
  },
  { id: 'firmware.delete', resource: 'firmware', action: 'delete', description: 'Delete firmware' },
  {
    id: 'firmware.deploy',
    resource: 'firmware',
    action: 'deploy',
    description: 'Deploy firmware to devices',
  },
  { id: 'users.read', resource: 'users', action: 'read', description: 'View team members' },
  {
    id: 'users.invite',
    resource: 'users',
    action: 'invite',
    description: 'Invite new team members',
  },
  {
    id: 'users.manage',
    resource: 'users',
    action: 'manage',
    description: 'Manage team member roles',
  },
  { id: 'users.remove', resource: 'users', action: 'remove', description: 'Remove team members' },
  {
    id: 'billing.read',
    resource: 'billing',
    action: 'read',
    description: 'View billing information',
  },
  {
    id: 'billing.manage',
    resource: 'billing',
    action: 'manage',
    description: 'Manage billing and subscriptions',
  },
  {
    id: 'tenant.settings',
    resource: 'tenant',
    action: 'settings',
    description: 'Manage tenant settings',
  },
  { id: 'tenant.sso', resource: 'tenant', action: 'sso', description: 'Configure SSO connections' },
  { id: 'audit.read', resource: 'audit', action: 'read', description: 'View audit logs' },
  { id: 'audit.export', resource: 'audit', action: 'export', description: 'Export audit logs' },
  {
    id: 'pki.read',
    resource: 'pki',
    action: 'read',
    description: 'View CAs, certificates, stats, and audit logs',
  },
  {
    id: 'pki.sign',
    resource: 'pki',
    action: 'sign',
    description: 'Sign CSRs and issue leaf certificates',
  },
  { id: 'pki.revoke', resource: 'pki', action: 'revoke', description: 'Revoke certificates' },
  {
    id: 'pki.ca.create',
    resource: 'pki',
    action: 'ca.create',
    description: 'Create tenant intermediate CAs (managed mode)',
  },
  {
    id: 'pki.ca.upload',
    resource: 'pki',
    action: 'ca.upload',
    description: 'Upload BYOCA roots and intermediates',
  },
  {
    id: 'pki.ca.manage',
    resource: 'pki',
    action: 'ca.manage',
    description: 'Roll, retire, and revoke CAs',
  },
  // RBAC management permissions
  { id: 'rbac.groups.read', resource: 'rbac', action: 'groups.read', description: 'View groups' },
  {
    id: 'rbac.groups.create',
    resource: 'rbac',
    action: 'groups.create',
    description: 'Create groups',
  },
  {
    id: 'rbac.groups.update',
    resource: 'rbac',
    action: 'groups.update',
    description: 'Update group details',
  },
  {
    id: 'rbac.groups.delete',
    resource: 'rbac',
    action: 'groups.delete',
    description: 'Delete groups',
  },
  {
    id: 'rbac.groups.members',
    resource: 'rbac',
    action: 'groups.members',
    description: 'Manage group membership',
  },
  {
    id: 'rbac.roles.assign',
    resource: 'rbac',
    action: 'roles.assign',
    description: 'Assign roles to groups/users/SAs',
  },
  {
    id: 'rbac.permissions.assign',
    resource: 'rbac',
    action: 'permissions.assign',
    description: 'Assign direct permissions',
  },
] as const

export type PermissionId = (typeof PERMISSIONS)[number]['id']
