import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  
  // Password strength validator
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Don't validate empty values to allow optional controls
      }

      const value = control.value;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      const minLength = value.length >= 8;
      const maxLength = value.length <= 50;

      const errors: any = {};

      if (!minLength) {
        errors.minLength = { requiredLength: 8, actualLength: value.length };
      }
      if (!maxLength) {
        errors.maxLength = { requiredLength: 50, actualLength: value.length };
      }
      if (!hasUpperCase) {
        errors.requiresUppercase = true;
      }
      if (!hasLowerCase) {
        errors.requiresLowercase = true;
      }
      if (!hasNumeric) {
        errors.requiresDigit = true;
      }
      if (!hasSpecialChar) {
        errors.requiresSpecialChar = true;
      }

      return Object.keys(errors).length ? { strongPassword: errors } : null;
    };
  }

  // Confirm password validator
  static confirmPassword(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(passwordControlName);
      const confirmPasswordControl = formGroup.get(confirmPasswordControlName);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  // Email validator with more comprehensive checks
  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailPattern.test(control.value);

      return valid ? null : { email: { value: control.value } };
    };
  }

  // Phone number validator
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      // Allow international format with + and digits, or local format with digits only
      const phonePattern = /^(\+?[1-9]\d{1,14}|[0-9]{10,15})$/;
      const valid = phonePattern.test(control.value.replace(/[\s\-\(\)]/g, ''));

      return valid ? null : { phoneNumber: { value: control.value } };
    };
  }

  // Username validator
  static username(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value;
      const minLength = value.length >= 3;
      const maxLength = value.length <= 30;
      const validChars = /^[a-zA-Z0-9._-]+$/.test(value);
      const startsWithLetter = /^[a-zA-Z]/.test(value);

      const errors: any = {};

      if (!minLength) {
        errors.minLength = { requiredLength: 3, actualLength: value.length };
      }
      if (!maxLength) {
        errors.maxLength = { requiredLength: 30, actualLength: value.length };
      }
      if (!validChars) {
        errors.invalidChars = true;
      }
      if (!startsWithLetter) {
        errors.mustStartWithLetter = true;
      }

      return Object.keys(errors).length ? { username: errors } : null;
    };
  }

  // Name validator
  static name(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value.trim();
      const minLength = value.length >= 2;
      const maxLength = value.length <= 50;
      const validChars = /^[a-zA-Z\s\u0600-\u06FF]+$/.test(value); // Allow Arabic characters
      const noExtraSpaces = !/\s{2,}/.test(value);

      const errors: any = {};

      if (!minLength) {
        errors.minLength = { requiredLength: 2, actualLength: value.length };
      }
      if (!maxLength) {
        errors.maxLength = { requiredLength: 50, actualLength: value.length };
      }
      if (!validChars) {
        errors.invalidChars = true;
      }
      if (!noExtraSpaces) {
        errors.extraSpaces = true;
      }

      return Object.keys(errors).length ? { name: errors } : null;
    };
  }

  // Email or phone validator for login
  static emailOrPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phonePattern = /^(\+?[1-9]\d{1,14}|[0-9]{10,15})$/;
      
      const isEmail = emailPattern.test(control.value);
      const isPhone = phonePattern.test(control.value.replace(/[\s\-\(\)]/g, ''));

      return (isEmail || isPhone) ? null : { emailOrPhone: { value: control.value } };
    };
  }

  // Required field validator with custom message
  static requiredField(fieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value.toString().trim().length === 0) {
        return { required: { fieldName } };
      }
      return null;
    };
  }
} 