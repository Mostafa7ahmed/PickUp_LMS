import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls:[ './login.component.scss',"../../Core/Shared/CSS/input.scss"]
})
export class LoginComponent {
  passwordFieldType: boolean = true;



  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }
}
