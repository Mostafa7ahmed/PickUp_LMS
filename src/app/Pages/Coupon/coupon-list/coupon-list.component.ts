import { routes } from './../../../app.routes';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Component, ElementRef, EventEmitter, HostListener, inject, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ListCourse } from '../../Courses/Core/interface/icourses';
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { ListCourseService } from '../../Courses/Core/service/list-course.service';
import { SelectCouponComponent } from "../Components/select-coupon/select-coupon.component";
import { WidgetCoupanComponent } from '../Components/widget-coupan/widget-coupan.component';
import { ICouponRespone } from '../Core/Interfaces/icoupon-respone';
import { ListCouponService } from '../Core/Service/list-coupon.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TabsModule } from 'primeng/tabs';
import { TableCoupanComponent } from "../Components/table-coupan/table-coupan.component";
import { TranslateModule } from '@ngx-translate/core';
import { filter, Subscription, debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-coupon-list',
  standalone: true,
  
  imports: [SelectCouponComponent, WidgetCoupanComponent, CommonModule, RouterModule, ButtonModule,TranslateModule, FormsModule, DatePicker, TabsModule, MatTooltipModule, TableCoupanComponent],
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss',"../../Courses/courses/courses.component.scss"]
})
export class CouponListComponent implements OnInit, OnDestroy {
  listCourse: ListCourse[]  = [];
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  paginationCouponResponse: IPaginationResponse<ICouponRespone> = {} as IPaginationResponse<ICouponRespone>;

  private _paginateCoursesService = inject(ListCourseService); 
  private _PaginateCouponService = inject(ListCouponService);
  private routes = inject(Router);

  isLoadCourse = false;
  showInfoCoupon = false;
  isLoading = false;
  isOpen = false;
  valueheader: number = 0;
  valueTable: number = 0;
  selectedValue: ListCourse | null = {} as ListCourse;
  selectedCouponcId: number = 0;

  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  toggShowInfo() {
    this.showInfoCoupon = !this.showInfoCoupon;
  }
  getListCoupans(eventData: { pageNumber?: number; pageSize?: number }, courseId: number, from?: string, to?: string, search?: string): void {
    const { pageNumber = 1, pageSize = 5 } = eventData;

    this.isLoading = true;
    this._PaginateCouponService.getCoupon(courseId, pageNumber, pageSize, from, to, 2, 1, search).subscribe({
      next: (response) => {
        this.paginationCouponResponse = response;
        this.isLoading = false;
        console.log(this.paginationCouponResponse)
      },
      error: (error) => {
        console.error('Error fetching coupons:', error);
        this.isLoading = false;
      }
    });
  }
  
  selectOption(option: ListCourse): void {
    this.isOpen = false;
    console.log(option.id)
    this.selectedCouponcId = option.id;

    this.getListCoupans({}, option.id, undefined, undefined, this.searchTerm);
  }


  changeTab(value: number): void {
    this.valueheader = value;

  }
  changeInnerTab(value: number): void {
    this.valueTable = value;
    console.log(this.valueTable)



  }
  rangeDates: Date[] | null = null;
  convertDateRange() {
    if (this.rangeDates?.length === 2 && this.rangeDates[0] && this.rangeDates[1] && this.selectedValue) {
      const fromDate = this.formatDateToISO(this.rangeDates[0]);
      const toDate = this.formatDateToISO(this.rangeDates[1]);
      this.getListCoupans({}, this.selectedValue.id, fromDate, toDate, this.searchTerm);
    }
  }

  // Search functionality methods
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(this.searchTerm);
  }

  onSearchClear(): void {
    this.searchTerm = '';
    this.performSearch();
  }

  private performSearch(): void {
    if (this.selectedValue) {
      const fromDate = this.rangeDates?.length === 2 && this.rangeDates[0] ? this.formatDateToISO(this.rangeDates[0]) : undefined;
      const toDate = this.rangeDates?.length === 2 && this.rangeDates[1] ? this.formatDateToISO(this.rangeDates[1]) : undefined;
      this.getListCoupans({}, this.selectedValue.id, fromDate, toDate, this.searchTerm);
    }
  }
  openPopup() {
    this.routes.navigate([{ outlets: { dialog: ['coupan', this.selectedCouponcId] } }]);
  }
 
  clearDateRange() {
    this.rangeDates = null;
    if (this.selectedValue) {
      this.getListCoupans({}, this.selectedValue.id, undefined, undefined, this.searchTerm);
    }
  }
  formatDateToISO(date: Date | null): string {
    if (!date) return '';
    return date.toISOString();
  }

  
  getCourse() {
    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.listCourse = response.result;

      this.selectedValue = this.listCourse[this.listCourse.length - 1] || null;

      this.selectedCouponcId = this.selectedValue?.id as number;

      console.log('Selected Course:', this.selectedValue);
      this.getListCoupans({}, this.selectedValue?.id as number, undefined, undefined, this.searchTerm);
      this.isLoadCourse = true;
    });
  }
    private subscriptioncall = new Subscription();
  
  ngOnInit(): void {
    this.getCourse();

    // Set up search subscription with debouncing
    this.subscriptioncall.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
        this.performSearch();
      })
    );

    this.subscriptioncall.add(
      this.routes.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const currentUrl = event.urlAfterRedirects;

          if (event.url.includes('Couponslist') && !currentUrl.includes('(dialog:')) {
            this.getCourse()
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptioncall.unsubscribe();
  }
}
