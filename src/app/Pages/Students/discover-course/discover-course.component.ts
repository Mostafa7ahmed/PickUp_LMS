import { Component, inject, OnInit } from '@angular/core';
import { CustomslectwithiconComponent } from "../../Courses/Components/customslectwithicon/customslectwithicon.component";
import { ItopicList } from '../../Topics/Core/Interface/itopic-list-result';
import { CourseCardComponent } from "../homepage-student/components/course-card/course-card.component";
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { IDicoverCourse } from './intarface/idicover-course';
import { DicoverCourseService } from './service/dicover-course.service';
import { CardDiscoverPageComponent } from "./Components/card-discover-page/card-discover-page.component";
import { EnrollmentPopupComponent, ICourseForEnrollment } from '../../../Components/enrollment-popup/enrollment-popup.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discover-course',
  standalone: true,
  imports: [
    CommonModule,
    CardDiscoverPageComponent,
    EnrollmentPopupComponent,
    TranslateModule
  ],
  templateUrl: './discover-course.component.html',
  styleUrl: './discover-course.component.scss'
})
export class DiscoverCourseComponent implements OnInit {

  // Enrollment popup state
  showEnrollmentPopup = false;
  selectedCourseForEnrollment: ICourseForEnrollment | null = null;

  constructor() {
 
  }

  ngOnInit() {
    // Load saved language preference
   
  }

  // Example method to show enrollment popup for a course
  openEnrollmentPopup(course: any): void {
    // Map your course data to the enrollment interface
    this.selectedCourseForEnrollment = {
      id: course.id,
      name: course.name || course.title,
      originalPrice: course.price || 0,
      discountPrice: course.discountPrice,
      currency: 'USD', // or get from course data
      photo: course.photo || course.image,
      instructor: {
        name: course.instructor?.name ,
        photo: course.instructor?.photo
      }
    };
    this.showEnrollmentPopup = true;
  }

  // Handle enrollment completion
  onEnrollmentComplete(success: boolean): void {
    if (success) {
      console.log('Enrollment successful!');
      // Handle successful enrollment (e.g., redirect, show success message, refresh data)
    }
  }

  // Handle popup close
  onCloseEnrollmentPopup(): void {
    this.showEnrollmentPopup = false;
    this.selectedCourseForEnrollment = null;
  }
}
