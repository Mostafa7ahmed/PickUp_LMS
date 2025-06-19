import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';

@Component({
  selector: 'app-delete-lesson',
  standalone: true,
  imports: [TopPopComponent ,CommonModule ],
  templateUrl: './delete-lesson.component.html',
  styleUrl: '../../../quizlist/Components/delete-quiz/delete-quiz.component.scss'
})
export class DeleteLessonComponent {
 @Output() close = new EventEmitter<void>();
  @Input() deleteId!: number;
  @Input() LessonTitle!: string;
  @Output() delete = new EventEmitter<void>();

    @Output() isDeleting = false;

  deleteLesson() {
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
