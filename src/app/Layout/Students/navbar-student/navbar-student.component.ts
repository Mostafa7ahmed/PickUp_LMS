import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';
import { TranslationService } from '../../../Core/Services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-navbar-student',
  standalone: true,
  imports: [TranslateModule ,RouterLink ],
  templateUrl: './navbar-student.component.html',
  styleUrl: './navbar-student.component.scss'
})
export class NavbarStudentComponent {

  
    private readonly _MytranslationService = inject(TranslationService);
    readonly _TranslateService = inject(TranslateService);
    private _LoginService = inject(LoginService);
    private _NzMessageService = inject(NzMessageService);
    private router = inject(Router);
  
    dataUser: Decode = {} as Decode;
  
    openPopup() {
      this.toggleAccountMenu();
      console.log('Opening ChangePasswordPopup...');
      this.router.navigate(['/Student', { outlets: { dialog: ['ChangePasswordPopup'] } }])
        .then(success => console.log('Navigation success:', success))
        .catch(err => console.error('Navigation error:', err));
    }
    
    routeProfile(): void {
      this.toggleAccountMenu();
      // Navigate to student profile route (when component is created)
      // this.router.navigate(['/Student/profile']);
      console.log('Student profile navigation - component not yet created');
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
      this.isAccountMenuOpen = false;
    }
  
    toggleAccountMenu() {
      this.isAccountMenuOpen = !this.isAccountMenuOpen;
      this.isAddMenuOpen = false;
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
}
