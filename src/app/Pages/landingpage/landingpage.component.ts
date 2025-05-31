import { Component } from '@angular/core';
import { HeroComponent } from "./Components/hero/hero.component";
import { HomeinstructorComponent } from "../Instructor/homeinstructor/homeinstructor.component";
import { FeatureForStudentComponent } from "./Components/feature-for-student/feature-for-student.component";
import { FeatureForInstructorComponent } from "./Components/feature-for-instructor/feature-for-instructor.component";
import { AllInstructorComponent } from "./Components/all-instructor/all-instructor.component";
import { AllcourseComponent } from "./Components/allcourse/allcourse.component";
import { WhyStudentsLoveComponent } from "./Components/why-students-love/why-students-love.component";
import { CtaFooterComponent } from "./Components/cta-footer/cta-footer.component";
import { NavlandingpageComponent } from "./Components/navlandingpage/navlandingpage.component";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [HeroComponent, FeatureForStudentComponent, FeatureForInstructorComponent, AllInstructorComponent, AllcourseComponent, WhyStudentsLoveComponent, CtaFooterComponent, NavlandingpageComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

}
