import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const isloginguardsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem("UserAuth");
  const role = localStorage.getItem("roles");

  // Allow access to landing page even when logged in
  if (state.url === '/LandingPage' || state.url === '/landing-preview') {
    return true;
  }

  if (token && role) {
    if (role === 'Instructor') {
      router.navigate(['/Instructor/homeInstructor']);
    } else if (role === 'Student') {
      router.navigate(['/Student/homeStudent']);
    } else {
      router.navigate(['/']);
    }

    return false;
  }

  return true;
};
