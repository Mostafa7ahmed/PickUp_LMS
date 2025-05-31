import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navlandingpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navlandingpage.component.html',
  styleUrl: './navlandingpage.component.scss'
})
export class NavlandingpageComponent {
showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
