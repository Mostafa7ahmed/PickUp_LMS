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
      name: 'Sidebar.Transaction',
      Icon: 'fa-kit fa-transaction-cp',
      list: ["Sidebar.TransactionList", "Sidebar.Transaction"],
      routes: ["Transactionlist", "Dashboard"]
    },
    {
      name: 'Sidebar.Courses',
      Icon: 'fa-solid fa-person-chalkboard',
      list: ["Sidebar.Board", "Sidebar.CourseList", "Sidebar.Dashboard"],
      routes: ["topics", "course", "Couponslist"]
    },
    {
      name: 'Sidebar.curricula',
      Icon: 'fa-solid fa-person-chalkboard',
      list: ["Sidebar.Dashboard", "Sidebar.quizlist"],
      routes: ["Couponslist", "quizlist"]
    },
    {
      name: 'Sidebar.Follower',
      Icon: 'fa-kit fa-213-frame',
      list: ["Sidebar.Users", "Sidebar.Students"],
      routes: ["Users", "Students"]
    },

    {
      name: 'Sidebar.Setting',
      Icon: 'fa-solid fa-gear',
      list: ["Sidebar.Message", "Sidebar.Logout"],
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
