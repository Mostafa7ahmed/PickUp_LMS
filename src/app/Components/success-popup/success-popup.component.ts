import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPopComponent } from '../top-pop/top-pop.component';

export interface ISuccessData {
  title: string;
  message: string;
  details?: string[];
  autoClose?: boolean;
  autoCloseDelay?: number;
}

@Component({
  selector: 'app-success-popup',
  standalone: true,
  imports: [CommonModule, TopPopComponent],
  templateUrl: './success-popup.component.html',
  styleUrl: './success-popup.component.scss'
})
export class SuccessPopupComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() successData!: ISuccessData;
  @Output() onClose = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.successData?.autoClose !== false) {
      const delay = this.successData?.autoCloseDelay || 3000;
      setTimeout(() => {
        this.closePopup();
      }, delay);
    }
  }

  closePopup(): void {
    this.isVisible = false;
    this.onClose.emit();
  }
} 