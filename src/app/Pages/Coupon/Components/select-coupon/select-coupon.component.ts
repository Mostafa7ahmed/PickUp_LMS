import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { SplicTextPipe } from '../../../Courses/Core/Pipes/splic-text.pipe';
import { environment } from '../../../../Environments/environment';

@Component({
  selector: 'app-select-coupon',
  standalone: true,
  imports: [CommonModule,TooltipModule, SplicTextPipe],
  templateUrl: './select-coupon.component.html',
  styleUrl: './select-coupon.component.scss'
})
export class SelectCouponComponent {
  @Input() ListCourse: ListCourse[] = [];
  @Input() selectedItem: any | null = null;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() selectionChangeTopic = new EventEmitter<any>();
  baseUrl = environment.baseUrlFiles

  @Input() isSelected: boolean = false;
  @Input() disabled: boolean = false;

  @Input() isLoadTopic: boolean = false;

  isOpen = false;
  toggleDropdown() {
    this.isOpen = !this.isOpen;

  }
    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.isOpen = false;
      }
    }
    constructor(private eRef: ElementRef) {}
  

  selectOption(option: any) {
    this.selectedItem = option;
    this.selectionChange.emit(option);
    this.selectionChangeTopic.emit(option.id);

    this.isOpen = false;
    this.isSelected = true;
  }
}
