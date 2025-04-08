import { Component } from '@angular/core';
import { TopPopComponent } from "../../../Components/top-pop/top-pop.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../../Core/Services/forgot-password.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';

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

        },
        error: err => {
          console.error('Error changing password:', err);
          this.nzMessageService.error(err.error.message || 'Error changing password. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }
}
