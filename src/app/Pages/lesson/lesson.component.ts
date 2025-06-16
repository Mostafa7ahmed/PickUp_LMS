import { Component, Input, OnInit } from '@angular/core';
import { IPaginationResponse } from '../../Core/Shared/Interface/irespose';
import { ILessonList } from './Core/Interface/ilesson-list';
import { ListLessonService } from './Core/Services/list-lesson.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent implements OnInit {
  ListLessonData: IPaginationResponse<ILessonList> = {} as IPaginationResponse<ILessonList>;
  @Input() courseId: number = 0;

  constructor(private _listLessonService: ListLessonService) { }
  private subscriptioncall = new Subscription();
  private router = new Router();


  ngOnInit(): void {
    this.getAlllesson()

    this.subscriptioncall.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const currentUrl = event.urlAfterRedirects;

          if (event.url === `ViewCourse/${this.courseId}` && !currentUrl.includes('(dialog:')) {
            this.getAlllesson()

          }
        })
    );
  }
  getAlllesson() {
    this._listLessonService.getLessons(this.courseId).subscribe((res) => {
      this.ListLessonData = res;

    });
  }
}
