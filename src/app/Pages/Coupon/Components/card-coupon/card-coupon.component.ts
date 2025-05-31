import { Component, inject, Input, OnInit } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { ICouponRespone } from '../../Core/Interfaces/icoupon-respone';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ListCouponService } from '../../Core/Service/list-coupon.service';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../../../Environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-coupon',
  standalone: true,
  imports: [Avatar, AvatarGroup , CommonModule , TooltipModule],
  templateUrl: './card-coupon.component.html',
  styleUrl: './card-coupon.component.scss'
})
export class CardCouponComponent implements OnInit {
  paginationCouponResponse: IPaginationResponse<ICouponRespone> = {} as IPaginationResponse<ICouponRespone>;
  constructor(private router: Router) {}

  private _PaginateCouponService = inject(ListCouponService);
  isLoading = false;
  @Input() courseId: number = 0;
 baseUrl =environment.baseUrlFiles

  getListCoupans(): void {

    this.isLoading = true;
    this._PaginateCouponService.getCoupon(this.courseId ).subscribe({
      next: (response) => {
        this.paginationCouponResponse = response;
        this.isLoading = false;
        console.log(this.paginationCouponResponse)


   
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.isLoading = false;
      }
    });
  }
  openDialog(couponId: number) { 
    this.router.navigate(['/Instructor', { outlets: { dialog: ['viewCoupon', couponId] } }]);
  }
  ngOnInit(): void {
    this.getListCoupans();
  }

  
}
