import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { TooltipModule } from 'primeng/tooltip';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from 'primeng/select';
import { GetCouponService } from '../../Core/Service/get-coupon.service';
import { IPaginationResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { ICouponResult } from '../../Core/Interfaces/icoupon-result';
import { IStudent } from '../../../Courses/Core/interface/istudent';
import { ListStudentsService } from '../../../Courses/Core/service/list-students.service';
import { environment } from '../../../../Environments/environment';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { CalendarModule } from 'primeng/calendar';

interface DiscountType {
  label: string;
  value: number;
}
@Component({
  selector: 'app-view-coupon',
  standalone: true,
  imports: [TopPopComponent,  DatePicker,CalendarModule,  ReactiveFormsModule,TextHeaderComponent, CommonModule, Avatar, AvatarGroup, Select, TooltipModule],
  templateUrl: './view-coupon.component.html',
  styleUrl: './view-coupon.component.scss'
})
export class ViewCouponComponent {
  isDropdownOpen = false;
  CouponId: number = 0
  private router = inject(Router)
  private _getCoupon = inject(GetCouponService);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _listStudentsService = inject(ListStudentsService);
  listStudents : IStudent[] = [];
  couponResultResponse: IResponseOf<ICouponResult> = {} as IResponseOf<ICouponResult>;
  paginationStudentsResponse: IPaginationResponse<IStudent> = {} as IPaginationResponse<IStudent>;
  baseUrl: string = environment.baseUrlFiles;
  private fb = inject(FormBuilder);


  couponForm = this.fb.group({
  id: this.fb.control(0, { nonNullable: true, validators: [Validators.required] }),
  code: ['', Validators.required],
  limited: [true],
  allowedUsage: [0, Validators.required],
  discount: [0, Validators.required],
  discountType: [0, Validators.required],
  validFrom: ['', Validators.required],
  validTo: ['', Validators.required],
  notes: [''],
  studentIds: this.fb.array([], Validators.required)
  });
 get studentIds(): FormArray<FormControl<number>> {
    return this.couponForm.get('studentIds') as FormArray<FormControl<number>>;
  }

  @HostListener('document:click', ['$event.target'])
  @ViewChild('dropdownWrapper') dropdownWrapper!: ElementRef;
  onClickOutside(targetElement: HTMLElement) {
    if (this.dropdownWrapper && !this.dropdownWrapper.nativeElement.contains(targetElement)) {
      this.isDropdownOpen = false;
    }
  }

  getStudents() {
    this._listStudentsService.getStudents().subscribe((response) => {
      this.paginationStudentsResponse = response;
    });
  }

  discountTypes: DiscountType[] = [
    { label: 'Percentage', value: 1 },
    { label: 'Value', value: 0 }
  ];

  getCouponDetails(CouponId: number) {
    this._getCoupon.getCourse(CouponId).subscribe({
      next: (res) => {
        this.couponResultResponse = res;
        const data = res.result;
          console.log('Data received:', data); // هذا سيساعدك على التأكد من أن البيانات تأتي بشكل صحيح

        if (data) {
         this.couponForm.patchValue({
         id: data.id ,
        code: data.code,
        limited: data.active, 
        allowedUsage: data.allowedUsage,
        discount: data.discount,
        discountType: data.discountType,
  validFrom: data.validFrom ? new Date(data.validFrom).toISOString().slice(0, 10) : null,
  validTo: data.validTo ? new Date(data.validTo).toISOString().slice(0, 10) : null,
        notes: data.notes
      });
console.log('validFrom:', data.validFrom);
console.log('validTo:', data.validTo);
      this.studentIds.clear();

      if (data.students && Array.isArray(data.students)) {
        data.students.forEach(student => {
          this.studentIds.push(new FormControl(student.id, { nonNullable: true }));
        });
      }
        }
      }
    });
  }

  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isSelected(studentId: number): boolean {
    return this.studentIds.value.includes(studentId);
  }

toggleStudent(studentId: number) {
  const index = this.studentIds.value.indexOf(studentId);
  if (index > -1) {
    this.studentIds.removeAt(index);
  } else {
    this.studentIds.push(new FormControl(studentId, { nonNullable: true }));
  }
}

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(params => {
      if (params['CoupanId'] && params['CoupanId'] !== '0') {
        this.CouponId = +params['CoupanId'];
        this.getCouponDetails(this.CouponId);
      }
    });

    this.getStudents();
  }
}
