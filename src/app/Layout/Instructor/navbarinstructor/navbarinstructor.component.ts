import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';

@Component({
  selector: 'app-navbarinstructor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbarinstructor.component.html',
  styleUrl: './navbarinstructor.component.scss'
})
export class NavbarinstructorComponent {


  private _LoginService = inject(LoginService);
  dataUser:Decode = {} as Decode;


  logOut(){
    this._LoginService.SignOut()
  }

  ngOnInit() {

    this.dataUser = this._LoginService.saveUserAuth();
  }

  isAddMenuOpen = false;
  isAccountMenuOpen = false;

  constructor(private eRef: ElementRef) {}

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
}
