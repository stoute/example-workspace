import { createContext, useEffect } from 'react';
import { createContextualCan } from '@casl/react';
import { AbilityBuilder } from '@casl/ability';
import { PermissionsService } from '@bsmp/core';

export const ability = AbilityBuilder.define((can, cannot) => {
  // can('read', 'all')
  // can('manage', 'Post', { author: loggedInUser.id })
  // cannot('delete', 'Post', { 'comments.0': { $exists: true } })
});
export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);

export const useAbilityContext = (roles: any = null) => {
  const permissions: PermissionsService = PermissionsService.instance;

  useEffect(() => {
    permissions.registerAbilityInstance(ability);
    if (roles) permissions.defineRoles(roles);
  }, []);

  useEffect(() => {
    if (roles) permissions.defineRoles(roles);
  }, [roles]);

  const initPermissions = (roles) => {
    permissions.defineRoles(roles);
  };

  return {
    ability,
    AbilityContext,
    Can,
    permissions,
    initPermissions,
    roles
  };
};
