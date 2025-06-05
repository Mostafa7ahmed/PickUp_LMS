import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IcourseStudent, IDicoverCourse } from '../../../my-course/core/interface/icourse-student';
import { CourseService } from '../../../my-course/core/service/course.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent implements OnInit {
  courses: IDicoverCourse[] = [];


  showInfoCoupon = false;
  constructor(private courseService: CourseService) {}
  ngOnInit(): void {
    this.courses = this.courseService.courses;
  }

}
