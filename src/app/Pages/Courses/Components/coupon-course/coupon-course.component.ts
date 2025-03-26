import { Component } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TextHeaderComponent } from "../text-header/text-header.component";

@Component({
  selector: 'app-coupon-course',
  standalone: true,
  imports: [TopPopComponent, TextHeaderComponent],
  templateUrl: './coupon-course.component.html',
  styleUrl: './coupon-course.component.scss'
})
export class CouponCourseComponent {

}
