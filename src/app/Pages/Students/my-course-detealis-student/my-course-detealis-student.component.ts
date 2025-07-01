import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../Environments/environment';
import { CommonModule, DatePipe } from '@angular/common';
import { CourseTab, ICourseDetailsStudent } from './Core/interface/icourse-details-student';
import { AddandShowRatingComponent } from "./Components/addand-show-rating/addand-show-rating.component";
import { CourseService } from '../my-course/core/service/course.service';

@Component({
  selector: 'app-my-course-detealis-student',
  standalone: true,
  imports: [CommonModule, DatePipe, AddandShowRatingComponent],
  templateUrl: './my-course-detealis-student.component.html',
  styleUrl: './my-course-detealis-student.component.scss'
})
export class MyCourseDetealisStudentComponent implements OnInit {
  selectedTab: CourseTab = CourseTab.Overview;
  CourseTab = CourseTab;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  
  courseId: number = 0;
  isLoading = true;
  showVideo = false;
  activeTab = 'overview';
  baseUrl: string = environment.baseUrlFiles;
  
  // API data
  courseDetails: ICourseDetailsStudent | null = null;
  
  // Legacy static data - will be replaced by API data
  lessons: string[] = [];
  quizzes: any[] = [];
  percentage: number = 0;

  generateRandomPercentage() {
    this.percentage = Math.floor(Math.random() * 101); 
  }

  getBackgroundColor(): string {
    if (this.percentage >= 90) return '#d5f9e3'; 
    if (this.percentage >= 70) return '#ffe4b3';
    return '#fcd2d2'; 
  }

  getTextColor(): string {
    if (this.percentage >= 90) return '#0ab95c'; 
    if (this.percentage >= 70) return '#ff9800'; 
    return '#f44336'; 
  }
  
  startQuiz(quizId: number, event: Event) {
    this.router.navigate(['Student',{ outlets: { dialog: ['quizPreview', quizId] } }], {
      queryParams: { mode: 'start' }
    });
    console.log(quizId)
  }

  viewLesson(lessonId: number): void {
    this.router.navigate(['/Student/viewLesson', lessonId]);
  }

  goBack(): void {
    this.router.navigate(['/Student/myCourse']);
  }

  private loadCourseDetails(): void {
    if (this.courseId) {
      this.courseService.getEnrolledCourseDetails(this.courseId).subscribe({
        next: (response) => {
          if (response.success) {
            this.courseDetails = response.result;
            // Update legacy data arrays for backward compatibility
            this.lessons = this.courseDetails.lessons.map(lesson => lesson.name);
            this.quizzes = this.courseDetails.quizzes.map(quiz => ({
              id: quiz.id,
              title: quiz.name,
              description: quiz.name,
              questions: quiz.questionsCount,
              duration: quiz.duration,
              attempts: quiz.attemps,
              topic: quiz.lessons.length > 0 ? quiz.lessons[0].name : 'General',
              date: new Date(quiz.createdOn).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              }),
              level: quiz.questionsCount > 10 ? 'Hard' : 'EASY'
            }));
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading course details:', error);
          this.isLoading = false;
          // Keep static data as fallback
          this.lessons = [
            'Introduction to Python',
            'Python Basics',
            'Control Flow',
            'Functions and Modules'
          ];
          this.quizzes = [
            {
              title: 'Course Quiz 101',
              description: 'Basics of programming',
              questions: 10,
              duration: 15,
              attempts: 3,
              topic: 'General Topic',
              date: 'Jun 25, 2025',
              level: 'EASY'
            }
          ];
        }
      });
    }
  }

  onRatingSubmitted(): void {
    // Refresh course details to show the new rating
    console.log('Rating submitted, refreshing course details...');
    this.loadCourseDetails();
  }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    this.generateRandomPercentage();
    this.loadCourseDetails();
  }
}
