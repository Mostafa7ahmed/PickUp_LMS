import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-task-instructor',
  standalone: true,
  imports: [TopPopComponent, CommonModule],
  templateUrl: './delete-task-instructor.component.html',
  styleUrl: './delete-task-instructor.component.scss'
})
export class DeleteTaskInstructorComponent {

  @Output() close = new EventEmitter<void>();
  @Input() deleteId!: number;
  @Input() taskTitle!: string;
  @Output() delete = new EventEmitter<void>();

  isDeleting = false;

  deleteTask() {
    console.log('🗑️ DeleteTaskInstructorComponent: Delete button clicked for task ID:', this.deleteId);
    this.isDeleting = true;
    this.delete.emit();
  }

  closePopup() {
    this.isDeleting = false; // Reset loading state when closing
    this.close.emit();
  }
  
  resetLoadingState() {
    this.isDeleting = false;
  }
}
