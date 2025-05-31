import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebar-student',
  standalone: true,
  imports: [TooltipModule, RouterLinkActive, TranslateModule, CommonModule, RouterLink],
  templateUrl: './sidebar-student.component.html',
  styleUrl: '../../Instructor/sidebarfixed/sidebarfixed.component.scss'
})
export class SidebarStudentComponent {

  
  activeIndex: number | null = null;

  togglesidebarCollaped(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  isCollapsed: boolean = false;


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.activeIndex = null;

  }


  toggleRoute() {
    this.activeIndex = null;
  }








  ListSidebarOpen = [
    {
      name: 'Dashboard',
      Icon: 'fa-solid fa-house',
      routes: "/Student/homeStudent"
    },
    {
      name: 'My Courses',
      Icon: 'fa-solid fa-graduation-cap',
      routes: "/Student/courses"
    },
    {
      name: 'To Do',
      Icon: 'fa-solid fa-list-check',
      routes: "/Student/todo"
    },
    {
      name: 'Chat',
      Icon: 'fa-regular fa-comment-dots',
      routes: "/Student/chat"
    },
    // Commented out routes until components are created
    // {
    //   name: 'My Progress',
    //   Icon: 'fa-solid fa-chart-line',
    //   routes: "/Student/progress"
    // },
    // {
    //   name: 'Quizzes',
    //   Icon: 'fa-solid fa-clipboard-question',
    //   routes: "/Student/quizzes"
    // },
    // {
    //   name: 'Certificates',
    //   Icon: 'fa-solid fa-certificate',
    //   routes: "/Student/certificates"
    // }
  ];


  openIndex: number | null = null;
  isRotated: boolean = false;

  toggleCard(index: number) {
    this.isRotated = !this.isRotated;
    this.openIndex = this.openIndex === index ? null : index;
  }


}
