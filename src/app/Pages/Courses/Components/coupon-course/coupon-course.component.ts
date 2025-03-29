import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TextHeaderComponent } from "../text-header/text-header.component";
import { CommonModule } from '@angular/common';
import { PaginateCoursesService } from '../../Core/service/paginate-courses.service';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { CourseResult, ListCourse } from '../../Core/interface/icourses';
import { environment } from '../../../../Environments/environment';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { FormControl, FormGroup } from '@angular/forms';
import { ReativeFormModule } from '../../../../Core/Shared/Modules/reative-form/reative-form.module';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ListCourseService } from '../../Core/service/list-course.service';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-coupon-course',
  standalone: true,

  imports: [TopPopComponent, TextHeaderComponent ,DatePicker,ReativeFormModule,Select ,CommonModule , SplicTextPipe],
  templateUrl: './coupon-course.component.html',
  styleUrl: './coupon-course.component.scss'
})
export class CouponCourseComponent implements OnInit {
  showDropdown = false;
  isLoadCourse = false;
  selectedCourse: ListCourse | null = null; 

  private _paginateCoursesService = inject(ListCourseService);

  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  baseUrl: string = environment.baseUrlFiles;
  cities: City[] = [];

  formGroup!: FormGroup ;

  ngOnInit(): void {
    this.getCourse();
    this.cities = [
      { name: 'Percentage', code: 'NY' },
      { name: 'Value', code: 'RM' },

  ];


  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectCourse(course: ListCourse) {
    this.selectedCourse = course;
    this.showDropdown = false;
  }

  removeCourse() {
    this.selectedCourse = null;
    this.showDropdown = false;
  }
 

  getCourse(){
    
    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;
      const defaultCourse = this.paginationCoursesResponse.result.find((course) =>  course.id === 205);
      if (defaultCourse) {
        this.isLoadCourse = true;

        this.selectCourse(defaultCourse);
      }
    });
  }


}
