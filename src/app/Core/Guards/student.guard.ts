import { CanActivateFn } from '@angular/router';

export const studentGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('roles');
  console.log('Student Guard Role:', role);
  return role?.toLowerCase() === 'student';
};