import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-multiple-choice',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.scss',
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
export class MultipleChoiceComponent {
  @Input() formGroup!: FormGroup;
  @Input() questionIndex!: number;
  @Output() removeQuestion = new EventEmitter<number>();

  showHint = false;

  get choices(): FormArray {
    return this.formGroup.get('multipleChoise') as FormArray;
  }

  onRemove() {
    this.removeQuestion.emit(this.questionIndex);
  }

  copyQuestion() {
    console.log('Copy question', this.questionIndex);
  }

  toggleHint() {
    this.showHint = !this.showHint;
  }

  onCorrectChange(index: number) {
    // Set all choices to false first
    this.choices.controls.forEach((choice, i) => {
      choice.get('correct')?.setValue(i === index);
    });
  }

  addChoice() {
    if (this.choices.length < 10) { // Maximum 10 choices
      this.choices.push(
        new FormGroup({
          answer: new FormControl(''),
          correct: new FormControl(false)
        })
      );
    }
  }

  removeChoice(index: number) {
    if (this.choices.length > 2) { // Keep at least 2 choices
      // If removing the correct choice, set first choice as correct
      const wasCorrect = this.choices.at(index).get('correct')?.value;
      this.choices.removeAt(index);

      if (wasCorrect && this.choices.length > 0) {
        this.choices.at(0).get('correct')?.setValue(true);
      }
    }
  }

  canRemoveChoice(): boolean {
    return this.choices.length > 2;
  }

  canAddChoice(): boolean {
    return this.choices.length < 10;
  }

  getChoicesCount(): string {
    return `${this.choices.length}/10`;
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    // Enter key to add new choice
    if (event.key === 'Enter' && event.ctrlKey && this.canAddChoice()) {
      event.preventDefault();
      this.addChoice();
    }

    // Delete key to remove current choice (if not the last input)
    if (event.key === 'Delete' && event.ctrlKey && this.canRemoveChoice()) {
      event.preventDefault();
      this.removeChoice(index);
    }
  }
}
