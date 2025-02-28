import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorlistService {

   colors:string[] = [
    "#515f32",
    "#dfde0d",
    "#f4d7c5",
    "#6f0dd1",
    "#298dba",
    "#ff4f4f",
    "#4f0df3",
    "#f2ca8a",
    "#ca6438",
    "#6d9ef4",
    "#40de74",
    "#a0151e"
  ];


  getColors() {
    return this.colors.map(i => i);
  }
  constructor() { }
}
