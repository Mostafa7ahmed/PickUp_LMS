import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';
import { TranslationService } from '../../../Core/Services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-navbarinstructor',
  standalone: true,
  imports: [RouterLink, TranslateModule],
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
    this.router.navigate(['/Instructor', { outlets: { dialog: ['coupon', 205] } }])
      .then(success => console.log('Navigation success:', success))
      .catch(err => console.error('Navigation error:', err));
  }

  ToggleLang() {
    const currentLang = this._TranslateService.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.ChangeLang(newLang);
  }
}
