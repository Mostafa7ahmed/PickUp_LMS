import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splicText',
  standalone: true
})
export class SplicTextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.length > 40 ? value.substring(0, 40) + '...' : value;
  }
}