import { CommonModule, } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebarfixed',
  standalone: true,
  imports: [TooltipModule, RouterLinkActive, CommonModule, RouterLink],
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
      name: 'Transaction ',
      Icon: 'fa-solid fa-money-bill-transfer',
      list: ["Transaction List", "Transaction  "],
      routes: ["Transactionlist", "Dashboard "]
    },
    {
      name: 'Courses',
      Icon: 'fa-solid fa-person-chalkboard',

      list: ["Board", "course List", "Dashboard"],
      routes: ["topics", "course", "Dashboard"]
    }
    ,
    {
      name: 'Follower',
      Icon: 'fa-kit fa-213-frame',
      list: ["Users", "Students"],
      routes: ["Users", "Students"]
    },
    {
      name: 'Notification',
      Icon: 'fa-solid fa-bell',
      list: ["Message", "Notification"],
      routes: ["Message", "Notification"]
    }
    ,
    {
      name: 'Setting',
      Icon: 'fa-solid fa-gear',
      list: ["Message", "Log Out"],
      routes: ["Message", "login"]
    }
  ];

  openIndex: number | null = null;
  isRotated: boolean = false;

  toggleCard(index: number) {
    this.isRotated = !this.isRotated;
    this.openIndex = this.openIndex === index ? null : index;
  }


}
