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
      name: 'Home Page',
      Icon: 'fa-solid fa-house',
      routes: "homeStudent"
    },
 
    {
      name: 'Course',
      Icon: 'fa-solid fa-person-chalkboard',
      routes: "course"
    },
       {
      name: 'Coupon',
      Icon: 'fa-receipt fa-solid',
      routes: "Couponslist"
    },
    {
      name: 'Quiz',
      Icon: 'fa-solid fa-clipboard-question',
      routes: "quizlist"
    },
    {
      name: 'Chat',
      Icon: 'fa-regular fa-comment-dots',
      
      routes: "quizlist"
    },  
    
    {
      name: 'To Do',
      Icon: 'fa-solid fa-list-check',
      routes: "quizlist"
    },
 
  ];


  openIndex: number | null = null;
  isRotated: boolean = false;

  toggleCard(index: number) {
    this.isRotated = !this.isRotated;
    this.openIndex = this.openIndex === index ? null : index;
  }


}
