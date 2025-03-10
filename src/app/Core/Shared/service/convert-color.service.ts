import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertColorService {

  constructor() { }
  convertHexToRgba(hex: string, opacity: number = 1): string {
    hex = hex.replace('#', '');

    if (hex.length !== 6) {
      console.error('Invalid HEX color:', hex);
      return '#3e97ff1a';

    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } 
}
