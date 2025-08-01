import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Notification } from './core/interface/notification';
import { GetallnotifactionService } from './core/service/getallnotifaction.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../Environments/environment';

@Component({
  selector: 'app-navbar-student',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule],
  templateUrl: './navbar-student.component.html',
  styleUrl: './navbar-student.component.scss'
})
export class NavbarStudentComponent {
  private translate = inject(TranslateService);
  private _LoginService = inject(LoginService);
  private _NzMessageService = inject(NzMessageService);
  private _getallnotifactionService = inject(GetallnotifactionService);
  private router = inject(Router);

  dataUser: Decode = {} as Decode;
  Imageurl:string = environment.baseUrlFiles;

  isAddMenuOpen = false;
  isAccountMenuOpen = false;
  isNotificationsMenuOpen = false;
  notifications: Notification[] = [];

  constructor(private eRef: ElementRef) {
    // Set default language and available languages
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en', 'ar']);

    // Get the browser language or saved language
    const savedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    const langToUse = savedLang || (browserLang?.match(/en|ar/) ? browserLang : 'en');

    // Use the determined language
    this.translate.use(langToUse);
  }

  ngOnInit() {
    this.dataUser = this._LoginService.saveUserAuth();
    this.notifications = this._getallnotifactionService.notifications;
    console.log(this.dataUser);
  }

  openPopup() {
    this.toggleAccountMenu();
    this.router.navigate(['/Student', { outlets: { dialog: ['ChangePasswordPopup'] } }]);
  }

  routeProfile(): void {
    this.toggleAccountMenu();
    this.router.navigate(['Student/myprofile']);
  }

  logOut() {
    this.translate.get('LogOut.LOGOUT_SUCCESS').subscribe((res: string) => {
      this._NzMessageService.success(res);
    });
    this._LoginService.SignOut();
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
    this.isAddMenuOpen = false;
    this.isNotificationsMenuOpen = false;
  }

  toggleNotificationsMenu() {
    this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
    this.isAccountMenuOpen = false;
    this.isAddMenuOpen = false;
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  markAsRead(notification: Notification): void {
    notification.isRead = true;
    this.isNotificationsMenuOpen = false;
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.isRead = true);
  }

  viewAllNotifications(): void {
    this.isNotificationsMenuOpen = false;
    console.log('Full notifications page - component not yet created');
  }

  getNotificationIcon(type: string): string {
    const iconMap: Record<string, string> = {
      'course': 'fa-solid fa-graduation-cap',
      'assignment': 'fa-solid fa-tasks',
      'grade': 'fa-solid fa-star',
      'announcement': 'fa-solid fa-bullhorn',
      'info': 'fa-solid fa-info-circle',
      'success': 'fa-solid fa-check-circle',
      'warning': 'fa-solid fa-exclamation-triangle',
      'error': 'fa-solid fa-times-circle'
    };
    return iconMap[type] || 'fa-solid fa-bell';
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${diffInDays}d ago`;
    }
  }

  @HostListener('document:click', ['$event'])
  closeMenus(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isAddMenuOpen = false;
      this.isAccountMenuOpen = false;
    }
  }

  ChangeLang(lang: string) {
    this.toggleAccountMenu();

    // Save the language preference
    localStorage.setItem('lang', lang);

    // Use the new language
    this.translate.use(lang);

    // Show success message
    this.translate.get('Langaue.LANGUAGE_CHANGED').subscribe((res: string) => {
      this._NzMessageService.success(res);
    });
  }

  openAddTaskPopup(): void {
    this.router.navigate(['/Student', { outlets: { dialog: ['taskTodoStudent'] } }]);
  }

  openWalletPopup(): void {
    this.router.navigate(['/Student', { outlets: { dialog: ['wallet'] } }]);
  }

  ToggleLang() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.ChangeLang(newLang);
  }
}
