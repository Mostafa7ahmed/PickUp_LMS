import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DetailsDiscoverCourseService } from './Core/services/details-discover-course.service';
import { IResCourseDetailsDiscover } from './Core/Interface/ires-course-details-discover';
import { IResponseOf } from '../../../Core/Shared/Interface/irespose';
import { environment } from '../../../Environments/environment';
import { EnrollmentPopupComponent, ICourseForEnrollment } from '../../../Components/enrollment-popup/enrollment-popup.component';
import { SuccessPopupComponent, ISuccessData } from '../../../Components/success-popup/success-popup.component';
import { RatingComponent } from "../../rating/rating.component";
import { ReatingCardsComponent } from "./reating-cards/reating-cards.component";

@Component({
  selector: 'app-discover-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, EnrollmentPopupComponent, SuccessPopupComponent, RatingComponent, ReatingCardsComponent],
  templateUrl: './discover-course-details.component.html',
  styleUrl: './discover-course-details.component.scss'
})
export class DiscoverCourseDetailsComponent implements OnInit, OnDestroy {
  selectedTab: 'overview' | 'review' = 'overview';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private detailsService = inject(DetailsDiscoverCourseService);
  private destroy$ = new Subject<void>();
  courseId: number = 0;
  isLoading = true;
  showVideo = false;
  safeVideoUrl: SafeResourceUrl | null = null;
  activeTab = 'overview';
  courseDetailsdata: IResponseOf<IResCourseDetailsDiscover> = {} as IResponseOf<IResCourseDetailsDiscover>;
  baseUrl: string = environment.baseUrlFiles;
  showEnrollmentPopup = false;
  selectedCourseForEnrollment: ICourseForEnrollment | null = null;
  showSuccessPopup = false;
  successData: ISuccessData | null = null;

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    if (this.courseId) {
      this.loadCourseDetails();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCourseDetails(): void {
    this.detailsService.getStudentDetailsCourseDiscover(this.courseId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (api) => {
          this.courseDetailsdata = api;
          
          if (this.courseDetailsdata?.result.introductionVideo) {
            this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.courseDetailsdata.result.introductionVideo);
          }
          console.log(this.courseDetailsdata.result)
        },
        error: (err) => {
          console.error('Failed to load course details', err);
          this.isLoading = false;
        },
        complete: () => (this.isLoading = false),
      });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/Student/DiscoverCourses']);
  }

  // Method to open enrollment popup
  openEnrollmentPopup(): void {
    if (!this.courseDetailsdata?.result) return;

    const course = this.courseDetailsdata.result;
    this.selectedCourseForEnrollment = {
      id: course.id,
      name: course.name || `${course.instructor.name}'s Professional Course`,
      originalPrice: 149.99, // You can get this from API if available
      discountPrice: 89.99, // You can get this from API if available
      currency: 'USD',
      photo: course.photo ? this.baseUrl + course.photo : 'Images/Course/Image+Background.png',
      instructor: {
        name: course.instructor.name,
        photo: course.instructor.photo ? this.baseUrl + course.instructor.photo : undefined
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

  // Handle popup close
  onCloseEnrollmentPopup(): void {
    this.showEnrollmentPopup = false;
    this.selectedCourseForEnrollment = null;
  }

  // Display success popup
  private displaySuccessPopup(courseData?: any): void {
    const courseName = this.courseDetailsdata?.result?.name || `${this.courseDetailsdata?.result?.instructor?.name}'s Professional Course`;
    this.successData = {
      title: 'Enrollment Successful!',
      message: `You have successfully enrolled in "${courseName}". You can now access all course materials.`
    };
    this.showSuccessPopup = true;

    // Auto-close success popup after 3 seconds
    setTimeout(() => {
      this.closeSuccessPopup();
      this.router.navigate([{ outlets: { dialog: null } }]).then(() => {
        this.router.navigate(["Student/myCourse"]);
      });
    }, 3000);
    
  }

  // Close success popup
  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.successData = null;
  }

  // Alias for template compatibility
  onSuccessClose(): void {
    this.closeSuccessPopup();
  }

  // Play intro video method
  playIntroVideo(): void {
    this.showVideo = true;
  }

  // Utility methods
  getStars(rating: number): number[] {
    if (!rating) return [];
    return Array(Math.min(5, Math.floor(rating))).fill(0).map((_, i) => i + 1);
  }

  formatDuration(minutes: number): string {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  }
}
