import { Component, inject } from '@angular/core';
import { environment } from '../../../../../Environments/environment';
import { IDicoverCourse } from '../../intarface/idicover-course';
import { IPaginationResponse } from '../../../../../Core/Shared/Interface/irespose';
import { DicoverCourseService } from '../../service/dicover-course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterCoursePipe } from './filter-course.pipe';
import { RouterLink } from '@angular/router';
import { EnrollmentPopupComponent, ICourseForEnrollment } from '../../../../../Components/enrollment-popup/enrollment-popup.component';

@Component({
  selector: 'app-card-discover-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterCoursePipe, RouterLink, EnrollmentPopupComponent],
  templateUrl: './card-discover-page.component.html',
  styleUrl: './card-discover-page.component.scss'
})
export class CardDiscoverPageComponent {
  baseUrl: string = environment.baseUrlFiles;

  dataDiscover: IPaginationResponse<IDicoverCourse> = {} as IPaginationResponse<IDicoverCourse>;
  searchTerm: string = '';
  private _DicoverCourseService = inject(DicoverCourseService);

  // Enrollment popup state
  showEnrollmentPopup = false;
  selectedCourseForEnrollment: ICourseForEnrollment | null = null;

  ngOnInit(): void {
    this._DicoverCourseService.getDiscover().subscribe({
      next: (res) => {
        this.dataDiscover = res
      }
    })
  }

  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  // Method to open enrollment popup
  openEnrollmentPopup(course: IDicoverCourse): void {
    // Map course data to enrollment interface
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
  onEnrollmentComplete(success: boolean): void {
    if (success) {
      console.log('Enrollment successful!');
      // You could emit an event to parent component or show a success message
    }
  }

  // Handle popup close
  onCloseEnrollmentPopup(): void {
    this.showEnrollmentPopup = false;
    this.selectedCourseForEnrollment = null;
  }
}
