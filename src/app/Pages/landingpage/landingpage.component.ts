import { Component } from '@angular/core';
import { HeroComponent } from "./Components/hero/hero.component";
import { HomeinstructorComponent } from "../Instructor/homeinstructor/homeinstructor.component";
import { FeatureForStudentComponent } from "./Components/feature-for-student/feature-for-student.component";
import { FeatureForInstructorComponent } from "./Components/feature-for-instructor/feature-for-instructor.component";
import { AllInstructorComponent } from "./Components/all-instructor/all-instructor.component";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [HeroComponent, HomeinstructorComponent, FeatureForStudentComponent, FeatureForInstructorComponent, AllInstructorComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

}
