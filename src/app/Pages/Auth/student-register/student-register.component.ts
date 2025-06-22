import { validate } from '../../../Core/Interface/user';
// import { CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../../Core/Services/register.service';
import { CommonModule, NgClass } from '@angular/common';
import { CountryService } from '../../../Core/Services/country.service';
import { LanguageService } from '../../../Core/Services/language.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin, retry } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel";
import { CustomValidators } from '../../../Core/Shared/validators/custom-validators';
import { ValidationService } from '../../../Core/Services/validation.service';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [NzStepsModule, RouterLink, CommonModule, ReactiveFormsModule, FormsModule, SelectModule, NgClass, FloatLabel],
  templateUrl: './student-register.component.html',
  styleUrls: ['../../../Core/Shared/CSS/Stepper.scss', '../../Auth/instructor-register/instructor-register.component.scss','../../../Core/Shared/CSS/input.scss'],

})
export class StudentRegisterComponent {
  current = 0;
  stepone: boolean = true;
  passwordFieldType: boolean = true;
  repasswordFieldType: boolean = true;
  selectedCountry: string | undefined;
  selectedLanguage: string | undefined;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  private readonly _RegisterService = inject(RegisterService);
  private readonly _CountryService = inject(CountryService);
  private readonly _LanguageService = inject(LanguageService);
  private readonly _Router = inject(Router);
  private readonly _validationService = inject(ValidationService);

  private _FormBuilder = inject(FormBuilder);
  allCountry: any[] = [];

  loading = false;
  stepOneLoading = false;


  ngOnInit(): void {
    this.getAllCountry()
  }

  MessageUseName: string = '';
  MessageEmail: string = '';
  MessagePhone: string = '';
  showIconsUserName: boolean = true;
  showIconsEmail: boolean = true;
  showIconsPhone: boolean = true;


  pre(): void {
    this.current -= 1;
    this.changeContent();
  }
  nextFristPage() {
    this.current += 1;
    this.changeContent();
  }

  nextSoundingPage() {
    const countryId = "countryId";
    const preferredLanguge = "preferredLanguge";


    console.log(this.registerFrom.value)

    const countryIdValid= this.registerFrom.get(countryId)?.valid;
    const preferredLangugeValied = this.registerFrom.get(preferredLanguge)?.valid;
    if(countryIdValid && preferredLangugeValied) {
      this.current += 1;
      this.changeContent();  
    
    }
    else {
      this.stepOneLoading = false;
      const fields = [
        { key: "countryId", label: "Country", message: " is required." },
        { key: "preferredLanguge", label: "Preferred Language", message: "is required." }
      ];
    
      for (const field of fields) {
        const control = this.registerFrom.get(field.key);
        if (control && control.invalid) {
          this.message.error(`${field.label} is ${field.message}`);
          break; 
        }
      }
    }

  }
  next(): void {

    this.current += 1;
    this.changeContent();
  }


  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.stepone = true;

