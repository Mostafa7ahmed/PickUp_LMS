import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
  type: 'success' | 'info' | 'warning' | 'error' | 'course' | 'student' | 'assignment' | 'announcement';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

@Component({
  selector: 'app-navbarinstructor',
  standalone: true,
  imports: [RouterLink, TranslateModule, CommonModule],
  templateUrl: './navbarinstructor.component.html',
  styleUrl: './navbarinstructor.component.scss'
})
export class NavbarinstructorComponent {

  private readonly _MytranslationService = inject(TranslationService);
  readonly _TranslateService = inject(TranslateService);
  private _LoginService = inject(LoginService);
  private _NzMessageService = inject(NzMessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  dataUser: Decode = {} as Decode;

  // Notification properties
  isNotificationsMenuOpen = false;
  notifications: Notification[] = [
    {
      id: 1,
      title: 'New Student Enrolled',
      message: 'John Smith has enrolled in your React Development course.',
      type: 'student',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      actionUrl: '/Instructor/courses'
    },
    {
      id: 2,
      title: 'Assignment Submitted',
      message: 'Sarah Johnson submitted her final project for JavaScript course.',
      type: 'assignment',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      actionUrl: '/Instructor/courses'
    },
    {
      id: 3,
      title: 'Course Review Posted',
      message: 'Your Digital Marketing course received a new 5-star review!',
      type: 'success',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      actionUrl: '/Instructor/courses'
    },
    {
      id: 4,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM.',
      type: 'info',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    },
    {
      id: 5,
      title: 'Course Achievement',
      message: 'Congratulations! Your Python course reached 100 students milestone.',
      type: 'announcement',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      actionUrl: '/Instructor/courses'
    }
  ];

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  openPopup() {
    this.toggleAccountMenu();
    console.log('Opening ChangePasswordPopup...');
    this.router.navigate(['/Instructor', { outlets: { dialog: ['ChangePasswordPopup'] } }])
      .then(success => console.log('Navigation success:', success))
      .catch(err => console.error('Navigation error:', err));
  }
  
  routeProfile(): void {
    this.toggleAccountMenu();
    this.router.navigate(['/Instructor/myprofile']);
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

  constructor(private eRef: ElementRef ,    private translate: TranslateService) { }

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
    // this.router.navigate(['/Instructor/notifications']);
    console.log('Full notifications page - component not yet created');
  }

  navigateToTodoAndAddTask(): void {
    // Navigate to instructor todo page and trigger add task form
    this.router.navigate(['/Instructor/todo']).then(() => {
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
      'student': 'fa-solid fa-user-plus',
      'assignment': 'fa-solid fa-tasks',
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
  addTopic() { 
    this.toggleAddMenu(); 
    console.log('Opening AddTopic popup...');
    this.router.navigate(['/Instructor', { outlets: { dialog: ['addTopic'] } }])
      .then(success => console.log('Navigation success:', success))
      .catch(err => console.error('Navigation error:', err));
  }
  
  addCourse() { 
    this.toggleAddMenu(); 
    console.log('Opening AddCourse popup...');
    this.router.navigate(['/Instructor', { outlets: { dialog: ['addcourse'] } }])
      .then(success => console.log('Navigation success:', success))
      .catch(err => console.error('Navigation error:', err));
  }
  
  addCoupon() {
    this.toggleAddMenu(); 
    console.log('Opening Coupon popup...');
    this.router.navigate(['/Instructor', { outlets: { dialog: ['coupan', 205] } }])
      .then(success => console.log('Navigation success:', success))
      .catch(err => console.error('Navigation error:', err));
  }

  ToggleLang() {
    const currentLang = this._TranslateService.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.ChangeLang(newLang);
  }
}
