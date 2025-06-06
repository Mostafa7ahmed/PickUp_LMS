import { Component, OnInit } from '@angular/core';
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
export class HomepageStudentComponent implements OnInit {
constructor(private phrasesService: PhrasesService) {}

    randomMessage = '';
  ngOnInit(): void {
    this.randomMessage = this.phrasesService.getRandomMessage();
  }

}
