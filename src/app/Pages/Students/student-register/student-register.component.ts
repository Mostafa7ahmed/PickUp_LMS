import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { RegisterService } from '../../../Core/Services/register.service';
@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [NzStepsModule , RouterLink  ,ReactiveFormsModule,FormsModule  , NgClass , NzSelectModule],
  templateUrl: './student-register.component.html',
  styleUrls: ['../../../Core/Shared/CSS/Stepper.scss' ,'./student-register.component.scss']
})
export class StudentRegisterComponent {
  current = 0;
  stepone:boolean =true;
  passwordFieldType:boolean = true;
  repasswordFieldType:boolean = true;
  stepTwo:boolean =false;
  
  MessageUseName:string = '';
  MessageEmail:string = '';

  MessagePhone:string = '';
  allCountry: any[] = [];
  allLangauge: any[] = [];
  loading = false;
  showIconsUserName :boolean = true;
  showIconsEmail :boolean = true;
  showIconsPhone :boolean = true;


  stepThree:boolean =false;

    private readonly _RegisterService = inject(RegisterService);
    private readonly _Router = inject(Router);
  
    private _FormBuilder = inject(FormBuilder);

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


    id: string ="";
    inputId: string="";
  
    registerFrom:FormGroup = this._FormBuilder.group({
      name:[null, [Validators.required  ,Validators.minLength(3),Validators.maxLength(30)]],
      userName:[null, [Validators.required ,Validators.minLength(6),Validators.maxLength(30)]],
      phoneNumber:[null, [Validators.required]],
      type:2,
      email:[null, [Validators.required , Validators.email]],
      password:[null, [Validators.pattern(/^[A-Z][a-zA-Z0-9@#$%^&+=]{7,}$/), Validators.required]],
      confirmedPassword:[null],
  
  
      
    },    {validators : this.ConfirmPasswordCustom}
  )
  
  
  validUseName(value:string , Type:number){
    const userName = this.registerFrom.get(value)?.value;
    this.showIconsUserName = false
    if(this.registerFrom.get(value)?.valid){
      this._RegisterService.validateRegistration(Type ,userName).subscribe({
        next:(res)=>{
          this.showIconsUserName = res.success
          console.log(res)
        } ,
        error:(error)=>{
          this.MessageUseName = error.error.message;
        }
      })
    }
  }
  validEmail(value:string , Type:number){
    const userEmail = this.registerFrom.get(value)?.value;
    this.showIconsEmail = false
    if(this.registerFrom.get(value)?.valid){
      this._RegisterService.validateRegistration(Type ,userEmail).subscribe({
        next:(res)=>{
          this.showIconsEmail = res.success
          console.log(res)
        } ,
        error:(error)=>{
          this.MessageEmail = error.error.message;
        }
      })
    }
  }
  
  
  validPhone(value:string , Type:number){
    const userName = this.registerFrom.get(value)?.value;
    this.showIconsPhone = false;
    if(this.registerFrom.get(value)?.valid){
  
    this._RegisterService.validateRegistration(Type ,userName).subscribe({
      next:(res)=>{
        this.showIconsPhone = res.success
        console.log(res)
      } ,
      error:(error)=>{
        this.MessagePhone = error.error.message;
        console.log(error)
  
      }
    })
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
          if(res.success){
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
  
      if (  !this.showIconsPhone  &&  control?.invalid && control.touched ) {
        classes.push('invalid'); 
      }
  
      if (  this.showIconsPhone  && control?.valid && (control.touched || control.dirty)) {
        classes.push('success'); 
      }
  
      return classes.join(' '); 
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
