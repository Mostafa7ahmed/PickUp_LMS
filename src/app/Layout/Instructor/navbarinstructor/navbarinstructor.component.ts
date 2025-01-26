import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';

@Component({
  selector: 'app-navbarinstructor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbarinstructor.component.html',
  styleUrl: './navbarinstructor.component.scss'
})
export class NavbarinstructorComponent {


  private _LoginService = inject(LoginService);


  logOut(){
    this._LoginService.SignOut()
  }

}
