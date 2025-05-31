import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MyCoursesComponent } from "./components/my-courses/my-courses.component";
import { AssignmentsComponent } from "./components/assignments/assignments.component";
import { TodoComponent } from "./components/todo/todo.component";
import { ResourcesComponent } from "./components/resources/resources.component";
import { CourseCardComponent } from "./components/course-card/course-card.component";

@Component({
  selector: 'app-homepage-student',
  standalone: true,
  imports: [MyCoursesComponent, AssignmentsComponent, TodoComponent, ResourcesComponent, CourseCardComponent],
  templateUrl: './homepage-student.component.html',
  styleUrl: './homepage-student.component.scss'
})
export class HomepageStudentComponent {
  
  private router = inject(Router);

  // Demo method to test enrollment popup
  openEnrollmentDemo(): void {
    console.log('🎯 Attempting to open enrollment popup...');
    console.log('Current URL:', this.router.url);
    
    const navigationCommand = ['/Student', { outlets: { dialog: ['enrollCourse', '1'] } }];
    console.log('Navigation command:', navigationCommand);
    
    this.router.navigate(navigationCommand).then(success => {
      console.log('Navigation success:', success);
      console.log('New URL:', this.router.url);
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}
