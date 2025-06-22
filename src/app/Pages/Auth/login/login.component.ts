import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Decode } from '../../../Core/Interface/user';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomValidators } from '../../../Core/Shared/validators/custom-validators';
import { ValidationService } from '../../../Core/Services/validation.service';

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
  private readonly _validationService = inject(ValidationService);
  private userDecode = {} as Decode;
  
  constructor(private message: NzMessageService) {}

  MessageUseName: string = "";
  isLoading: boolean = false;
  attemptedSubmit: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    emailOrPhoneNumber: [
      '', 
      [
        Validators.required,
        CustomValidators.emailOrPhone()
      ]
    ],
    password: [
      '', 
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]
    ],
  });

  LoginSubmit() {
    this.attemptedSubmit = true;
    this.MessageUseName = "";

    // Mark all fields as touched to show validation errors
    this._validationService.markAllFieldsAsTouched(this.loginForm);

    if (this.loginForm.valid) {
      this.isLoading = true;

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
            this.message.success(res.message || "Login successful!");

            // Redirect based on user type
            if (this.userDecode.roles === 'Instructor') {
              this._Router.navigate([`/home${this.userDecode.roles}`]);
            } else if (this.userDecode.roles === 'Student') {
              this._Router.navigate([`/${this.userDecode.roles}/home${this.userDecode.roles}`]);
            } else {
              this._Router.navigate(['/landingpage']);
            }
          } else {
            this.message.error("User decode failed.");
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          
          if (err.status === 401 || err.status === 400) {
            this.MessageUseName = "كلمة المرور او الايميل خاطئة";
            this.message.error("كلمة المرور او الايميل خاطئة");
          } else if (err.error?.message) {
            this.MessageUseName = err.error.message;
            this.message.error(err.error.message);
          } else if (err.status === 0) {
            this.MessageUseName = "خطأ في الاتصال. يرجى التحقق من الاتصال بالإنترنت.";
            this.message.error("خطأ في الاتصال. يرجى التحقق من الاتصال بالإنترنت.");
          } else {
            this.MessageUseName = "حدث خطأ. يرجى المحاولة مرة أخرى.";
            this.message.error("حدث خطأ. يرجى المحاولة مرة أخرى.");
          }
          
          console.error('Login error:', err);
        },
      });
    } else {
      // Show validation errors
      this.message.error("Please correct the errors in the form.");
    }
  }


  isFieldInvalid(fieldName: string): boolean {
    return this._validationService.isFieldInvalid(this.loginForm, fieldName);
  }

  isFieldValid(fieldName: string): boolean {
    return this._validationService.isFieldValid(this.loginForm, fieldName);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    return this._validationService.getErrorMessage(control, fieldName);
  }

  getFieldCssClass(fieldName: string): string {
    return this._validationService.getFieldCssClass(this.loginForm, fieldName);
  }


  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }
}
