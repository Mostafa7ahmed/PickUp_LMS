import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-lesson',
  standalone: true,
  imports: [],
  templateUrl: './view-lesson.component.html',
  styleUrl: './view-lesson.component.scss'
})
export class ViewLessonComponent {
  constructor(private location: Location) {}

  goBackToCourse() {
    this.location.back();
  }
}
