import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TextHeaderComponent } from "../text-header/text-header.component";
import { CommonModule } from '@angular/common';
import { PaginateCoursesService } from '../../Core/service/paginate-courses.service';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { CourseResult } from '../../Core/interface/icourses';
import { environment } from '../../../../Environments/environment';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';

@Component({
  selector: 'app-coupon-course',
  standalone: true,
  imports: [TopPopComponent, TextHeaderComponent , CommonModule , SplicTextPipe],
  templateUrl: './coupon-course.component.html',
  styleUrl: './coupon-course.component.scss'
})
export class CouponCourseComponent implements OnInit {
  showDropdown = false;
  selectedCourse: CourseResult | null = null; 

  private _paginateCoursesService = inject(PaginateCoursesService);

  paginationCoursesResponse: IPaginationResponse<CourseResult> = {} as IPaginationResponse<CourseResult>;
  baseUrl: string = environment.baseUrlFiles;

  ngOnInit(): void {
    this._paginateCoursesService.getCourses(250, 1).subscribe((response) => {
      this.paginationCoursesResponse = response;
      const defaultCourse = this.paginationCoursesResponse.result.find((course) =>  course.id === 205);
      if (defaultCourse) {
        this.selectCourse(defaultCourse);
      }
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectCourse(course: CourseResult) {
    this.selectedCourse = course;
    this.showDropdown = false;
  }

  removeCourse() {
    this.selectedCourse = null;
    this.showDropdown = false;
  }


}
