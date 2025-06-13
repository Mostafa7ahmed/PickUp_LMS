import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-short-answer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './short-answer.component.html',
  styleUrl: './short-answer.component.scss'
})
export class ShortAnswerComponent {
  @Input() formGroup!: FormGroup;
  @Input() questionIndex!: number;
  @Output() removeQuestion = new EventEmitter<number>();

  onRemove() {
    this.removeQuestion.emit(this.questionIndex);
  }
}
