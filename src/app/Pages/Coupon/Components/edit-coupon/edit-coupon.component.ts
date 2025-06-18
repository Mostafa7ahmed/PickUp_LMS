import { IStudent } from './../../../Courses/Core/interface/istudent';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { CommonModule } from '@angular/common';
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
import { GetCouponService } from '../../Core/Service/get-coupon.service';
import { UpdateCouponService } from '../../Core/Service/update-coupon.service';
import { UpdateCouponPayload } from '../../Core/Interfaces/update-coupon-payload';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ICouponResult } from '../../Core/Interfaces/icoupon-result';

interface DiscountType {
  label: string;
  value: number;
}
@Component({
  selector: 'app-edit-coupon',
  standalone: true,
  imports: [TopPopComponent, TextHeaderComponent, ReactiveFormsModule, DatePicker, ReativeFormModule, Select, CommonModule, SplicTextPipe],
  templateUrl: './edit-coupon.component.html',
  styleUrl: './edit-coupon.component.scss'
})
export class EditCouponComponent {
 private _paginateCoursesService = inject(ListCourseService);
  private _listStudentsService = inject(ListStudentsService);
  private _createCoupnService = inject(CreateCoupnService);
  private _getCouponService = inject(GetCouponService);
  private _updateCouponService = inject(UpdateCouponService);
  private _FormBuilder = inject(FormBuilder);
  private router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private nzMessageService = inject(NzMessageService);

  paginationStudentsResponse: IPaginationResponse<IStudent> = {} as IPaginationResponse<IStudent>;
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  baseUrl: string = environment.baseUrlFiles;
  
  couponId: number | null = null;
  originalCoupon: ICouponResult | null = null;
  isLoading = false;

  discountTypes: DiscountType[] = [
    { label: 'Percentage', value: 1 },
    { label: 'Value', value: 0 }
  ];

  datetime24h: Date[] | undefined;
  datetime12h: Date = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
  discountType = 0;
  selectedDiscountType = 0;
  showDropdownCourse = false;
  isLoadCourse = false;
  isLoadStudents = false;
  showDropdownStudents = false;
  selectedCourse: ListCourse | null = null;
  selectedStudents: IStudent[] = [];

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
    console.log('Updated discountType:', this.formGroup.value.discountType);
  }

  ngOnInit(): void {
    // Get coupon ID from route parameters
    this._activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.couponId = parseInt(params['id']);
        this.loadCoupon();
      }
    });

    this.getCourse();
    this.getStudents();
  }

  loadCoupon(): void {
    if (!this.couponId) return;

    this.isLoading = true;
    console.log('📋 Loading coupon for editing:', this.couponId);

    this._getCouponService.getCourse(this.couponId).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.result) {
          this.originalCoupon = response.result;
          this.populateForm(response.result);
          console.log('✅ Coupon loaded for editing:', response.result);
        } else {
          console.error('❌ Failed to load coupon:', response.message);
          this.nzMessageService.error('Failed to load coupon: ' + response.message);
          this.closePopup();
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Error loading coupon:', error);
        this.nzMessageService.error('Error loading coupon. Please try again.');
        this.closePopup();
      }
    });
  }

  populateForm(coupon: ICouponResult): void {
    // Set form values
    this.formGroup.patchValue({
      courseId: coupon.course.id,
      code: coupon.code,
      active: coupon.active,
      limited: coupon.allowedUsage > 0,
      allowedUsage: coupon.allowedUsage,
      discount: coupon.discount,
      discountType: coupon.discountType,
      validFrom: new Date(coupon.validFrom),
      validTo: new Date(coupon.validTo),
      notes: coupon.notes
    });

    // Set discount type
    this.selectedDiscountType = coupon.discountType;
    this.isLimited = coupon.allowedUsage > 0;

    // Set selected course
    if (this.paginationCoursesResponse.result) {
      const course = this.paginationCoursesResponse.result.find(c => c.id === coupon.course.id);
      if (course) {
        this.selectedCourse = course;
      }
    }

    // Set selected students
    this.selectedStudents = coupon.students.map(student => ({
      studentId: student.id,
      userId: student.id,
      name: student.name,
      email: student.email,
      photoUrl: student.photo
    }));
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
    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;

      // If we have a loaded coupon, set the selected course
      if (this.originalCoupon) {
        const course = response.result.find(c => c.id === this.originalCoupon!.course.id);
        if (course) {
          this.selectedCourse = course;
        }
      }
    });
  }

  getStudents() {
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

  updateCoupon() {
    console.log('📝 Updating coupon:', this.couponResponse());

    if (!this.formGroup.valid) {
      console.log('Form is not valid!');
      this.nzMessageService.error('Please fill in all required fields.');
      return;
    }

    if (!this.selectedCourse) {
      console.error('Course is not selected!');
      this.nzMessageService.error('Please select a course.');
      return;
    }

    if (!this.couponId) {
      console.error('Coupon ID is missing!');
      this.nzMessageService.error('Coupon ID is missing.');
      return;
    }

    this.isLoading = true;
    const couponData = this.prepareUpdatePayload();
    console.log('Updating coupon with data:', couponData);

    this._updateCouponService.updateCoupon(couponData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          console.log('✅ Coupon updated successfully:', response);
          this.nzMessageService.success('Coupon updated successfully!');
          this.closePopup();
        } else {
          console.error('❌ Failed to update coupon:', response.message);
          this.nzMessageService.error('Failed to update coupon: ' + response.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Error updating coupon:', error);
        this.nzMessageService.error('Error updating coupon. Please try again.');
      }
    });
  }

  prepareUpdatePayload(): UpdateCouponPayload {
    const selectedStudentIds = this.selectedStudents.map(student => student.studentId);
    return {
      id: this.couponId!,
      code: this.formGroup.get('code')?.value,
      limited: this.isLimited,
      allowedUsage: this.isLimited ? this.formGroup.get('allowedUsage')?.value : 0,
      discount: this.formGroup.get('discount')?.value,
      discountType: this.formGroup.get('discountType')?.value,
      validFrom: this.formGroup.get('validFrom')?.value.toISOString(),
      validTo: this.formGroup.get('validTo')?.value.toISOString(),
      notes: this.formGroup.get('notes')?.value,
      studentIds: selectedStudentIds
    };
  }

  couponResponse() {
    const selectedStudentIds = this.selectedStudents.map(student => student.studentId);
    return {
      id: this.couponId,
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
