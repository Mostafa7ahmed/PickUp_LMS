import { LoginService } from './../../../Core/Services/login.service';
import { Component, OnInit } from '@angular/core';
import { MyCoursesComponent } from "./components/my-courses/my-courses.component";
import { TodoComponent } from "./components/todo/todo.component";
import { CourseCardComponent } from "./components/course-card/course-card.component";
import { DiscoverCardsComponent } from "./components/discover-cards/discover-cards.component";
import { PhrasesService } from './service/phrases.service';
import { Decode } from '../../../Core/Interface/user';

@Component({
  selector: 'app-homepage-student',
  standalone: true,
  imports: [MyCoursesComponent, TodoComponent, DiscoverCardsComponent],
  templateUrl: './homepage-student.component.html',
  styleUrl: './homepage-student.component.scss'
})
export class HomepageStudentComponent implements OnInit {
constructor(private phrasesService: PhrasesService , private _LoginService: LoginService) {}
  dataUser: Decode = {} as Decode;

    randomMessage = '';
  ngOnInit(): void {
        this.dataUser = this._LoginService.saveUserAuth();

    this.randomMessage = this.phrasesService.getRandomMessage();

  }

}
