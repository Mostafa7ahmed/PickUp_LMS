import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Decode } from '../../../Core/Interface/user';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule , NgClass],
  templateUrl: './login.component.html',
  styleUrls:[ './login.component.scss',"../../../Core/Shared/CSS/input.scss"]
})
export class LoginComponent {
  passwordFieldType: boolean = true;
  private readonly _loginService = inject(LoginService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
 private userDecode = {} as Decode;
  constructor(private message: NzMessageService) {}

  MessageUseName:string =""
  isLoading: boolean = false;

      loginForm: FormGroup = this._FormBuilder.group(
    {
      emailOrPhoneNumber: [null, [Validators.email, Validators.required]],
      password: [null, [ Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$'), Validators.required]],
    },
  );

  LoginSubmit(){
    this.isLoading = true;

  if (this.loginForm.valid) {
    this._loginService.setLoginForm(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;

        // Save tokens
        localStorage.setItem("UserAuth", res.result.jwt);
        localStorage.setItem("refreshToken", res.result.refreshToken);

        // Decode and store user info
        this.userDecode = this._loginService.saveUserAuth();
        if (this.userDecode) {
          localStorage.setItem("roles", this.userDecode.roles);
          console.log("message: " + this.userDecode.UserType);

          // Success message
          this.message.success(res.message);

          // Redirect based on user type with consistent routing
          if (this.userDecode.roles === 'Instructor') {
            this._Router.navigate(['/Instructor/homeInstructor']);
          } else if (this.userDecode.roles === 'Student') {
            this._Router.navigate(['/Student/homeStudent']);
          } else {
            this._Router.navigate(['/landingpage']);
          }
        } else {
          this.message.error("User decode failed.");
        }
      },
        error: (err: HttpErrorResponse) => {
          this.MessageUseName =err.error.message;
          console.log(this.MessageUseName);
          this.isLoading = false;
        },
      });
  }

  }


  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control ? control.valid && (control.touched || control.dirty) : false;
  }


  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }
}
