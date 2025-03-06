import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splicText',
  standalone: true
})
export class SplicTextPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''; // إذا كانت القيمة غير معرّفة، أعد نصًا فارغًا
    return value.length > 10 ? value.substring(0, 10) + '...' : value;
  }  

}
