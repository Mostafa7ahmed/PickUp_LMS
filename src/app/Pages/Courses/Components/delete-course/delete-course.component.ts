import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-course',
  standalone: true,
  imports: [TopPopComponent ,  CommonModule],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.scss'
})
export class DeleteCourseComponent {

  @Output() close = new EventEmitter<void>();
    @Input() deleteId!: number;
    @Output() delete = new EventEmitter<void>();

    isDeleting = false;

    deleteCourse() {
      this.isDeleting = true; // أول ما يدوس
      this.delete.emit();
    }


  closePopup() {
    this.close.emit();
  }
}
