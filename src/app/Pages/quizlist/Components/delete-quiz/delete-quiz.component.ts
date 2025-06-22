import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
@Component({
  selector: 'app-delete-quiz',
  standalone: true,
  imports: [TopPopComponent ,CommonModule ],
  templateUrl: './delete-quiz.component.html',
  styleUrl: './delete-quiz.component.scss'
})
export class DeleteQuizComponent {
 @Output() close = new EventEmitter<void>();
  @Input() deleteId!: number;
  @Input() QuizTitle!: string;
  @Output() delete = new EventEmitter<void>();

    @Output() isDeleting = false;

  deleteQuiz() {
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
