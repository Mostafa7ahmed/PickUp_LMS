import { Component, ElementRef, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { ListCourse } from '../../Courses/Core/interface/icourses';
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { ListCourseService } from '../../Courses/Core/service/list-course.service';
import { SelectCouponComponent } from "../Components/select-coupon/select-coupon.component";
import { WidgetCoupanComponent } from '../Components/widget-coupan/widget-coupan.component';

@Component({
  selector: 'app-coupon-list',
  standalone: true,
  imports: [SelectCouponComponent ,WidgetCoupanComponent],
  templateUrl: './coupon-list.component.html',
  styleUrl: './coupon-list.component.scss'
})
export class CouponListComponent implements OnInit {
  listCourse: ListCourse[]  = [];
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  private _paginateCoursesService = inject(ListCourseService); 
  isLoadCourse = false;
  showInfoCoupon = false;
  selectedValue: ListCourse | undefined = {} as ListCourse; 

  toggShowInfo() {
    this.showInfoCoupon = !this.showInfoCoupon;
  }
  
  


  
  getCourse() {
    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.listCourse = response.result;
      this.isLoadCourse = true;

      this.selectedValue = this.paginationCoursesResponse.result.find(course => course.id === 205);
    });
  }
  
  ngOnInit(): void {
    this.getCourse();
    console.log( this.selectedValue)
    
  }
  

}
