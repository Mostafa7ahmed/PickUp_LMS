import { Component, Input } from '@angular/core';
import { IcourseStudent } from '../../core/interface/icourse-student';

@Component({
  selector: 'app-widgetcourse-student',
  standalone: true,
  imports: [],
  templateUrl: './widgetcourse-student.component.html',
  styleUrl: './widgetcourse-student.component.scss'
})
export class WidgetcourseStudentComponent {
  @Input() showInfo = false;
  @Input() courses: IcourseStudent[]  = [];
  @Input() completedCoursesCount = 0;
  @Input() inProgressCoursesCount = 0;
  @Input() averageProgress = 0;

}
