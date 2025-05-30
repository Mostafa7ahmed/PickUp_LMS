import { CanActivateFn } from '@angular/router';

export const instructorGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('roles');
  return role === 'Instructor';
};
