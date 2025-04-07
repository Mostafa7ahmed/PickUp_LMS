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
import { FloatLabel } from "primeng/floatlabel"
import { SplicTextPipe } from '../../Courses/Core/Pipes/splic-text.pipe';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [NzStepsModule, SplicTextPipe, RouterLink, CommonModule, ReactiveFormsModule, FormsModule, SelectModule, NgClass, FloatLabel],
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
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    phoneNumber: [null, [Validators.required]],
    type: 2,
    email: [null, [Validators.required, Validators.email]],
    preferredLanguge: [null, [Validators.required]],
    countryId: [null, [Validators.required]],
    password: [null, [Validators.pattern(/^[A-Z][a-zA-Z0-9@#$%^&+=]{7,}$/), Validators.required]],
    confirmedPassword: [null],



  }, { validators: this.ConfirmPasswordCustom }
  )

  constructor(private message: NzMessageService) {}

  ensureFirstStepData() {
    const userNamekey = "userName";
    const emailKey = "email";
    const phoneNumberKey = "phoneNumber";
    const nameKey = "name";
    const userNameValue = this.registerFrom.get(userNamekey)?.value;
    const emailValue = this.registerFrom.get(emailKey)?.value;
    const phoneNumberValue = this.registerFrom.get(phoneNumberKey)?.value;
    const nameValue = this.registerFrom.get(nameKey)?.value;

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
          if (err.error.message) {
            this.message.error(err.error.message);
          } else {
            this.message.error("An error occurred while validating data.");
          }



          this.stepOneLoading = false;
        }
      });
    }
    else {
      this.stepOneLoading = false;
      const fields = [
        { key: "name", label: "Name", message: "Name must be at least 3 characters." },
        { key: "userName", label: "Username", message: "Username must be at least 6 characters." },
        { key: "email", label: "Email", message: "Email is invalid." },
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
            this._Router.navigate(['/ConfirmEmail']);
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
    const control = this.registerFrom.get(fieldName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.registerFrom.get(fieldName);
    return control ? control.valid && (control.touched || control.dirty) : false;
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


  ConfirmPasswordCustom(confirmPass: AbstractControl): any {
    if (
      confirmPass.get('password')?.value == confirmPass.get('confirmedPassword')?.value
    ) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }
  toggleRePasswordVisibility() {
    this.repasswordFieldType = !this.repasswordFieldType;
  }



}
