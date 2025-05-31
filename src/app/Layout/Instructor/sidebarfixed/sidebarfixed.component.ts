import { CommonModule, } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebarfixed',
  standalone: true,
  imports: [TooltipModule, RouterLinkActive, TranslateModule, CommonModule, RouterLink],
  templateUrl: './sidebarfixed.component.html',
  styleUrl: './sidebarfixed.component.scss',

})
export class SidebarfixedComponent {


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
      routes: "/Instructor/homeInstructor"
    },
    {
      name: 'Board',
      Icon: 'fa-solid fa-envelopes-bulk',
      routes: "/Instructor/topics"
    },
    {
      name: 'Course',
      Icon: 'fa-solid fa-person-chalkboard',
      routes: "/Instructor/course"
    },
    {
      name: 'Quiz',
      Icon: 'fa-solid fa-clipboard-question',
      routes: "/Instructor/quizlist"
    },

    {
      name: 'Coupon',
      Icon: 'fa-receipt fa-solid',
      routes: "/Instructor/Couponslist"
    },
    // Commented out until Chat component is created
    // {
    //   name: 'Chat',
    //   Icon: 'fa-regular fa-comment-dots',
    //   routes: "/Instructor/chat"
    // },  
    
    {
      name: 'To Do',
      Icon: 'fa-solid fa-list-check',
      routes: "/Instructor/todo"
    },
  ];


  openIndex: number | null = null;
  isRotated: boolean = false;

  toggleCard(index: number) {
    this.isRotated = !this.isRotated;
    this.openIndex = this.openIndex === index ? null : index;
  }


}
