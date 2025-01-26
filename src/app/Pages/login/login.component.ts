import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Core/Services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Decode } from '../../Core/Interface/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule , NgClass],
  templateUrl: './login.component.html',
  styleUrls:[ './login.component.scss',"../../Core/Shared/CSS/input.scss"]
})
export class LoginComponent {
  passwordFieldType: boolean = true;
  private readonly _loginService = inject(LoginService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  userDecode = {} as Decode;

  MessageUseName:string =""
  isLoading: boolean = false;

      loginForm: FormGroup = this._FormBuilder.group(
    {
      emailOrPhoneNumber: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
    },
  );

  LoginSubmit(){
    this.isLoading = true;
    if (this.loginForm.valid) {
      this._loginService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          localStorage.setItem("UserAuth", res.result.jwt);
          localStorage.setItem("refreshToken", res.result.refreshToken);


          this._loginService.saveUserAuth();
          this.userDecode =this._loginService.saveUserAuth()!;
          console.log(this.userDecode.UserType)
          this._Router.navigate([`/home${this.userDecode.UserType}`])




          
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
