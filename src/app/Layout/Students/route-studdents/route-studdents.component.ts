import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarStudentComponent } from "../sidebar-student/sidebar-student.component";
import { NavbarStudentComponent } from "../navbar-student/navbar-student.component";

@Component({
  selector: 'app-route-studdents',
  standalone: true,
  imports: [RouterOutlet, SidebarStudentComponent, NavbarStudentComponent],
  templateUrl: './route-studdents.component.html',
  styleUrl: './route-studdents.component.scss'
})
export class RouteStuddentsComponent {

  
  isCollapsed = false; 

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
