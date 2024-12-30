import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';
@Component({
  selector: 'app-instructor-register',
  standalone: true,
  imports: [NzStepsModule , RouterLink],
  templateUrl: './instructor-register.component.html',
  styleUrls:[  '../../Core/Shared/CSS/Stepper.scss' ,'./instructor-register.component.scss',]
})
export class InstructorRegisterComponent {
  current = 0;
  stepone:boolean =true;

  stepTwo:boolean =false;

  stepThree:boolean =false;


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

}
