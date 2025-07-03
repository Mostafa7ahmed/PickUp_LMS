import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseLessonsComponent } from '../../Components/course-lessons/course-lessons.component';

@Component({
  selector: 'app-course-lessons-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseLessonsComponent],
  templateUrl: './course-lessons-demo.component.html',
  styleUrl: './course-lessons-demo.component.scss'
})
export class CourseLessonsDemoComponent {
  selectedCourseId: number = 1;
  showPagination: boolean = true;
  pageSize: number = 10;
  autoLoad: boolean = true;

  // Sample course IDs for testing
  sampleCourses = [
    { id: 1, name: 'Angular Fundamentals' },
    { id: 2, name: 'React Development' },
    { id: 3, name: 'Vue.js Basics' },
    { id: 4, name: 'Node.js Backend' },
    { id: 5, name: 'TypeScript Advanced' }
  ];

  onCourseChange(): void {
    // The course lessons component will automatically reload when courseId changes
    console.log('Selected course ID:', this.selectedCourseId);
  }
}
