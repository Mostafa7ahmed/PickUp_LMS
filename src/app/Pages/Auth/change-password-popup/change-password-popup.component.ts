import { Component, inject } from '@angular/core';
import { TopPopComponent } from "../../../Components/top-pop/top-pop.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../../Core/Services/forgot-password.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { LoginService } from '../../../Core/Services/login.service';

@Component({
  selector: 'app-change-password-popup',
  standalone: true,
  imports: [TopPopComponent , ReactiveFormsModule , CommonModule],
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss', "../../../Core/Shared/CSS/input.scss"],
})
export class ChangePasswordPopupComponent {

  changePasswordForm: FormGroup;
  isLoading = false;
  isDone = false;
  passwordFieldType: boolean = true;
  passwordFieldType2: boolean = true;
  passwordFieldType3: boolean = true;
  private readonly router = inject(Router);
  private _LoginService = inject(LoginService);

  constructor(private fb: FormBuilder, private userService: ForgotPasswordService , private nzMessageService: NzMessageService) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['',    [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$')
      ]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$')
        ]
      ],
      confirmedNewPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }
  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }
  togglePasswordVisibility2() {
    this.passwordFieldType2 = !this.passwordFieldType2;
  }
  togglePasswordVisibility3() {
    this.passwordFieldType3 = !this.passwordFieldType3;
  }
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmedNewPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onChangePassword() {
     console.log(this.changePasswordForm.value);
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      this.userService.changePassword(formData).subscribe({
        next: res => {
          console.log('Password changed successfully!', res);
          this.nzMessageService.success(res.message);
          this.isLoading = false;
          this._LoginService.SignOut();



        },
        error: err => {
          console.error('Error changing password:', err);
          this.nzMessageService.error(err.error.message || 'Error changing password. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }


  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }
}
