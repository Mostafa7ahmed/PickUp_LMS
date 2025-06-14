import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';

@Component({
  selector: 'app-edit-quiz-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TopPopComponent],
  templateUrl: './edit-quiz-popup.component.html',
  styleUrls: ['./edit-quiz-popup.component.scss']
})
export class EditQuizPopupComponent implements OnInit {
  @Input() quiz: any; // Pass the quiz object to edit
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editQuizForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.editQuizForm = this.fb.group({
      name: [this.quiz?.name || '', Validators.required],
      description: [this.quiz?.description || '', Validators.required],
      duration: [this.quiz?.quizDuration?.duration || 0, [Validators.required, Validators.min(1)]],
      durationType: [this.quiz?.quizDuration?.type || 0, Validators.required]
    });
  }

  onSubmit() {
    if (this.editQuizForm.valid) {
      const updatedQuiz = {
        ...this.quiz,
        name: this.editQuizForm.value.name,
        description: this.editQuizForm.value.description,
        quizDuration: {
          duration: this.editQuizForm.value.duration,
          type: this.editQuizForm.value.durationType
        }
      };
      this.save.emit(updatedQuiz);
    }
  }

  onClose() {
    this.close.emit();
  }
}
