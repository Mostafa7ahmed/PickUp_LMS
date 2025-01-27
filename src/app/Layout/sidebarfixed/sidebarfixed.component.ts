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
  imports: [NzButtonModule, NzMenuModule, NzToolTipModule  , RouterLinkActive,CommonModule, RouterLink],
  templateUrl: './sidebarfixed.component.html',
  styleUrl: './sidebarfixed.component.scss',
  
})
export class SidebarfixedComponent {

  activeDropdown: boolean = false;

  toggleDropdown() {
    this.activeDropdown = !this.activeDropdown ;
    return this.activeDropdown;
  }

  menuItems = [
    { icon: 'fas fa-home', label: 'Home' },
    { icon: 'fas fa-user', label: 'Profile' },
    { icon: 'fas fa-cogs', label: 'Settings' },
    { icon: 'fas fa-sign-out-alt', label: 'Logout' },
  ];
  @Input() isCollapsed: boolean = true; // هذه القيمة تأتي من الـ AppComponent

  @Output() toggleSidebarEvent = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // التبديل بين المصغر والموسع
    this.toggleSidebarEvent.emit(this.isCollapsed); // إرسال الحدث إلى الـ AppComponent
  }
}