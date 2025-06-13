import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { CommonModule } from '@angular/common';
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { environment } from '../../../../Environments/environment';
import { SplicTextPipe } from '../../../Courses/Core/Pipes/splic-text.pipe';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ListCourseService } from '../../../Courses/Core/service/list-course.service';
import { Select } from 'primeng/select';
import { FormArray, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrueFalseComponent } from "../true-false/true-false.component";
import { ShortAnswerComponent } from "../short-answer/short-answer.component";
import { MultipleChoiceComponent } from "../multiple-choice/multiple-choice.component";

@Component({
  selector: 'app-addquizlist',
  standalone: true,
  imports: [TopPopComponent, CommonModule, FormsModule, TextHeaderComponent, Select, SplicTextPipe, TrueFalseComponent, ShortAnswerComponent, MultipleChoiceComponent],
  templateUrl: './addquizlist.component.html',
  styleUrl: './addquizlist.component.scss'
})
export class AddquizlistComponent implements OnInit {
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  private router = inject(Router);
  showFirstPopup = false;
  showSecondPopup = false;
  private _paginateCoursesService = inject(ListCourseService);
value = 0;
changeValue(val: number) {
  this.value = val;
}

  selectedCourse: ListCourse | null = null;
  showDropdownCourse = false;
  selectedDiscountType: number = 1;
  baseUrl: string = environment.baseUrlFiles;
  isLoadCourse = false;
  discountTypes: any[] = [
    { label: 'Hours', value: 1 },
    { label: 'Minutes', value: 0 }
  ]

  toggleDropdownCourse() {
    this.showDropdownCourse = !this.showDropdownCourse;
  }
  removeCourse() {
    this.selectedCourse = null;
    this.showDropdownCourse = false;
  }
  selectCourse(course: ListCourse) {
    this.selectedCourse = course;
    this.showDropdownCourse = false;
  }
  getCourse() {

    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;
      console.log(response.result)




    });
  }
form = new FormGroup({
  trueFalseQuestions: new FormArray([]),
  shortAnswerQuestions: new FormArray([]),
  multipleChoiceQuestions: new FormArray([]),
})
get trueFalseQuestions(): FormArray {
  return this.form.get('trueFalseQuestions') as FormArray;
}

get shortAnswerQuestions(): FormArray {
  return this.form.get('shortAnswerQuestions') as FormArray;
}

get multipleChoiceQuestions(): FormArray {
  return this.form.get('multipleChoiceQuestions') as FormArray;
}

addTrueFalse() {
  this.trueFalseQuestions.push(
    new FormGroup({
      courseId: new FormControl(0),
      quizId: new FormControl(0),
      quizSectionId: new FormControl(0),
      order: new FormControl(this.trueFalseQuestions.length + 1),
      hint: new FormControl(''),
      text: new FormControl(''),
      trueAndFalse: new FormGroup({
        answer: new FormControl(true)
      })
    })
  );
}

addShortAnswer() {
  this.shortAnswerQuestions.push(
    new FormGroup({
      courseId: new FormControl(0),
      quizId: new FormControl(0),
      quizSectionId: new FormControl(0),
      order: new FormControl(this.shortAnswerQuestions.length + 1),
      hint: new FormControl(''),
      text: new FormControl(''),
      shortAnswer: new FormGroup({
        answer: new FormControl('')
      })
    })
  );
}

addMultipleChoice() {
  this.multipleChoiceQuestions.push(
    new FormGroup({
      courseId: new FormControl(0),
      quizId: new FormControl(0),
      quizSectionId: new FormControl(0),
      order: new FormControl(this.multipleChoiceQuestions.length + 1),
      hint: new FormControl(''),
      text: new FormControl(''),
      multipleChoise: new FormArray([
        new FormGroup({
          answer: new FormControl(''),
          correct: new FormControl(true) // First choice is correct by default
        }),
        new FormGroup({
          answer: new FormControl(''),
          correct: new FormControl(false)
        })
      ])
    })
  );
}
addQuestion() {
  if (this.value === 0) {
    this.addTrueFalse();
  } else if (this.value === 1) {
    this.addShortAnswer();
  } else if (this.value === 2) {
    this.addMultipleChoice();
  }
}

removeTrueFalseQuestion(index: number) {
  this.trueFalseQuestions.removeAt(index);
}

