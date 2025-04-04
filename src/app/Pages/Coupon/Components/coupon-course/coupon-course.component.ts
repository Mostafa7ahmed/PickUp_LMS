import { IStudent } from './../../../Courses/Core/interface/istudent';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { CommonModule } from '@angular/common';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { environment } from '../../../../Environments/environment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReativeFormModule } from '../../../../Core/Shared/Modules/reative-form/reative-form.module';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { TextHeaderComponent } from '../../../Courses/Components/text-header/text-header.component';
import { SplicTextPipe } from '../../../Courses/Core/Pipes/splic-text.pipe';
import { ListCourseService } from '../../../Courses/Core/service/list-course.service';
import { ListStudentsService } from '../../../Courses/Core/service/list-students.service';
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { CreateCoupnService } from '../../Core/Service/create-coupn.service';
import { ActivatedRoute, Router } from '@angular/router';

interface DiscountType {
  label: string;
  value: number;
}
@Component({
  selector: 'app-coupon-course',
  standalone: true,
  imports: [TopPopComponent, TextHeaderComponent,ReactiveFormsModule ,DatePicker,ReativeFormModule,Select ,CommonModule , SplicTextPipe],
  templateUrl: './coupon-course.component.html',
  styleUrl: './coupon-course.component.scss'
})
export class CouponCourseComponent implements OnInit {
 

  private _paginateCoursesService = inject(ListCourseService); 
  private _listStudentsService = inject(ListStudentsService);
  private _createCoupnService = inject(CreateCoupnService);
  paginationStudentsResponse: IPaginationResponse<IStudent> = {} as IPaginationResponse<IStudent>;
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  private _FormBuilder = inject(FormBuilder);
  private router = inject(Router);
  private _activatedRoute= inject(ActivatedRoute);

  baseUrl: string = environment.baseUrlFiles;
  discountTypes : DiscountType[] = [
    { label: 'Percentage', value: 1 },
    { label: 'Value', value: 0 }
  ]
    
 
  datetime24h: Date[] | undefined;
  datetime12h: Date = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); 
  discountType =0
  selectedDiscountType = 0;
  showDropdownCourse = false;
  isLoadCourse = false;
  isLoadStudents = false;
  showDropdownStudents = false;
  selectedCourse: ListCourse | null = null; 
  selectedStudents: IStudent[] = [];

  formGroup: FormGroup = this._FormBuilder.group({
    courseId: new FormControl(null),
    code: new FormControl(null),
    active: new FormControl(true),
    limited: new FormControl(false),
    allowedUsage: new FormControl(0),
    discount: new FormControl(0),
    discountType: new FormControl(0),
    validFrom: new FormControl(null),
    validTo: new FormControl(null),
    notes: new FormControl(null),
  });


updateDiscountType() {
  this.formGroup.patchValue({ discountType: this.selectedDiscountType });
  console.log('Updated discountType:', this.formGroup.value.discountType); // للتأكد أنه يعمل بشكل صحيح
}
  ngOnInit(): void {
    this.getCourse();
    this.getStudents();
    


  }

  toggleDropdownCourse() {
    this.showDropdownCourse = !this.showDropdownCourse;
  }

  selectCourse(course: ListCourse) {
    this.selectedCourse = course;
    this.showDropdownCourse = false;
  }
  toggleDropdownStudents(event: Event) {
    event.stopPropagation(); 
    this.showDropdownStudents = !this.showDropdownStudents;
  }
  removeCourse() {
    this.selectedCourse = null;
    this.showDropdownCourse = false;
  }

  selectStudent(student: IStudent) {
    const exists = this.selectedStudents.some(s => s.studentId === student.studentId);
    if (!exists) {
      this.selectedStudents = [...this.selectedStudents, student]; 
      console.log(this.selectedStudents);
    }
    
  }

  removeStudent(studentId: number, event: Event) {
    event.stopPropagation(); 
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
    event.stopPropagation(); 

  }
  getCourse(){
    const routeCoupanId = +this._activatedRoute.snapshot.paramMap.get('CoupanId')!;

    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;
      const defaultCourse = this.paginationCoursesResponse.result.find(
        (course) => course.id === routeCoupanId
      );
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
  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  createCoupon() {
    this.formGroup.get('discountType')?.valueChanges.subscribe(value => {
      console.log('Updated discountType:', value);
    });


    const formValue = this.formGroup.value;
    const selectedStudentIds = this.selectedStudents.map(student => student.studentId);
    const isLimited = selectedStudentIds.length > 1;
    this.formGroup.patchValue({ limited: isLimited });
    console.log(this.formGroup.value);
    console.log(isLimited);
    const couponData = {
      ...formValue,
      courseId: this.selectedCourse?.id,
      studentIds: selectedStudentIds
    };
    console.log(couponData);
    this._createCoupnService.addCoupan(couponData).subscribe((response) => {
      console.log(response);
      this.closePopup();
    });

   console.log(this.datetime12h)
  }




}
