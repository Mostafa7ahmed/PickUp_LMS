import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('UserAuth');

  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  const modifiedReq = req.clone({
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  });

  return next(modifiedReq);
};