removeShortAnswerQuestion(index: number) {
  this.shortAnswerQuestions.removeAt(index);
}

removeMultipleChoiceQuestion(index: number) {
  this.multipleChoiceQuestions.removeAt(index);
}
  nextPopup() {
    this.showFirstPopup = false;
    setTimeout(() => {
      this.showSecondPopup = true;
    }, 300); // مدة الأنيميشن
  }

  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  ngOnInit(): void {
    this.getCourse();
  }

  // Get current tab name for display
  getCurrentTabName(): string {
    switch(this.value) {
      case 0: return 'True/False';
      case 1: return 'Short Answer';
      case 2: return 'Multiple Choice';
      default: return 'Questions';
    }
  }

  // Get current questions count
  getCurrentQuestionsCount(): number {
    switch(this.value) {
      case 0: return this.trueFalseQuestions.length;
      case 1: return this.shortAnswerQuestions.length;
      case 2: return this.multipleChoiceQuestions.length;
      default: return 0;
    }
  }

  // Method to prepare data for backend
  prepareQuestionData() {
    const questions: any[] = [];

    // Add True/False questions
    this.trueFalseQuestions.controls.forEach((question, index) => {
      const questionData = question.value;
      if (questionData.text && questionData.text.trim()) {
        questions.push({
          courseId: this.selectedCourse?.id || 0,
          quizId: 0,
          quizSectionId: 0,
          order: index + 1,
          hint: questionData.hint || '',
          text: questionData.text,
          trueAndFalse: {
            answer: questionData.trueAndFalse.answer
          }
        });
      }
    });

    // Add Short Answer questions
    this.shortAnswerQuestions.controls.forEach((question, index) => {
      const questionData = question.value;
      if (questionData.text && questionData.text.trim()) {
        questions.push({
          courseId: this.selectedCourse?.id || 0,
          quizId: 0,
          quizSectionId: 0,
          order: this.trueFalseQuestions.length + index + 1,
          hint: questionData.hint || '',
          text: questionData.text,
          shortAnswer: {
            answer: questionData.shortAnswer.answer
          }
        });
      }
    });

    // Add Multiple Choice questions
    this.multipleChoiceQuestions.controls.forEach((question, index) => {
      const questionData = question.value;
      if (questionData.text && questionData.text.trim()) {
        questions.push({
          courseId: this.selectedCourse?.id || 0,
          quizId: 0,
          quizSectionId: 0,
          order: this.trueFalseQuestions.length + this.shortAnswerQuestions.length + index + 1,
          hint: questionData.hint || '',
          text: questionData.text,
          multipleChoise: questionData.multipleChoise.filter((choice: any) => choice.answer && choice.answer.trim())
        });
      }
    });

    return questions;
  }

  // Method to save all questions
  saveQuestions() {
    if (!this.selectedCourse) {
      alert('Please select a course first.');
      return;
    }

    const questions = this.prepareQuestionData();
    console.log('Questions to save:', questions);

    if (questions.length === 0) {
      alert('Please add at least one question before saving.');
      return;
    }

    // Validate questions
    const invalidQuestions = questions.filter(q => !q.text || q.text.trim() === '');
    if (invalidQuestions.length > 0) {
      alert('Please fill in all question texts before saving.');
      return;
    }

    // Validate multiple choice questions
    const mcQuestions = questions.filter(q => q.multipleChoise);
    for (let mcq of mcQuestions) {
      // Check if has at least 2 choices
      const validChoices = mcq.multipleChoise.filter((choice: any) => choice.answer && choice.answer.trim());
      if (validChoices.length < 2) {
        alert('Multiple choice questions must have at least 2 valid choices with text.');
        return;
      }

      // Check if has correct answer
      const hasCorrectAnswer = mcq.multipleChoise.some((choice: any) => choice.correct);
      if (!hasCorrectAnswer) {
        alert('Please select a correct answer for all multiple choice questions.');
        return;
      }
    }

    // Here you would call your service to save the questions
    // Example: this._quizService.saveQuestions(questions).subscribe(...)

    // For now, just log the data
    console.log('✅ All questions validated successfully!');
    alert(`${questions.length} questions prepared for saving!\n\nData structure matches backend requirements.`);
  }



}
