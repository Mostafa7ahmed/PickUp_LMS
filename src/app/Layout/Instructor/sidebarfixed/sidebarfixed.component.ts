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
      routes: "homeInstructor"
    },
    {
      name: 'Board',
      Icon: 'fa-solid fa-envelopes-bulk',
      routes: "topics"
    },
    {
      name: 'Course',
      Icon: 'fa-solid fa-person-chalkboard',
      routes: "course"
    },
    {
      name: 'Quiz',
      Icon: 'fa-solid fa-clipboard-question',
      routes: "quizlist"
    },

    {
      name: 'Coupon',
      Icon: 'fa-receipt fa-solid',
      routes: "Couponslist"
    },
        {
      name: 'Chat',
      Icon: 'fa-regular fa-comment-dots',
      
      routes: "Chat"
    },  
    
    {
      name: 'To Do',
      Icon: 'fa-solid fa-list-check',
      routes: "todo"
    },
  ];


  openIndex: number | null = null;
  isRotated: boolean = false;

  toggleCard(index: number) {
    this.isRotated = !this.isRotated;
    this.openIndex = this.openIndex === index ? null : index;
  }


}
