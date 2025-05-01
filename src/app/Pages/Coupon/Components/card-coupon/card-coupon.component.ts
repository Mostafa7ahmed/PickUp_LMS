import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
@Component({
  selector: 'app-card-coupon',
  standalone: true,
  imports: [Avatar, AvatarGroup],
  templateUrl: './card-coupon.component.html',
  styleUrl: './card-coupon.component.scss'
})
export class CardCouponComponent {

}
