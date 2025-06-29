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

@Component({
  selector: 'app-discover-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, EnrollmentPopupComponent, SuccessPopupComponent],
  templateUrl: './discover-course-details.component.html',
  styleUrl: './discover-course-details.component.scss'
})
export class DiscoverCourseDetailsComponent implements OnInit, OnDestroy {
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


}
