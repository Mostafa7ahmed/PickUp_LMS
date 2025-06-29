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

  setTimeout(() => {
    this.isLoading = false;
  }, 3000);
}

}
