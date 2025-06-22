import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { environment } from '../../../../Environments/environment';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipModule } from 'primeng/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ICouponRespone } from '../../Core/Interfaces/icoupon-respone';
import { AvatarGroup } from 'primeng/avatargroup';
import { Avatar } from 'primeng/avatar';
import { DeleteCouponComponent } from "../delete-coupon/delete-coupon.component";
import { DeleteCouponService } from '../../Core/Service/delete-coupon.service';

@Component({
  selector: 'app-table-coupan',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatTooltipModule, DatePipe, TooltipModule, Avatar, AvatarGroup, DeleteCouponComponent],
  templateUrl: './table-coupan.component.html',
  styleUrls:[ './table-coupan.component.scss', '../../../Courses/Components/table-courses/table-courses.component.scss' , '../../../../../app/Core/Shared/CSS/horizontal-scrolling.scss'],
})
export class TableCoupanComponent {
  pageSize: number = 5; 
 baseUrl =environment.baseUrlFiles;
  isDeletePopupVisible = false;
  selectedDeleteId: number | null = null;
  showDeletePopup = false;
 private _deleteCouponService = inject(DeleteCouponService);

 constructor(private router: Router) {}

  @Input()paginationCouponResponse: IPaginationResponse<ICouponRespone>  = {} as IPaginationResponse<ICouponRespone> ;
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    scrollInterval: any;
    showLeftScroll = false;
    showRightScroll = true;
    @Output() getListCoupanEvent = new EventEmitter<{ pageNumber?: number; pageSize?: number }>();

    someMethodToEmitEvent(pageSize: number , pageNumber : number) {
      this.getListCoupanEvent.emit({
        pageNumber: pageNumber, 
        pageSize: pageSize
      });
    } 

  

    collapsePagination = false;

    toggPagination() {
      this.collapsePagination = !this.collapsePagination;
    }
    scrollTable(direction: 'left' | 'right') {
      const container = this.scrollContainer.nativeElement;
      const speed = 10;
      const step = 20;
    
      const isRTL = document.documentElement.dir === 'rtl'; // تحقق من اللغة
    
      this.scrollInterval = setInterval(() => {
        if (isRTL) {
          container.scrollLeft += direction === 'right' ? -step : step; // عكس الاتجاه عند RTL
        } else {
          container.scrollLeft += direction === 'right' ? step : -step; // الاتجاه التقليدي عند LTR
        }
    
        this.updateScrollButtons();
      }, speed);
    }
  
    //  hoime > persoemn > setting up
    stopScroll() {
      clearInterval(this.scrollInterval);
      this.updateScrollButtons();
    }
  
    updateScrollButtons() {
      const container = this.scrollContainer.nativeElement;
      this.showLeftScroll = container.scrollLeft > 0;
      this.showRightScroll = container.scrollLeft < container.scrollWidth - container.clientWidth;
    }

  
    @HostListener('window:resize')
    onResize() {
      this.updateScrollButtons();
    }
     isRTL() {
    return document.documentElement.dir === 'rtl';
  }


    getRemainingCourses(pageNumber:number , pageSize:number ){
      pageNumber = pageNumber + 1;
      this.someMethodToEmitEvent(pageSize , pageNumber)
    }
    getPrevCourses(pageNumber:number , pageSize:number ){
      pageNumber = pageNumber - 1;
      this.someMethodToEmitEvent(pageSize , pageNumber)
    }
    onPageSizeChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.pageSize = Number(target.value);
      this.someMethodToEmitEvent(this.pageSize, 1);
    }
    
  
    openDialog(couponId: number) { 
      this.router.navigate([{ outlets: { dialog: ['viewCoupon', couponId] } }]);
  
    }
   openEditPopup(couponId: number) {
      this.router.navigate([{ outlets: { dialog: ['editCoupon', couponId] } }]);
    }

    openDeletePopup(couponId: number) {
      this.isDeletePopupVisible = true;
      this.selectedDeleteId =couponId;
  
  
    }
    deleteCourse() {
      if (this.selectedDeleteId) {
        this._deleteCouponService.deleteCoupon(this.selectedDeleteId).subscribe(
          (response) => {
            this.isDeletePopupVisible = false;
            this.selectedDeleteId = null;
            this.getListCoupanEvent.emit({ pageNumber: 1, pageSize: this.pageSize });
            console.log(response)
          },
          (error) => {
            console.error('Error deleting coupon:', error);
          }
        )
      }
    }
    closeDeletePopup() {
      this.isDeletePopupVisible = false;
      this.selectedDeleteId = null;
    }
  
    ngOnDestroy() {
      clearInterval(this.scrollInterval);
    }
}
