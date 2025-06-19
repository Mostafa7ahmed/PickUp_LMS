import { IStudent } from './../../../Courses/Core/interface/istudent';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { CommonModule, Location } from '@angular/common';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { environment } from '../../../../Environments/environment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private location= inject(Location);
  private nzMessageService = inject(NzMessageService);
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

  // Loading and validation states
  isCreatingCoupon = false;
  isFormSubmitted = false;
  isReloading = false;

  formGroup: FormGroup = this._FormBuilder.group({
    courseId: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required]),
    active: new FormControl(true, [Validators.required]),
    limited: new FormControl(false, [Validators.required]),
    allowedUsage: new FormControl(0, [Validators.required]),
    discount: new FormControl(0),
    discountType: new FormControl(0),
    validFrom: new FormControl(null, [Validators.required]),
    validTo: new FormControl(null, [Validators.required]),
    notes: new FormControl(''),
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
    this.formGroup.patchValue({ courseId: course.id });
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
  updateAllowedUsageBasedOnSelectedStudents() {
    const count = this.selectedStudents.length;
    this.formGroup.patchValue({
      allowedUsage: count,
      limited: count > 0
    });
  }
  isSelected(studentId: number): boolean {
    this.updateAllowedUsageBasedOnSelectedStudents();

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
  getCourse() {
    const routeCoupanId = +this._activatedRoute.snapshot.paramMap.get('CoupanId')!;
  
    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;
  
      const defaultCourse = this.paginationCoursesResponse.result.find(
        (course) => course.id === routeCoupanId
      );
  
      if (defaultCourse) {
        this.selectCourse(defaultCourse);
      } else {
        const fallbackCourse = this.paginationCoursesResponse.result.find(
          (course) => course.id === 205
        );
        if (fallbackCourse) {
          this.selectCourse(fallbackCourse);
        }
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
  isLimited = true;

onLimitedChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  this.isLimited = checked;

  if (!checked) {
    this.selectedStudents = [];
    this.formGroup.patchValue({
      allowedUsage: 0
    });
  }

  this.formGroup.patchValue({
    limited: checked
  });
}

createCoupon() {
  console.log(this.couponResponse());

  if (!this.formGroup.valid) {
    console.log('Form is not valid!');
    return;
  }

  if (!this.selectedCourse) {
    console.error('Course is not selected!');
    return;
  }

  const couponData = this.couponResponse();
  console.log(couponData);

  if (this.formGroup.valid) {
    this.isCreatingCoupon = true;
    this._createCoupnService.addCoupan(couponData).subscribe({
      next: (response) => {
        console.log('Coupon created successfully!', response);
        this.nzMessageService.success(response.message);
        this.isCreatingCoupon = false;
        this.location.back();
           },
      error: (error) => {
        console.error('Error creating coupon:', error);
        this.nzMessageService.error(error.error.message || 'Error creating coupon. Please try again.');
        this.isCreatingCoupon = false;
      }
    });
  }

}

reloadData() {
  this.isReloading = true;
  this.isLoadCourse = false;
  this.isLoadStudents = false;

  // Reset selections
  this.selectedCourse = null;
  this.selectedStudents = [];
  this.showDropdownCourse = false;
  this.showDropdownStudents = false;

  // Reset form course selection
  this.formGroup.patchValue({
    courseId: null,
    allowedUsage: 0,
    limited: false
  });

  // Reload courses and students
  this.getCourse();
  this.getStudents();

  // Set reload flag to false after a short delay to show loading state
  setTimeout(() => {
    this.isReloading = false;
  }, 500);
}

couponResponse() {
  const selectedStudentIds = this.selectedStudents.map(student => student.studentId);
  return {
    courseId: this.formGroup.get('courseId')?.value,
    code: this.formGroup.get('code')?.value,
    active: this.formGroup.get('active')?.value,
    limited: this.isLimited,
    allowedUsage: this.isLimited ? this.formGroup.get('allowedUsage')?.value : 0,
    discount: this.formGroup.get('discount')?.value,
    discountType: this.formGroup.get('discountType')?.value,
    validFrom: this.formGroup.get('validFrom')?.value,
    validTo: this.formGroup.get('validTo')?.value,
    notes: this.formGroup.get('notes')?.value,
    studentIds: selectedStudentIds
  };
}




}
