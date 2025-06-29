import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../Environments/environment';
import { CommonModule } from '@angular/common';
import { CourseTab } from './Core/interface/icourse-details-student';

@Component({
  selector: 'app-my-course-detealis-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-course-detealis-student.component.html',
  styleUrl: './my-course-detealis-student.component.scss'
})
export class MyCourseDetealisStudentComponent {
selectedTab: CourseTab = CourseTab.Overview;
CourseTab = CourseTab;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  courseId: number = 0;
  isLoading = true;
  showVideo = false;
  activeTab = 'overview';
  baseUrl: string = environment.baseUrlFiles;
  lessons: string[] = [
    'Introduction to Python',
    'Python Basics',
    'Control Flow',
    'Functions and Modules',
    'Functions and Modules',
     'Introduction to Python',
    'Python Basics',
    'Control Flow',
    'Functions and Modules',
    'Functions and Modules'
  ];
quizzes = [
  {
    title: 'Course Quiz 101',
    description: 'Basics of programming',
    questions: 10,
    duration: 15,
    attempts: 3,
    topic: 'C# Topic',
    date: 'Jun 25, 2025',
    level: 'EASY'
  },
  {
    title: 'Course Quiz 102',
    description: 'OOP Principles',
    questions: 8,
    duration: 20,
    attempts: 1,
    topic: 'Java Topic',
    date: 'Jun 26, 2025',
    level: 'Hard'
  },
  {
    title: 'Course Quiz 103',
    description: 'Control Structures',
    questions: 12,
    duration: 25,
    attempts: 2,
    topic: 'Python Topic',
    date: 'Jun 27, 2025',
    level: 'EASY'
  },
  {
    title: 'Course Quiz 104',
    description: 'Data Structures',
    questions: 15,
    duration: 30,
    attempts: 0,
    topic: 'C++ Topic',
    date: 'Jun 28, 2025',
    level: 'Hard'
  },
  {
    title: 'Course Quiz 105',
    description: 'Databases',
    questions: 9,
    duration: 18,
    attempts: 4,
    topic: 'SQL Topic',
    date: 'Jun 29, 2025',
    level: 'EASY'
  },
  {
    title: 'Course Quiz 106',
    description: 'Frontend Basics',
    questions: 7,
    duration: 10,
    attempts: 5,
    topic: 'HTML/CSS Topic',
    date: 'Jun 30, 2025',
    level: 'Hard'
  }
];
  percentage: number = 0;

  

  generateRandomPercentage() {
    this.percentage = Math.floor(Math.random() * 101); 
  }

  getBackgroundColor(): string {
    if (this.percentage >= 90) return '#d5f9e3'; // Green bg for 90-100
    if (this.percentage >= 80) return '#e0f7fa'; // Light blue for 80-89
    if (this.percentage >= 70) return '#ffe4b3'; // Yellow for 70-79
    if (this.percentage >= 60) return '#fff3cd'; // Light yellow for 60-69
    if (this.percentage >= 50) return '#ffe0e0'; // Light red for 50-59
    return '#fcd2d2'; // Deeper red for <50
  }

  getTextColor(): string {
    if (this.percentage >= 90) return '#0ab95c'; // Green text for 90-100
    if (this.percentage >= 80) return '#00bcd4'; // Blue text for 80-89
    if (this.percentage >= 70) return '#ff9800'; // Orange for 70-79
    if (this.percentage >= 60) return '#bfa100'; // Dark yellow for 60-69
    if (this.percentage >= 50) return '#e57373'; // Red for 50-59
    return '#f44336'; // Deep red for <50
  }
  startQuiz(quizId: number, event: Event) {
    this.router.navigate(['Student',{ outlets: { dialog: ['quizPreview', quizId] } }], {
      queryParams: { mode: 'start' }
    });
    console.log(quizId)
  }

  goBack(): void {
    this.router.navigate(['/Student/myCourse']);
  }

ngOnInit(): void {
  this.courseId = +this.route.snapshot.paramMap.get('id')!;
  if (this.courseId) {
  }
      this.generateRandomPercentage();


  setTimeout(() => {
    this.isLoading = false;
  }, 3000);
}

}
