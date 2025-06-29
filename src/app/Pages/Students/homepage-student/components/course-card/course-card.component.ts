import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../my-course/core/service/course.service';
import { DicoverCourseService } from '../../../discover-course/service/dicover-course.service';
import { IDicoverCourse } from '../../../discover-course/intarface/idicover-course';
import { IPaginationResponse } from '../../../../../Core/Shared/Interface/irespose';
import { environment } from '../../../../../Environments/environment';
import { FormsModule } from '@angular/forms';
import { EnrollmentPopupComponent, ICourseForEnrollment } from '../../../../../Components/enrollment-popup/enrollment-popup.component';
import { SuccessPopupComponent, ISuccessData } from '../../../../../Components/success-popup/success-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, FormsModule, EnrollmentPopupComponent, SuccessPopupComponent],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent implements OnInit {

  baseUrl: string = environment.baseUrlFiles;
  
  dataDiscover: IPaginationResponse<IDicoverCourse> = {} as IPaginationResponse<IDicoverCourse>;
  private _DicoverCourseService = inject(DicoverCourseService);
  private _route = inject(Router);

  // Enrollment popup state
  showEnrollmentPopup = false;
  selectedCourseForEnrollment: ICourseForEnrollment | null = null;

  // Success popup state
  showSuccessPopup = false;
  successData: ISuccessData | null = null;

  ngOnInit(): void {
    this._DicoverCourseService.getDiscover().subscribe({
      next: (res) => {
        this.dataDiscover = res
      }
    })
  }

formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'k';
  }
  return num.toFixed(2);
}

  openEnrollmentPopup(course: IDicoverCourse): void {
    this.selectedCourseForEnrollment = {
      id: course.id,
      name: course.name,
      originalPrice: course.price || 0,
      discountPrice: course.priceAfterDiscount !== course.price ? course.priceAfterDiscount : undefined,
      currency: 'USD', // You might want to get this from course data or app config
      photo: course.photo ? this.baseUrl + course.photo : 'Images/Course/Image+Background.png',
      instructor: {
        name: course.instructor?.name || 'Unknown Instructor',
        photo: course.instructor?.photo ? this.baseUrl + course.instructor.photo : undefined
      }
    };
    this.showEnrollmentPopup = true;
  }

  // Handle enrollment completion
  onEnrollmentComplete(event: {success: boolean, courseData?: any}): void {
    if (event.success) {
      console.log('Enrollment successful!', event.courseData);
      this.displaySuccessPopup(event.courseData);
    }
  }

  // Show success popup after enrollment
  displaySuccessPopup(courseData: any): void {
    const details = [
      courseData.isFree 
        ? 'Free Course 🎁'
        : `Payment: ${courseData.price} ${courseData.currency} processed successfully`,
    ];

    this.successData = {
      title: 'Enrollment Successful',
      message: `Congratulations! You have successfully enrolled in ${courseData.name}`,
      details: details,
      autoClose: true,
      autoCloseDelay: 3000
    };

    this.showSuccessPopup = true;

    setTimeout(() => {
      this._route.navigate([{ outlets: { dialog: null } }]).then(() => {
        this._route.navigate(["Student/myCourse"]);
      });
    }, 3000);
  }

  // Handle popup close
  onCloseEnrollmentPopup(): void {
    this.showEnrollmentPopup = false;
    this.selectedCourseForEnrollment = null;
  }

  // Handle success popup close
  onCloseSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.successData = null;
  }
}
