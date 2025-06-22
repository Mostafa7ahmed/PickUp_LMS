import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // Get error message for a specific field
  getErrorMessage(control: AbstractControl | null, fieldName: string): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    // Arabic field names mapping
    const arabicFieldNames: { [key: string]: string } = {
      'name': 'اسم الكورس',
      'description': 'وصف الكورس',
      'price': 'سعر الكورس',
      'key': 'المفتاح',
      'value': 'القيمة',
      'topicId': 'الموضوع',
      'stageId': 'المرحلة'
    };

    const arabicFieldName = arabicFieldNames[fieldName] || fieldName;

    // Required field errors
    if (errors['required']) {
      return `${arabicFieldName} مطلوب`;
    }

    // Email errors
    if (errors['email']) {
      return 'Please enter a valid email address.';
    }

    // Email or phone errors
    if (errors['emailOrPhone']) {
      return 'Please enter a valid email address or phone number.';
    }

    // Phone number errors
    if (errors['phoneNumber']) {
      return 'Please enter a valid phone number.';
    }

    // Password strength errors
    if (errors['strongPassword']) {
      const passwordErrors = errors['strongPassword'];
      const messages: string[] = [];

      if (passwordErrors.minLength) {
        messages.push(`Password must be at least ${passwordErrors.minLength.requiredLength} characters long`);
      }
      if (passwordErrors.maxLength) {
        messages.push(`Password must not exceed ${passwordErrors.maxLength.requiredLength} characters`);
      }
      if (passwordErrors.requiresUppercase) {
        messages.push('Password must contain at least one uppercase letter');
      }
      if (passwordErrors.requiresLowercase) {
        messages.push('Password must contain at least one lowercase letter');
      }
      if (passwordErrors.requiresDigit) {
        messages.push('Password must contain at least one number');
      }
      if (passwordErrors.requiresSpecialChar) {
        messages.push('Password must contain at least one special character (!@#$%^&*)');
      }

      return messages.join('. ') + '.';
    }

    // Password mismatch errors
    if (errors['passwordMismatch']) {
      return 'Passwords do not match.';
    }

    // Username errors
    if (errors['username']) {
      const usernameErrors = errors['username'];
      const messages: string[] = [];

      if (usernameErrors.minLength) {
        messages.push(`Username must be at least ${usernameErrors.minLength.requiredLength} characters long`);
      }
      if (usernameErrors.maxLength) {
        messages.push(`Username must not exceed ${usernameErrors.maxLength.requiredLength} characters`);
      }
      if (usernameErrors.invalidChars) {
        messages.push('Username can only contain letters, numbers, dots, underscores, and hyphens');
      }
      if (usernameErrors.mustStartWithLetter) {
        messages.push('Username must start with a letter');
      }

      return messages.join('. ') + '.';
    }

    // Name errors
    if (errors['name']) {
      const nameErrors = errors['name'];
      const messages: string[] = [];

      if (nameErrors.minLength) {
        messages.push(`Name must be at least ${nameErrors.minLength.requiredLength} characters long`);
      }
      if (nameErrors.maxLength) {
        messages.push(`Name must not exceed ${nameErrors.maxLength.requiredLength} characters`);
      }
      if (nameErrors.invalidChars) {
        messages.push('Name can only contain letters and spaces');
      }
      if (nameErrors.extraSpaces) {
        messages.push('Name cannot contain multiple consecutive spaces');
      }

      return messages.join('. ') + '.';
    }

    // Min/Max length errors (fallback)
    if (errors['minlength']) {
      return `${arabicFieldName} يجب أن يكون ${errors['minlength'].requiredLength} أحرف على الأقل`;
    }

    if (errors['maxlength']) {
      return `${arabicFieldName} لا يمكن أن يتجاوز ${errors['maxlength'].requiredLength} حرف`;
    }

    // Min/Max value errors
    if (errors['min']) {
      return `${arabicFieldName} يجب أن يكون أكبر من أو يساوي ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `${arabicFieldName} يجب أن يكون أقل من أو يساوي ${errors['max'].max}`;
    }

    // Pattern errors (fallback)
    if (errors['pattern']) {
      return `صيغة ${arabicFieldName} غير صحيحة`;
    }

    return 'إدخال غير صالح';
  }

  // Check if field is invalid and should show error
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const control = form.get(fieldName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  // Check if field is valid and should show success
  isFieldValid(form: FormGroup, fieldName: string): boolean {
    const control = form.get(fieldName);
    return control ? control.valid && (control.touched || control.dirty) : false;
  }

  // Get CSS class for field validation state
  getFieldCssClass(form: FormGroup, fieldName: string): string {
    if (this.isFieldInvalid(form, fieldName)) {
      return 'invalid';
    }
    if (this.isFieldValid(form, fieldName)) {
      return 'success';
    }
    return '';
  }

  // Mark all fields as touched to trigger validation display
  markAllFieldsAsTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control) {
        control.markAsTouched();
        if (control instanceof FormGroup) {
          this.markAllFieldsAsTouched(control);
        }
      }
    });
  }

  // Get password strength score (0-5)
  getPasswordStrength(password: string): number {
    if (!password) return 0;

    let score = 0;
    
    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    
    // Character type checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return Math.min(score, 5);
  }

  // Get password strength text
  getPasswordStrengthText(score: number): string {
    switch (score) {
      case 0:
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return 'Very Weak';
    }
  }

  // Get password strength color
  getPasswordStrengthColor(score: number): string {
    switch (score) {
      case 0:
      case 1: return '#ff4757'; // Red
      case 2: return '#ff6b35'; // Orange
      case 3: return '#ffa502'; // Yellow
      case 4: return '#26de81'; // Light Green
      case 5: return '#2ed573'; // Green
      default: return '#ff4757';
    }
  }
} 