import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-view-lesson',
  standalone: true,
  imports: [ButtonModule , TabsModule],
  templateUrl: './view-lesson.component.html',
  styleUrl: './view-lesson.component.scss'
})
export class ViewLessonComponent {
  constructor(private location: Location) {}
  value: number = 0;

  goBackToCourse() {
    this.location.back();
  }
}
