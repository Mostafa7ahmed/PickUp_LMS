import { Component } from '@angular/core';
import { NavbarinstructorComponent } from "../navbarinstructor/navbarinstructor.component";
import { RouterOutlet } from '@angular/router';
import { SidebarfixedComponent } from "../../sidebarfixed/sidebarfixed.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routesinstructor',
  standalone: true,
  imports: [NavbarinstructorComponent, RouterOutlet, SidebarfixedComponent , CommonModule],
  templateUrl: './routesinstructor.component.html',
  styleUrl: './routesinstructor.component.scss'
})
export class RoutesinstructorComponent {

  isCollapsed = false; // الحالة الأولية للشريط الجانبي غير مصغرة

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // التبديل بين المصغر والموسع
  }

}