        break;
      }
      case 1: {
        this.stepTwo = true;
        this.stepone = false;

        break;
      }
      case 2: {
        this.stepTwo = false;
        this.stepone = false;
        this.stepThree = true

        break;
      }

    }
  }
  id: string = "";
  inputId: string = "";

  registerFrom: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, CustomValidators.name()]],
    userName: ['', [Validators.required, CustomValidators.username()]],
    phoneNumber: ['', [Validators.required, CustomValidators.phoneNumber()]],
    type: [2],
    email: ['', [Validators.required, CustomValidators.email()]],
    preferredLanguge: [null, [Validators.required]],
    countryId: [null, [Validators.required]],
    password: ['', [Validators.required, CustomValidators.strongPassword()]],
    confirmedPassword: ['', [Validators.required]],
  }, { 
    validators: [CustomValidators.confirmPassword('password', 'confirmedPassword')]
  })

  constructor(private message: NzMessageService) {}

  ensureFirstStepData() {
    const userNamekey = "userName";
    const emailKey = "email";
    const phoneNumberKey = "phoneNumber";
    const nameKey = "name";
    
    // Mark step 1 fields as touched to show validation errors
    [nameKey, userNamekey, emailKey, phoneNumberKey].forEach(field => {
      this.registerFrom.get(field)?.markAsTouched();
    });

    const userNameValue = this.registerFrom.get(userNamekey)?.value;
    const emailValue = this.registerFrom.get(emailKey)?.value;
    const phoneNumberValue = this.registerFrom.get(phoneNumberKey)?.value;
    const nameValue = this.registerFrom.get(nameKey)?.value;

    // Check if step 1 fields are valid
    const step1Fields = [nameKey, userNamekey, emailKey, phoneNumberKey];
    const step1Valid = step1Fields.every(field => this.registerFrom.get(field)?.valid);

    if (!step1Valid) {
      this.message.error("Please correct the errors in the form before proceeding.");
      return;
    }

    this.stepOneLoading = true;

    if (userNameValue && emailValue && phoneNumberValue && nameValue) {
      const phoneValidation$ = this._RegisterService.validateRegistration(2, phoneNumberValue);
      const userNameValidation$ = this._RegisterService.validateRegistration(0, userNameValue);
      const emailValidation$ = this._RegisterService.validateRegistration(1, emailValue);

      forkJoin({
        phone: phoneValidation$.pipe(retry(1)),      
        userName: userNameValidation$.pipe(retry(1)),
        email: emailValidation$.pipe(retry(1))
      }).subscribe({
        next: (res) => {
          this.stepOneLoading = false;
          console.log(res);
          this.nextFristPage();
        },
        error: (err) => {
          console.error("Error while ensuring first step data", err);
          if (err.error?.message) {
            this.message.error(err.error.message);
          } else {
            this.message.error("An error occurred while validating data.");
          }
          this.stepOneLoading = false;
        }
      });
    } else {
      this.stepOneLoading = false;
      const fields = [
        { key: "name", label: "Name", message: "is required and must be valid." },
        { key: "userName", label: "Username", message: "is required and must be valid." },
        { key: "email", label: "Email", message: "is required and must be valid." },
        { key: "phoneNumber", label: "Phone number", message: "Phone number must start with +20 and contain 10 digits after." }
      ];
    
      for (const field of fields) {
        const control = this.registerFrom.get(field.key);
        if (control && control.invalid) {
          this.message.error(`${field.label} is ${field.message}`);
          break; 
        }
      }
    }
  }

  submitForm() {
    this.loading = true;
  
    if (this.registerFrom.valid) {

  
      const updatedFormValue = {
        ...this.registerFrom.value,
 
      };
  
      this._RegisterService.setRegiterForm(updatedFormValue).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          if (res.success) {
            this.message.success(res.message);
            this._Router.navigate(['/login']);
          }
        },
        error: () => {
          this.loading = false;
          this.message.error('An error occurred while submitting form.');
        }
      });
    } else {
      this.loading = false;
      console.log('Form is invalid');
    }
  }


  isFieldInvalid(fieldName: string): boolean {
    return this._validationService.isFieldInvalid(this.registerFrom, fieldName);
  }

  isFieldValid(fieldName: string): boolean {
    return this._validationService.isFieldValid(this.registerFrom, fieldName);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.registerFrom.get(fieldName);
    return this._validationService.getErrorMessage(control, fieldName);
  }

  getFieldCssClass(fieldName: string): string {
    return this._validationService.getFieldCssClass(this.registerFrom, fieldName);
  }

  // Password strength helpers
  getPasswordStrength(): number {
    const passwordValue = this.registerFrom.get('password')?.value || '';
    return this._validationService.getPasswordStrength(passwordValue);
  }

  getPasswordStrengthText(): string {
    return this._validationService.getPasswordStrengthText(this.getPasswordStrength());
  }

  getPasswordStrengthColor(): string {
    return this._validationService.getPasswordStrengthColor(this.getPasswordStrength());
  }

  getCssClass(fieldName: string): string {
    const control = this.registerFrom.get(fieldName);
    const classes = ['custom'];

    if (!this.showIconsPhone && control?.invalid && control.touched) {
      classes.push('invalid');
    }

    if (this.showIconsPhone && control?.valid && (control.touched || control.dirty)) {
      classes.push('success');
    }

    return classes.join(' ');
  }


  getAllCountry() {
    this._CountryService.getAllCountry().subscribe(
      (res) => {
        if (res.result) {
          this.allCountry = res.result.map((country: any) => ({
            id: country.id,
            name: country.name,
            nationality: country.nationality,
            isoAlpha2Code: country.isoAlpha2Code,
            flag: country.flag
          }));
          console.log(this.allCountry);
        }
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  selectedpreferredLanguge: any;
  allpreferredLanguge = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Arabic' }
  ];



  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }
  toggleRePasswordVisibility() {
    this.repasswordFieldType = !this.repasswordFieldType;
  }



}
