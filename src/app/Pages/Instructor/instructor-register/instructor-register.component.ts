// import { CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../../Core/Services/register.service';
import { NgClass } from '@angular/common';
import { CountryService } from '../../../Core/Services/country.service';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LanguageService } from '../../../Core/Services/language.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-instructor-register',
  standalone: true,
  imports: [NzStepsModule, RouterLink, ReactiveFormsModule, FormsModule, NgClass, NzSelectModule],
  templateUrl: './instructor-register.component.html',
  styleUrls: ['../../../Core/Shared/CSS/Stepper.scss', './instructor-register.component.scss', '../../../Core/Shared/CSS/input.scss'],

})
export class InstructorRegisterComponent implements OnInit {
  current = 0;
  stepone: boolean = true;
  passwordFieldType: boolean = true;
  repasswordFieldType: boolean = true;

  stepTwo: boolean = false;

  stepThree: boolean = false;

  private readonly _RegisterService = inject(RegisterService);
  private readonly _CountryService = inject(CountryService);
  private readonly _LanguageService = inject(LanguageService);
  private readonly _Router = inject(Router);



  private _FormBuilder = inject(FormBuilder);
  private Router = inject(Router)
  allCountry: any[] = [];
  allLangauge: any[] = [];

  loading = false;


  ngOnInit(): void {
    this.getAllCountry()
    this.getAllLanguage()
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
  async  nextFristPage() {

    const isPhoneValid = await this.validPhone("phoneNumber", 2);
    const isUserNameValid = await this.validUseName("userName", 0);
    const isEmailValid = await this.validEmail("email", 1);
  
    if (isPhoneValid && isUserNameValid && isEmailValid) {
      this.current += 1;
      this.changeContent();
    }

  }

  next(): void {

    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
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
  // preferredCountries: CountryISO[] = [CountryISO.Egypt, CountryISO.SaudiArabia, CountryISO.UnitedArabEmirates]; // الدول المفضلة
  // separateDialCode = true; 
  // SearchCountryField = SearchCountryField; 
  // CountryISO = CountryISO; 
  // PhoneNumberFormat = PhoneNumberFormat;
  id: string = "";
  inputId: string = "";

  registerFrom: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    phoneNumber: [null, [Validators.required]],
    type: 1,
    email: [null, [Validators.required, Validators.email]],
    preferredLanguge: [null, [Validators.required]],
    countryId: [null, [Validators.required]],
    languageId: [null, [Validators.required]],
    password: [null, [Validators.pattern(/^[A-Z][a-zA-Z0-9@#$%^&+=]{7,}$/), Validators.required]],
    confirmedPassword: [null],



  }, { validators: this.ConfirmPasswordCustom }
  )


  validUseName(value: string, Type: number): Promise<boolean> {
    const userName = this.registerFrom.get(value)?.value;
    this.showIconsUserName = false;
    if (this.registerFrom.get(value)?.valid) {
      return lastValueFrom(
        this._RegisterService.validateRegistration(Type, userName)
      )
        .then((res) => res.success)
        .catch(() => false);
    }
    return Promise.resolve(false);
  }
  validEmail(value: string, Type: number): Promise<boolean> {
    const userEmail = this.registerFrom.get(value)?.value;
    this.showIconsEmail = false;
    if (this.registerFrom.get(value)?.valid) {
      return lastValueFrom(
        this._RegisterService.validateRegistration(Type, userEmail)
      )
        .then((res) => res.success)
        .catch(() => false);
    }
    return Promise.resolve(false);
  }
  
  validPhone(value: string, Type: number): Promise<boolean> {
    const phoneNumber = this.registerFrom.get(value)?.value;
    this.showIconsPhone = false;
    if (this.registerFrom.get(value)?.valid) {
      return lastValueFrom(
        this._RegisterService.validateRegistration(Type, phoneNumber)
      )
        .then((res) => res.success)
        .catch((error) => {
          this.MessagePhone = error.error.message;
          return false;
        });
    }
    return Promise.resolve(false);
  }
  submitForm() {
    this.loading = true;

    if (this.registerFrom.valid) {
      const phoneNumberObject = this.registerFrom.get('phoneNumber')?.value;
      const countryId = +this.registerFrom.get('countryId')?.value;
      const preferredLanguge = +this.registerFrom.get('preferredLanguge')?.value;



      const updatedFormValue = {
        ...this.registerFrom.value,
        preferredLanguge: preferredLanguge,
        countryId: countryId
      };

      this._RegisterService.setRegiterForm(updatedFormValue).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          if (res.success) {
            this._Router.navigate(['/ConfirmEmail']);

          }

        },

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
        this.allCountry = res.result;

        console.log(res.result)
      }
    );
  }

  getAllLanguage() {
    this._LanguageService.getAllLanguage().subscribe({
      next: (res) => {
        console.log(res.result);
        this.allLangauge = res.result;

      }
    })
  }



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
