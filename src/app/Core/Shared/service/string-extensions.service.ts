import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringExtensionsService {

  constructor() { }

  resolveEmptyStringToNull(value: string): string | null {
    if (value != null) {
      return value.trim().length == 0 ? null : value;
    }
    return value;
  }

  HasValue(value: string): boolean {
    return value !== null && value.trim().length > 0;
  }
}
