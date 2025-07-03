import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';
import { TranslationService } from '../../../Core/Services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'course' | 'assignment' | 'grade' | 'announcement';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}
import { Notification } from './core/interface/notification';
import { GetallnotifactionService } from './core/service/getallnotifaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-student',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule],
  templateUrl: './navbar-student.component.html',
  styleUrl: './navbar-student.component.scss'
})
export class NavbarStudentComponent {
openAddTaskPopup() {
throw new Error('Method not implemented.');
}

  
    private readonly _MytranslationService = inject(TranslationService);
    readonly _TranslateService = inject(TranslateService);
    private _LoginService = inject(LoginService);
    private _NzMessageService = inject(NzMessageService);
    private router = inject(Router);
  
    dataUser: Decode = {} as Decode;
  
    // Notification properties
    isNotificationsMenuOpen = false;
    notifications: Notification[] = [
      {
        id: 1,
        title: 'New Course Available',
        message: 'Check out the new Python for Data Science course now available in your catalog.',
        type: 'course',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        actionUrl: '/Student/discover'
      },
      {
        id: 2,
        title: 'Assignment Due Soon',
        message: 'Your React project assignment is due in 2 days. Don\'t forget to submit it!',
        type: 'assignment',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        actionUrl: '/Student/courses'
      },
      {
        id: 3,
        title: 'Grade Posted',
        message: 'Your grade for the JavaScript Quiz has been posted. Great job!',
        type: 'grade',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        actionUrl: '/Student/courses'
      },
      {
        id: 4,
        title: 'Course Update',
        message: 'New materials have been added to your Digital Marketing course.',
        type: 'info',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        actionUrl: '/Student/courses'
      },
      {
        id: 5,
        title: 'Welcome to PickUp LMS!',
        message: 'Welcome to our learning platform! Start exploring courses to begin your learning journey.',
        type: 'announcement',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        actionUrl: '/Student/discover'
      }
    ];

    get unreadNotificationsCount(): number {
      return this.notifications.filter(n => !n.isRead).length;
    }

    openPopup() {
      this.toggleAccountMenu();
      console.log('Opening ChangePasswordPopup...');
      this.router.navigate(['/Student', { outlets: { dialog: ['ChangePasswordPopup'] } }])
        .then(success => console.log('Navigation success:', success))
        .catch(err => console.error('Navigation error:', err));
    }
    
    routeProfile(): void {
      this.toggleAccountMenu();
      this.router.navigate(['/Student/profile']);
    }
  
    logOut() {
      this.translate.get('LogOut.LOGOUT_SUCCESS').subscribe((res: string) => {
        this._NzMessageService.success(res); 
      });
      this._LoginService.SignOut()
    }
  
    ngOnInit() {
      this.dataUser = this._LoginService.saveUserAuth();
    }
  
    isAddMenuOpen = false;
    isAccountMenuOpen = false;
  
    constructor(private eRef: ElementRef, private translate: TranslateService) { }
  
    toggleAddMenu() {
      this.isAddMenuOpen = !this.isAddMenuOpen;

  private readonly _MytranslationService = inject(TranslationService);
  readonly _TranslateService = inject(TranslateService);
  private _LoginService = inject(LoginService);
  private _NzMessageService = inject(NzMessageService);
  private _getallnotifactionService = inject(GetallnotifactionService);

  private router = inject(Router);

  dataUser: Decode = {} as Decode;

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
    this._LoginService.SignOut()
  }

  ngOnInit() {

    this.dataUser = this._LoginService.saveUserAuth();
    this.notifications = this._getallnotifactionService.notifications
  }

  isAddMenuOpen = false;
  isAccountMenuOpen = false;

  constructor(private eRef: ElementRef, private translate: TranslateService) { }


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
>>>>>>> 64669af2d189050710502789c0020a0a1285f09a
      this.isAccountMenuOpen = false;
      this.isNotificationsMenuOpen = false;
    }
<<<<<<< HEAD
  
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
      // Navigate to full notifications page (when component is created)
      // this.router.navigate(['/Student/notifications']);
      console.log('Full notifications page - component not yet created');
    }

    navigateToTodoAndAddTask(): void {
      // Navigate to todo page and trigger add task form
      this.router.navigate(['/Student/todo']).then(() => {
        // Use a small delay to ensure the component is loaded
        setTimeout(() => {
          // Dispatch a custom event to trigger add task form
          const event = new CustomEvent('openAddTaskForm');
          window.dispatchEvent(event);
        }, 100);
      });
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
        this.isNotificationsMenuOpen = false;
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
    
    // REMOVED INSTRUCTOR-ONLY FUNCTIONS:
    // - addTopic() 
    // - addCourse()
    // - addCoupan()
    // These functions are now only available to instructors
    
    ToggleLang() {
      const currentLang = this._TranslateService.currentLang;
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      this.ChangeLang(newLang);
    }
=======
  }
  ChangeLang(lang: string) {
    this.toggleAccountMenu();

    this.translate.get('Langaue.LANGUAGE_CHANGED').subscribe((res: string) => {
      this._NzMessageService.success(res);
    });

    this._MytranslationService.ChangeLang(lang);

    this.translate.use(lang);
  }
  openAddTaskPopup(): void {
    this.router.navigate(['/Student', { outlets: { dialog: ['taskTodoStudent'] } }]);
  }

  openWalletPopup(): void {
    this.router.navigate(['/Student', { outlets: { dialog: ['wallet'] } }]);
  }

  ToggleLang() {
    const currentLang = this._TranslateService.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.ChangeLang(newLang);
  }

>>>>>>> 64669af2d189050710502789c0020a0a1285f09a
}
