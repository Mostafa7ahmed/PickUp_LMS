import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IcourseStudent, IDicoverCourse } from '../../../my-course/core/interface/icourse-student';
import { CourseService } from '../../../my-course/core/service/course.service';
import { DicoverCourseService } from '../../../discover-course/service/dicover-course.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent implements OnInit {
  private router = inject(Router);

  courses: IDicoverCourse[] = [];
  showInfoCoupon = false;

  constructor(private courseService: DicoverCourseService) {}
  ngOnInit(): void {
    this.courses = this.courseService.courses;
  }
 getDiscountedPrice(course: IDicoverCourse): number {
    if (course.originalPrice && course.discount) {
      return course.originalPrice * (1 - course.discount / 100);
    }
    return course.price;
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  openEnrollmentPopup(courseId: number): void {
    this.router.navigate([{ outlets: { dialog: ['enrollCourse'] } }], {
      queryParams: { courseId: courseId }
    });
  }
}
