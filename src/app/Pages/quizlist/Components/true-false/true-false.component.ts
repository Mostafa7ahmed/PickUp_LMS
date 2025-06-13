import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-true-false',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule, FormsModule],
  templateUrl: './true-false.component.html',
  styleUrl: './true-false.component.scss'
})
export class TrueFalseComponent {
  @Input() formGroup!: FormGroup;
  @Input() questionIndex!: number;
  @Output() removeQuestion = new EventEmitter<number>();

  onRemove() {
    this.removeQuestion.emit(this.questionIndex);
  }
}
