import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spliceDescreption',
  standalone: true
})
export class SpliceDescreptionPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const words = value.split(' '); // تقسيم النص إلى كلمات
    if (words.length > 25) {
      return words.slice(0, 25).join(' ') + '...'; // أخذ أول 25 كلمة وإضافة "..."
    }
    return value;
  }

}
