<<<<<<< HEAD
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 64669af2d189050710502789c0020a0a1285f09a
import { MyCoursesComponent } from "./components/my-courses/my-courses.component";
import { AssignmentsComponent } from "./components/assignments/assignments.component";
import { TodoComponent } from "./components/todo/todo.component";
import { ResourcesComponent } from "./components/resources/resources.component";
import { CourseCardComponent } from "./components/course-card/course-card.component";
import { DiscoverCardsComponent } from "./components/discover-cards/discover-cards.component";
import { PhrasesService } from './service/phrases.service';

@Component({
  selector: 'app-homepage-student',
  standalone: true,
  imports: [MyCoursesComponent, AssignmentsComponent, TodoComponent, ResourcesComponent, CourseCardComponent, DiscoverCardsComponent],
  templateUrl: './homepage-student.component.html',
  styleUrl: './homepage-student.component.scss'
})
<<<<<<< HEAD
export class HomepageStudentComponent {
  
  private router = inject(Router);
=======
export class HomepageStudentComponent implements OnInit {
constructor(private phrasesService: PhrasesService) {}

    randomMessage = '';
  ngOnInit(): void {
    this.randomMessage = this.phrasesService.getRandomMessage();
  }
>>>>>>> 64669af2d189050710502789c0020a0a1285f09a

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
