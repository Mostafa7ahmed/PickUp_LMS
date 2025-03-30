import { Component, HostListener, inject, OnInit } from '@angular/core';
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
import { ListStudentsService } from '../../Core/service/list-students.service';
import { IStudent } from '../../Core/interface/istudent';

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
  showDropdownCourse = false;
  isLoadCourse = false;
  isLoadStudents = false;
  showDropdownStudents = false;

  selectedCourse: ListCourse | null = null; 
  selectedStudents: IStudent[] = [];

  private _paginateCoursesService = inject(ListCourseService); 
   private _listStudentsService = inject(ListStudentsService);


  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  paginationStudentsResponse: IPaginationResponse<IStudent> = {} as IPaginationResponse<IStudent>;

  baseUrl: string = environment.baseUrlFiles;
  cities: City[] = [];

  formGroup!: FormGroup ;

  ngOnInit(): void {
    this.getCourse();
    this.getStudents();
    this.cities = [
      { name: 'Percentage', code: 'NY' },
      { name: 'Value', code: 'RM' },

  ];


  }

  toggleDropdownCourse() {
    this.showDropdownCourse = !this.showDropdownCourse;
  }

  selectCourse(course: ListCourse) {
    this.selectedCourse = course;
    this.showDropdownCourse = false;
  }
  toggleDropdownStudents(event: Event) {
    event.stopPropagation(); // يمنع إغلاق القائمة عند الضغط عليها
    this.showDropdownStudents = !this.showDropdownStudents;
  }
  removeCourse() {
    this.selectedCourse = null;
    this.showDropdownCourse = false;
  }

  selectStudent(student: IStudent) {
    const exists = this.selectedStudents.some(s => s.studentId === student.studentId);
    if (!exists) {
      this.selectedStudents = [...this.selectedStudents, student]; // إضافة دون فقد البيانات السابقة
      console.log(this.selectedStudents);
    }
  }
  

  removeStudent(studentId: number, event: Event) {
    event.stopPropagation(); // لمنع تفعيل اختيار الطالب عند الضغط على X
    this.selectedStudents = this.selectedStudents.filter(s => s.studentId !== studentId);
  }
  isSelected(studentId: number): boolean {
    return this.selectedStudents.some(s => s.studentId === studentId);
  }
 
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdown = document.querySelector('.dropdown');
    const selectCard = document.querySelector('.selectcard');
    const studentItem = (event.target as HTMLElement).closest('.lead-item');
  
    if (
      (dropdown && dropdown.contains(event.target as Node)) ||
      (selectCard && selectCard.contains(event.target as Node)) ||
      studentItem
    ) {
      return;
    }
  
    this.showDropdownStudents = false;
    this.showDropdownCourse = false;
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

  
  getStudents(){
    
    this._listStudentsService.getStudents().subscribe((response) => {
      this.paginationStudentsResponse = response;
      this.isLoadStudents = true;

    });
  }



}
