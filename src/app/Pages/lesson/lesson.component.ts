import { Component, Input, OnInit } from '@angular/core';
import { IPaginationResponse } from '../../Core/Shared/Interface/irespose';
import { ILessonList } from './Core/Interface/ilesson-list';
import { ListLessonService } from './Core/Services/list-lesson.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent implements OnInit {
  ListLessonData: IPaginationResponse<ILessonList> = {} as  IPaginationResponse<ILessonList>;
  @Input() courseId: number = 0;

  constructor(private _listLessonService: ListLessonService) {}


  ngOnInit(): void {
    this._listLessonService.getLessons(this.courseId).subscribe((res) => {
      this.ListLessonData = res;

    });
  }
}
