import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  showInfoCoupon = false;
  constructor(
    private courseService: DicoverCourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    console.log('CourseCardComponent initialized');
  }

  get courses(): IDicoverCourse[] {
    const courses = this.courseService.courses;
    console.log('CourseCardComponent getter called - courses length:', courses.length);
    if (courses.length > 0) {
      console.log('First course in getter:', courses[0]);
    }
    return courses;
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

  viewCourseDetails(courseId: number): void {
    this.router.navigate(['/Student/course-details', courseId]);
  }

  enrollCourse(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    // Try absolute navigation to dialog outlet
    this.router.navigate(['/Student', { outlets: { dialog: ['enroll-popup', courseId] } }]);
  }

  onImageError(event: any): void {
    console.log('Image failed to load:', event.target.src);
    event.target.src = '/Images/Course/Image+Background.png';
  }
}
