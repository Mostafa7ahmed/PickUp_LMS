import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarStudentComponent } from "../sidebar-student/sidebar-student.component";
import { NavbarStudentComponent } from "../navbar-student/navbar-student.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-studdents',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarStudentComponent,
    NavbarStudentComponent,
    TranslateModule
  ],
  templateUrl: './route-studdents.component.html',
  styleUrl: './route-studdents.component.scss'
})
export class RouteStuddentsComponent implements OnInit {
  private translate = inject(TranslateService);
  isCollapsed = false;

  constructor() {
    // Set default language and available languages
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en', 'ar']);

    // Get the browser language
    const browserLang = this.translate.getBrowserLang();

    // Try to use browser language if available, otherwise use default
    this.translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
  }

  ngOnInit() {
    // Load saved language preference
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.translate.use(savedLang);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
