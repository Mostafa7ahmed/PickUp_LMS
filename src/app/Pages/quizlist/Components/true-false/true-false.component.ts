import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-true-false',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule, FormsModule],
  templateUrl: './true-false.component.html',
  styleUrl: './true-false.component.scss',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: '0', opacity: '0', overflow: 'hidden' }),
        animate('300ms ease-in-out', style({ height: '*', opacity: '1' }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('300ms ease-in-out', style({ height: '0', opacity: '0' }))
      ])
    ])
  ]
})
export class TrueFalseComponent {
  @Input() formGroup!: FormGroup;
  @Input() questionIndex!: number;
  @Output() removeQuestion = new EventEmitter<number>();

  showHint = false;

  onRemove() {
    this.removeQuestion.emit(this.questionIndex);
  }

  copyQuestion() {
    // Copy functionality
    console.log('Copy question', this.questionIndex);
  }

  toggleHint() {
    this.showHint = !this.showHint;
  }
}
