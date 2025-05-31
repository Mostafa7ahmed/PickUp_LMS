import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navlandingpage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navlandingpage.component.html',
  styleUrl: './navlandingpage.component.scss'
})
export class NavlandingpageComponent {
showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
