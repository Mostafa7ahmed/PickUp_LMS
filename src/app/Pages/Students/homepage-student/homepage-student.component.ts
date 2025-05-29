import { Component } from '@angular/core';
import { MyCoursesComponent } from "./components/my-courses/my-courses.component";
import { AssignmentsComponent } from "./components/assignments/assignments.component";
import { TodoComponent } from "./components/todo/todo.component";
import { ResourcesComponent } from "./components/resources/resources.component";

@Component({
  selector: 'app-homepage-student',
  standalone: true,
  imports: [MyCoursesComponent, AssignmentsComponent, TodoComponent, ResourcesComponent],
  templateUrl: './homepage-student.component.html',
  styleUrl: './homepage-student.component.scss'
})
export class HomepageStudentComponent {

}
