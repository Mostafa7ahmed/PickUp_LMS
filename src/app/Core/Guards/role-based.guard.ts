import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RolePermissionService } from '../Services/role-permission.service';

export function roleBasedGuard(allowedRoles: string[], requiredPermission?: string): CanActivateFn {
  return (route, state) => {
    const roleService = inject(RolePermissionService);
    const router = inject(Router);
    
    const currentRole = roleService.getCurrentUserRole();
    
    // Check if user is authenticated
    if (!currentRole) {
      router.navigate(['/login']);
      return false;
    }
    
    // Check if user's role is allowed
    const hasValidRole = allowedRoles.includes(currentRole) || 
                        allowedRoles.some(role => role.toLowerCase() === currentRole.toLowerCase());
    
    if (!hasValidRole) {
      console.warn(`Access denied: Role '${currentRole}' not in allowed roles [${allowedRoles.join(', ')}]`);
      roleService.handleUnauthorizedAccess(state.url);
      return false;
    }
    
    // Check specific permission if required
    if (requiredPermission && !roleService.hasPermission(requiredPermission)) {
      console.warn(`Access denied: Missing permission '${requiredPermission}' for role '${currentRole}'`);
      roleService.handleUnauthorizedAccess(state.url);
      return false;
    }
    
    return true;
  };
}

// Specific guards for common use cases
export const instructorOnlyGuard: CanActivateFn = roleBasedGuard(['Instructor']);
export const studentOnlyGuard: CanActivateFn = roleBasedGuard(['Student']);
export const createContentGuard: CanActivateFn = roleBasedGuard(['Instructor'], 'create_course'); 