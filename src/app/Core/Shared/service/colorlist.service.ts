import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorlistService {

  colors =["bg-danger", "bg-primary", "bg-warning", "bg-success", "bg-info", "bg-dark" , "bg-light" , "bg-primary"];



  getColors() {
    return this.colors.map(i => i);
  }
  constructor() { }
}
