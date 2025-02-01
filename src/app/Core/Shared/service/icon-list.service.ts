import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconListService {



  icons = [
    { icon: 'fa fa-address-book' },
    { icon: 'fa fa-home' },
    { icon: 'fa fa-user' },
    { icon: 'fa fa-cog' },
    { icon: 'fa fa-heart' },
    { icon: 'fa fa-bell' },
    { icon: 'fa fa-envelope' },
    { icon: 'fa fa-star' }
  ];


  getIcons() {
    return this.icons.map(i => i.icon);
  }
  constructor() { }




}
