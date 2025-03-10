import { CommonModule ,} from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebarfixed',
  standalone: true,
  imports: [NzButtonModule, NzMenuModule, NzToolTipModule , RouterLinkActive  ,CommonModule, RouterLink],
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
  }


  toggleRoute(){
    this.activeIndex = null;
  }









  ListSidebarOpen = [
    { 
      name: 'Transaction 1', 
      Icon: 'fa-solid fa-money-bill-transfer', 
      list: ["course List", "course"], 
      routes: ["courseList", "course"]
    },
    { 
      name: 'Courses',  
      Icon: 'fa-solid fa-chalkboard-user', 
      list: ["Board", "course List", "Dashboard"], 
      routes: ["topic", "course", "topics"]
    }
    ,
    { 
      name: 'Follower',  
      Icon: 'fa-solid fa-user-check', 
      list: ["Users", "Students"], 
      routes: ["Users", "Students"]
    },
    { 
      name: 'Notification',  
      Icon: 'fa-regular fa-bell', 
      list: ["Message", "Notification"], 
      routes: ["Message", "Notification"]
    }
    ,
    { 
      name: 'Setting',  
      Icon: 'fa-solid fa-gear', 
      list: ["Message", "Log Up"], 
      routes: ["Message", "login"]
    }
  ];
  
  openIndex: number | null = null;
  isRotated: boolean = false; 

  toggleCard(index: number) {
    this.isRotated = !this.isRotated; // تبديل الحالة
    this.openIndex = this.openIndex === index ? null : index;
  }


}