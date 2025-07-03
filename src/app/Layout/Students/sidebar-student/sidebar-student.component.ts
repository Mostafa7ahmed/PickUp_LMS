import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { TranslationService } from '../../../Core/Services/translation.service';

@Component({
  selector: 'app-sidebar-student',
  standalone: true,
  imports: [TooltipModule, RouterLinkActive, TranslateModule, CommonModule, RouterLink],
  templateUrl: './sidebar-student.component.html',
  styleUrl: '../../Instructor/sidebarfixed/sidebarfixed.component.scss'
})
export class SidebarStudentComponent implements OnInit {
  private translate = inject(TranslateService);
  private translationService = inject(TranslationService);
  
  ngOnInit() {
    // Ensure translations are loaded
    this.translationService.SetLang();
  }

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
      name: 'StudentSidebar.HomePage',
      Icon: 'fa-solid fa-house',
      routes: "homeStudent"
    },
    {
      name: 'StudentSidebar.Course',
      Icon: 'fa-solid fa-person-chalkboard',
      routes: "myCourse"
    },
     {
      name: 'InstructorSidebar.Chat',
      Icon: 'fa-solid fa-comments ',
      routes: "chat"
    },
    {
      name: 'StudentSidebar.DiscoverCourses',
      Icon: 'fa-solid fa-compass',
      routes: "DiscoverCourses"
    },
    {
      name: 'StudentSidebar.ToDo',
      Icon: 'fa-solid fa-list-check',
      routes: "Todo"
    },
  ];

  openIndex: number | null = null;
  isRotated: boolean = false;

  toggleCard(index: number) {
    this.isRotated = !this.isRotated;
    this.openIndex = this.openIndex === index ? null : index;
  }
}
