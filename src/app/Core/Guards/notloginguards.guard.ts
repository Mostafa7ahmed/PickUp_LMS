import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function  notloginguardsGuard(expectedRole: string): CanActivateFn  {
 return (route, state) => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);
    if (isPlatformBrowser(platformId)) {
      const token = localStorage.getItem("UserAuth");
      const role = localStorage.getItem("roles");

      if (token && role === expectedRole) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }

    return false;
  };
 };
