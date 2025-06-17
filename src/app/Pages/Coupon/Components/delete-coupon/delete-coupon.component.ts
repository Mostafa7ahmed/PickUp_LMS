import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-delete-coupon',
  standalone: true,
  imports: [TopPopComponent ,  CommonModule],
  templateUrl: './delete-coupon.component.html',
  styleUrl: './delete-coupon.component.scss'
})
export class DeleteCouponComponent {
  @Output() close = new EventEmitter<void>();
    @Input() deleteId!: number;
    @Output() delete = new EventEmitter<void>();

    isDeleting = false;

    deleteCoupon() {
      this.isDeleting = true;
      this.delete.emit();
    }


  closePopup() {
    this.close.emit();
  }
}
