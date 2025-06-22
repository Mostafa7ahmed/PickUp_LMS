import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { GetonecourseService } from '../../Courses/Core/service/getonecourse.service';
import { IResponseOf } from '../../../Core/Shared/Interface/irespose';
import { CourseResult } from '../../Courses/Core/interface/icourses';
import { LessonComponent } from '../../lesson/lesson.component';
import { AllQuizViewCourseComponent } from '../../quizlist/Components/all-quiz-view-course/all-quiz-view-course.component';
import { RatingComponent } from '../../rating/rating.component';
import { environment } from '../../../Environments/environment';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-course-view-student',
  standalone: true,
  imports: [
    CommonModule, 
    TabsModule, 
    ButtonModule, 
    LessonComponent, 
    AllQuizViewCourseComponent, 
    RatingComponent,
    ProgressBarModule,
    ChipModule,
    CardModule,
    DividerModule,
    TooltipModule
  ],
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _getCourseService = inject(GetonecourseService);
  private _router = inject(Router);
  private _messageService = inject(NzMessageService);

  courseId: number = 0;
  courseResponse: IResponseOf<CourseResult> | null = null;
  baseUrlFile = environment.baseUrlFiles;

  // Controls the selected tab
  activeTab: number = 0;

  // Student progress data (mock data - replace with real API)
  studentProgress = {
    overallProgress: 65,
    completedLessons: 8,
    totalLessons: 12,
    timeSpent: '14h 30m',
    lastAccessed: new Date('2024-03-15'),
    enrollmentDate: new Date('2024-02-01'),
    certificateEligible: false,
    currentGrade: 'B+',
    averageScore: 85
  };

  // Mock enrollment status
  isEnrolled: boolean = true;
  isCompleted: boolean = false;

  ngOnInit(): void {
    this.courseId = +this._activatedRoute.snapshot.paramMap.get('courseId')!;
    if (this.courseId) {
      this.loadCourseData();
    }
  }

  loadCourseData(): void {
    this._getCourseService.getCourse(this.courseId).subscribe({
      next: (res) => {
        if (res.success) {
          this.courseResponse = res;
          this.updateProgressData();
        } else {
          this._messageService.error('فشل في تحميل بيانات الكورس');
        }
      },
      error: (err) => {
        console.error('Failed to load course', err);
        this._messageService.error('حدث خطأ أثناء تحميل الكورس');
      }
    });
  }

  updateProgressData(): void {
    if (this.courseResponse?.result) {
      // Update progress based on lessons count
      this.studentProgress.totalLessons = this.courseResponse.result.lessonssCount || 12;
      this.studentProgress.certificateEligible = this.studentProgress.overallProgress >= 80;
      this.isCompleted = this.studentProgress.overallProgress === 100;
    }
  }

  getProgressColor(): string {
    const progress = this.studentProgress.overallProgress;
    if (progress < 30) return '#ef4444';
    if (progress < 70) return '#f59e0b';
    return '#10b981';
  }

  getGradeColor(): string {
    const grade = this.studentProgress.currentGrade;
    if (grade.includes('A')) return '#10b981';
    if (grade.includes('B')) return '#3b82f6';
    if (grade.includes('C')) return '#f59e0b';
    return '#ef4444';
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  downloadCertificate(): void {
    if (this.studentProgress.certificateEligible) {
      this._messageService.success('جاري تحميل الشهادة...');
      // Implement certificate download logic
    } else {
      this._messageService.warning('يجب إكمال 80% من الكورس على الأقل للحصول على الشهادة');
    }
  }

  continueLearning(): void {
    // Navigate to the next lesson or current lesson
    this._router.navigate(['/Student/course', this.courseId, 'lesson']);
  }

  goToDiscussion(): void {
    // Navigate to course discussion/chat
    this._messageService.info('ميزة المناقشات ستكون متاحة قريباً');
  }

  shareProgress(): void {
    if (navigator.share) {
      navigator.share({
        title: `تقدمي في كورس ${this.courseResponse?.result.name}`,
        text: `لقد أكملت ${this.studentProgress.overallProgress}% من الكورس!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      this._messageService.success('تم نسخ رابط الكورس');
    }
  }

  enrollInCourse(): void {
    if (!this.isEnrolled) {
      // Implement enrollment logic
      this._messageService.success('تم التسجيل في الكورس بنجاح');
      this.isEnrolled = true;
    }
  }
} 