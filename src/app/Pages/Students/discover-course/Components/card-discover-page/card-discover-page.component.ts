import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DicoverCourseService } from '../../service/dicover-course.service';
import { IPaginationResponse } from '../../../../../Core/Shared/Interface/irespose';
import { IDicoverCourse } from '../../intarface/idicover-course';
import { environment } from '../../../../../Environments/environment';
import { FilterCoursePipe } from './filter-course.pipe';
import { EnrollmentPopupComponent, ICourseForEnrollment } from '../../../../../Components/enrollment-popup/enrollment-popup.component';
import { SuccessPopupComponent } from '../../../../../Components/success-popup/success-popup.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-discover-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCoursePipe,
    EnrollmentPopupComponent,
    SuccessPopupComponent,
    TranslateModule
  ],
  templateUrl: './card-discover-page.component.html',
  styleUrl: './card-discover-page.component.scss'
})
export class CardDiscoverPageComponent implements OnInit {
  private translate = inject(TranslateService);
  private _DicoverCourseService = inject(DicoverCourseService);

  dataDiscover: IPaginationResponse<IDicoverCourse> = {} as IPaginationResponse<IDicoverCourse>;
  baseUrl = environment.baseUrlFiles;
  searchTerm: string = '';

  // Enrollment popup state
  showEnrollmentPopup = false;
  selectedCourseForEnrollment: ICourseForEnrollment | null = null;

  // Success popup state
  showSuccessPopup = false;
  successData: any = null;

  constructor() {
    // Ensure translations are available
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en', 'ar']);
  }

  ngOnInit(): void {
    // Load saved language preference
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.translate.use(savedLang);
    }
    this.loadCourses();
  }

  loadCourses() {
    this._DicoverCourseService.getDiscover().subscribe({
      next: (res: IPaginationResponse<IDicoverCourse>) => {
        this.dataDiscover = res;
      }
    });
  }

  formatNumber(num: number): string {
    return num.toFixed(2);
  }

  openEnrollmentPopup(course: IDicoverCourse): void {
    this.selectedCourseForEnrollment = {
      id: course.id,
      name: course.name,
      originalPrice: course.price,
      discountPrice: course.priceAfterDiscount,
      currency: 'USD',
      photo: course.photo,
      instructor: {
        name: course.instructor?.name || this.translate.instant('DiscoverCourses.unknownInstructor'),
        photo: course.instructor?.photo
      }
    };
    this.showEnrollmentPopup = true;
  }

  onEnrollmentComplete(event: { success: boolean, courseData?: any }): void {
    this.showEnrollmentPopup = false;
    if (event.success) {
      this.successData = {
        title: this.translate.instant('DiscoverCourses.enrollmentSuccess.title'),
        message: this.translate.instant('DiscoverCourses.enrollmentSuccess.message'),
        buttonText: this.translate.instant('DiscoverCourses.enrollmentSuccess.buttonText')
      };
      this.showSuccessPopup = true;
    }
  }

  onCloseEnrollmentPopup(): void {
    this.showEnrollmentPopup = false;
    this.selectedCourseForEnrollment = null;
  }

  onCloseSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.successData = null;
  }
}
