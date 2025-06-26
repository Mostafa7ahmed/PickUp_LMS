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
import { FormsModule } from '@angular/forms';

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
    TooltipModule,
    FormsModule
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

  // Enhanced student progress data
  studentProgress = {
    overallProgress: 65,
    completedLessons: 8,
    totalLessons: 12,
    timeSpent: '14h 30m',
    lastAccessed: new Date('2024-03-15'),
    enrollmentDate: new Date('2024-02-01'),
    certificateEligible: false,
    currentGrade: 'B+',
    averageScore: 85,
    streak: 7,
    nextLessonId: 9,
    estimatedTimeToComplete: '3h 15m',
    achievements: ['First Lesson', 'Quick Learner', 'Perfect Score'],
    weeklyGoal: 5,
    weeklyCompleted: 3
  };

  // Mock enrollment status
  isEnrolled: boolean = true;
  isCompleted: boolean = false;
  isFavorited: boolean = false;
  showNotes: boolean = false;
  
  // Notes system
  studentNotes: string = '';
  savedNotes: Array<{id: number, content: string, timestamp: Date, lessonId?: number}> = [
    {id: 1, content: 'Important concept about React hooks', timestamp: new Date('2024-03-10'), lessonId: 3},
    {id: 2, content: 'Remember to practice this example', timestamp: new Date('2024-03-12'), lessonId: 5}
  ];

  ngOnInit(): void {
    this.courseId = +this._activatedRoute.snapshot.paramMap.get('courseId')!;
    if (this.courseId) {
      this.loadCourseData();
      this.loadStudentNotes();
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

  loadStudentNotes(): void {
    // Load student notes from API or localStorage
    const saved = localStorage.getItem(`course_notes_${this.courseId}`);
    if (saved) {
      this.studentNotes = saved;
    }
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
    if (this.studentProgress.nextLessonId) {
      this._router.navigate(['/Student/course', this.courseId, 'lesson', this.studentProgress.nextLessonId]);
    } else {
      this._router.navigate(['/Student/course', this.courseId, 'lesson']);
    }
  }

  goToDiscussion(): void {
    this._router.navigate(['/Student/chat'], { queryParams: { courseId: this.courseId } });
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

  // New enhanced methods
  toggleFavorite(): void {
    this.isFavorited = !this.isFavorited;
    this._messageService.success(this.isFavorited ? 'تم إضافة الكورس للمفضلة' : 'تم إزالة الكورس من المفضلة');
  }

  toggleNotes(): void {
    this.showNotes = !this.showNotes;
  }

  saveNotes(): void {
    if (this.studentNotes.trim()) {
      localStorage.setItem(`course_notes_${this.courseId}`, this.studentNotes);
      this.savedNotes.unshift({
        id: Date.now(),
        content: this.studentNotes,
        timestamp: new Date()
      });
      this.studentNotes = '';
      this._messageService.success('تم حفظ الملاحظة');
    }
  }

  deleteNote(noteId: number): void {
    this.savedNotes = this.savedNotes.filter(note => note.id !== noteId);
    this._messageService.success('تم حذف الملاحظة');
  }

  getProgressMessage(): string {
    const progress = this.studentProgress.overallProgress;
    if (progress === 0) return 'ابدأ رحلتك التعليمية الآن!';
    if (progress < 25) return 'بداية رائعة! استمر في التعلم';
    if (progress < 50) return 'تقدم ممتاز! أنت في منتصف الطريق';
    if (progress < 75) return 'أداء رائع! أوشكت على الانتهاء';
    if (progress < 100) return 'الخط الأخير! إنجز الكورس الآن';
    return 'تهانينا! لقد أكملت الكورس بنجاح';
  }

  getStreakMessage(): string {
    const streak = this.studentProgress.streak;
    if (streak === 0) return 'ابدأ مشوارك اليوم';
    if (streak < 3) return `${streak} أيام متتالية`;
    if (streak < 7) return `${streak} أيام رائعة!`;
    return `${streak} أيام متتالية - إنجاز مذهل!`;
  }

  resetProgress(): void {
    if (confirm('هل أنت متأكد من إعادة تعيين التقدم؟ سيتم فقدان جميع البيانات.')) {
      this.studentProgress.overallProgress = 0;
      this.studentProgress.completedLessons = 0;
      this.studentProgress.timeSpent = '0h 0m';
      this.studentProgress.currentGrade = 'N/A';
      this.studentProgress.averageScore = 0;
      this.studentProgress.streak = 0;
      this.isCompleted = false;
      this._messageService.success('تم إعادة تعيين التقدم');
    }
  }
} 