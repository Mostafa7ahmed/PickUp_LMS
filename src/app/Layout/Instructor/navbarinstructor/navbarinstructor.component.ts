import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';
import { TranslationService } from '../../../Core/Services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GetallnotifactionService } from './core/service/getallnotifaction.service';
import { Notification } from '../../Students/navbar-student/core/interface/notification';
import { CommonModule } from '@angular/common';
import { environment } from '../../../Environments/environment';

@Component({
  selector: 'app-navbarinstructor',
  standalone: true,
  imports: [RouterLink, TranslateModule , CommonModule],
  templateUrl: './navbarinstructor.component.html',
  styleUrl: '../../Students/navbar-student/navbar-student.component.scss',
})
export class NavbarinstructorComponent {
  private readonly _MytranslationService = inject(TranslationService);
  readonly _TranslateService = inject(TranslateService);
  private _LoginService = inject(LoginService);
  private _NzMessageService = inject(NzMessageService);
  private router = inject(Router);
  private _getallnotifactionService = inject(GetallnotifactionService);
  constructor(private eRef: ElementRef, private translate: TranslateService) {}
  dataUser: Decode = {} as Decode;
  Imageurl:string = environment.baseUrlFiles + this.dataUser.Photo;

  openPopup() {
    this.toggleAccountMenu();

    this.router.navigate([{ outlets: { dialog: ['ChangePasswordPopup'] } }]);
  }
  routeProfile(): void {
    this.toggleAccountMenu();

    this.router.navigate(['/myprofile']);
  }

  logOut() {
    this.translate.get('LogOut.LOGOUT_SUCCESS').subscribe((res: string) => {
      this._NzMessageService.success(res);
    });
    this._LoginService.SignOut();
  }

  ngOnInit() {
    this.dataUser = this._LoginService.saveUserAuth();
        this.notifications = this._getallnotifactionService.notifications

  }

  isAddMenuOpen = false;
  isAccountMenuOpen = false;


  toggleAddMenu() {
    this.isAddMenuOpen = !this.isAddMenuOpen;
    this.isAccountMenuOpen = false;
        this.isNotificationsMenuOpen = false;

  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
    this.isAddMenuOpen = false;
        this.isNotificationsMenuOpen = false;

  }
  isNotificationsMenuOpen = false;
  notifications: Notification[] = [];
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
    if (notification.actionUrl) {
      this.router.navigate([notification.actionUrl]);
    }
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

    this.translate.get('Langaue.LANGUAGE_CHANGED').subscribe((res: string) => {
      this._NzMessageService.success(res);
    });

    this._MytranslationService.ChangeLang(lang);

    this.translate.use(lang);
  }
  addTopic() {
    this.toggleAddMenu();
    this.router.navigate([{ outlets: { dialog: ['addTopic'] } }]);
  }
  addCourse() {
    this.toggleAddMenu();
    this.router.navigate([{ outlets: { dialog: ['addcourse'] } }]);
  }
  addTask() {
      this.isAddMenuOpen = false;
          this.isNotificationsMenuOpen = false;


    this.router.navigate([{ outlets: { dialog: ['addTaskInstrcutor'] } }]);
  }
  addCoupan() {
    this.toggleAddMenu();
    this.router.navigate([{ outlets: { dialog: ['coupan', 205] } }]);
  }
  addLesson() {
    this.toggleAddMenu();
    this.router.navigate([{ outlets: { dialog: ['addLesson', 205] } }]);
  }
  openWalletPopup(): void {
    this.router.navigate([{ outlets: { dialog: ['wallet'] } }]);
  }
  ToggleLang() {
    const currentLang = this._TranslateService.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.ChangeLang(newLang);
  }
}
