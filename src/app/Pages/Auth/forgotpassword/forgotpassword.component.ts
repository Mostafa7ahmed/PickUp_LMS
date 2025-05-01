import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../../../Core/Services/forgot-password.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],

  templateUrl: './forgotpassword.component.html',
  styleUrls:[ './forgotpassword.component.scss' , '../../../Core/Shared/CSS/input.scss']
})
export class ForgotpasswordComponent {
  currentStep = 1;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: ForgotPasswordService) {}

  sendForgetPassword() {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.forgetPassword(this.emailControl.value!).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.isLoading = false;
        this.currentStep = 2;
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred. Please try again.';
        this.isLoading = false;
      }
    });
  }

}
