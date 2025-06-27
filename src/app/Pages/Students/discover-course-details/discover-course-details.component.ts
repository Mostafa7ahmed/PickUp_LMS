import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsDiscoverCourseService } from './Core/services/details-discover-course.service';
import { IResCourseDetailsDiscover } from './Core/Interface/ires-course-details-discover';
import { IResponseOf } from '../../../Core/Shared/Interface/irespose';
import { environment } from '../../../Environments/environment';

@Component({
  selector: 'app-discover-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './discover-course-details.component.html',
  styleUrl: './discover-course-details.component.scss'
})
export class DiscoverCourseDetailsComponent  implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private detailsService = inject(DetailsDiscoverCourseService);
   courseId: number = 0;
     isLoading = true;
  showVideo = false;
  safeVideoUrl: SafeResourceUrl | null = null;
  activeTab = 'overview';
 courseDetailsdata : IResponseOf<IResCourseDetailsDiscover> = {} as IResponseOf<IResCourseDetailsDiscover>
  baseUrl:string=environment.baseUrlFiles

   ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
   
    console.log(this.courseId)
    if (this.courseId) {
      this.loadCourseDetails();
    }
  }

    loadCourseDetails(): void {
    this.detailsService.getStudentDetailsCourseDiscover(this.courseId).subscribe({
      next: (api) => {
           this.courseDetailsdata = api;
           

        if (this.courseDetailsdata?.result.introductionVideo) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.courseDetailsdata.result.introductionVideo);
        }
      },
      error: (err) => {
        console.error('Failed to load course details', err);
        this.isLoading = false;
        alert('تعذر تحميل تفاصيل الكورس. الرجاء المحاولة مرة أخرى لاحقًا.');
      },
      complete: () => (this.isLoading = false),
    });
  }
  toggleVideo(): void {
    this.showVideo = !this.showVideo;
  }
 setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}
