import { CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../Core/Services/register.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-instructor-register',
  standalone: true,
  imports: [NzStepsModule , RouterLink , NgxIntlTelInputModule ,ReactiveFormsModule,FormsModule , NgClass],
  templateUrl: './instructor-register.component.html',
  styleUrls:[  '../../Core/Shared/CSS/Stepper.scss' ,'./instructor-register.component.scss','../../Core/Shared/CSS/input.scss'],

})
export class InstructorRegisterComponent {
  current = 0;
  stepone:boolean =true;

  stepTwo:boolean =false;

  stepThree:boolean =false;

  private readonly _RegisterService = inject(RegisterService);
  private _FormBuilder = inject(FormBuilder);
  private Router  = inject(Router)





  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
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
        this.stepone=true;

        break;
      }
      case 1: {
        this.stepTwo= true;
        this.stepone=false;
    
        break;
      }
      case 2: {
        this.stepTwo= false;
        this.stepone=false;    
        this.stepThree=true  
        
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
  preferredCountries: CountryISO[] = [CountryISO.Egypt, CountryISO.SaudiArabia, CountryISO.UnitedArabEmirates]; // الدول المفضلة
  separateDialCode = true; 
  SearchCountryField = SearchCountryField; 
  CountryISO = CountryISO; 
  PhoneNumberFormat = PhoneNumberFormat;
  id: string ="";
  inputId: string="";

  registerFrom:FormGroup = this._FormBuilder.group({
    name:[null, [Validators.required  ,Validators.minLength(3),Validators.maxLength(20)]],
    userName:[null, [Validators.required]],
    phoneNumber:[null, [Validators.required]],
    type:1,
    email:[null, [Validators.required]],
    PreferredLanguge:[null, [Validators.required]],
    countryId:[null, [Validators.required]],
    languageId:[null, [Validators.required]],
    password:[null, [Validators.required]],
    confirmedPassword:[null],



    
  })

  
  submitForm() {
    const phoneNumber = this.registerFrom.get('phoneNumber')?.value.e164Number;
    console.log('Phone Number:', phoneNumber);
  }


  isFieldInvalid(fieldName: string): boolean {
    const control = this.registerFrom.get(fieldName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  // Check if a field is valid
  isFieldValid(fieldName: string): boolean {
    const control = this.registerFrom.get(fieldName);
    return control ? control.valid && (control.touched || control.dirty) : false;
  }
}
