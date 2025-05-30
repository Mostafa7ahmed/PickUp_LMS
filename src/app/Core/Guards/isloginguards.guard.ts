import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const isloginguardsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem("UserAuth");
  const role = localStorage.getItem("roles");

  if (token && role) {
    if (role === 'Instructor') {
      router.navigate(['/Instructor/homeInstructor']);
    } else if (role === 'Student') {
      router.navigate(['Student/homeStudent']);
    } else {
      router.navigate(['/']);
    }

    return false;
  }

  return true;
};
