import { HttpInterceptorFn } from '@angular/common/http';

export const errormessageInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
