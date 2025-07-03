import { Component } from '@angular/core';
import { NavbarinstructorComponent } from "../navbarinstructor/navbarinstructor.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarfixedComponent } from "../sidebarfixed/sidebarfixed.component";

@Component({
  selector: 'app-routesinstructor',
  standalone: true,
  imports: [NavbarinstructorComponent, RouterOutlet, CommonModule, SidebarfixedComponent],
  templateUrl: './routesinstructor.component.html',
  styleUrl: './routesinstructor.component.scss'
})
export class RoutesinstructorComponent {

  isCollapsed = false; 

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
