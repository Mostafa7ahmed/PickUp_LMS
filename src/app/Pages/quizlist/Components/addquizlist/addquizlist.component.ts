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
import { QuizService } from '../../Core/services/quiz.service';

@Component({
  selector: 'app-addquizlist',
  standalone: true,
  imports: [TopPopComponent, CommonModule, FormsModule, TextHeaderComponent,  SplicTextPipe, TrueFalseComponent, ShortAnswerComponent, MultipleChoiceComponent],
  templateUrl: './addquizlist.component.html',
  styleUrl: './addquizlist.component.scss'
})
export class AddquizlistComponent implements OnInit {
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  private router = inject(Router);
  private quizService = inject(QuizService);
  showFirstPopup = true;
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

  // Quiz details
  quizTitle = '';
  quizDescription = '';
  quizDuration = 30;
  quizDifficulty: 'easy' | 'medium' | 'hard' = 'medium';

  // Lesson selection (placeholder for future implementation)
  selectedLesson: any = null;
  showDropdownLesson = false;
  lessons: any[] = [];
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

    // Load lessons for selected course (placeholder)
    this.loadLessonsForCourse(course.id);
  }

  // Lesson selection methods
  toggleDropdownLesson() {
    this.showDropdownLesson = !this.showDropdownLesson;
  }

  removeLesson() {
    this.selectedLesson = null;
    this.showDropdownLesson = false;
  }

  selectLesson(lesson: any) {
    this.selectedLesson = lesson;
    this.showDropdownLesson = false;
  }

  // Load lessons for course (placeholder - replace with actual API call)
  loadLessonsForCourse(courseId: number) {
    // TODO: Replace with actual API call using courseId
    console.log('Loading lessons for course:', courseId);

    // Placeholder lessons data
    this.lessons = [
      { id: 1, name: 'Introduction to Programming', duration: '45 min' },
      { id: 2, name: 'Variables and Data Types', duration: '30 min' },
      { id: 3, name: 'Control Structures', duration: '60 min' },
      { id: 4, name: 'Functions and Methods', duration: '50 min' },
      { id: 5, name: 'Object-Oriented Programming', duration: '75 min' }
    ];
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
    // Validate that a course is selected
    if (!this.selectedCourse) {
      return;
    }

    if (!this.quizTitle.trim()) {
      return;
    }

    this.showFirstPopup = false;
    setTimeout(() => {
      this.showSecondPopup = true;
    }, 300); // مدة الأنيميشن
  }

  closePopup() {
    this.showFirstPopup = false;
    this.showSecondPopup = false;
    setTimeout(() => {
      this.router.navigate([{ outlets: { dialog: null } }]);
    }, 300);
  }

  goBack() {
    this.showSecondPopup = false;
    setTimeout(() => {
      this.showFirstPopup = true;
    }, 300);
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

  // Method to save all questions and create quiz
  saveQuestions() {
    if (!this.selectedCourse) {
      return;
    }

    if (!this.quizTitle.trim()) {
      return;
    }

    const questions = this.prepareQuestionData();
    console.log('📝 Questions to save:', questions);
    console.log('📊 True/False questions:', this.trueFalseQuestions.value);
    console.log('📊 Short Answer questions:', this.shortAnswerQuestions.value);
    console.log('📊 Multiple Choice questions:', this.multipleChoiceQuestions.value);

    if (questions.length === 0) {
      return;
    }

    // Validate questions
    const invalidQuestions = questions.filter(q => !q.text || q.text.trim() === '');
    if (invalidQuestions.length > 0) {
      return;
    }

    // Validate multiple choice questions
    const mcQuestions = questions.filter(q => q.multipleChoise);
    for (let mcq of mcQuestions) {
      // Check if has at least 2 choices
      const validChoices = mcq.multipleChoise.filter((choice: any) => choice.answer && choice.answer.trim());
      if (validChoices.length < 2) {
        return;
      }

      // Check if has correct answer
      const hasCorrectAnswer = mcq.multipleChoise.some((choice: any) => choice.correct);
      if (!hasCorrectAnswer) {
        return;
      }
    }

    // Create new quiz with questions
    const newQuiz = this.quizService.addQuizWithQuestions({
      title: this.quizTitle.trim(),
      description: this.quizDescription.trim() || `Quiz for ${this.selectedCourse.name}`,
      questionsCount: questions.length,
      duration: this.quizDuration,
      difficulty: this.quizDifficulty,
      status: 'draft' as const,
      tags: [this.selectedCourse.name, 'Course Quiz'],
      courseId: this.selectedCourse.id,
      courseName: this.selectedCourse.name,
      attempts: 0,
      createdDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }, questions);

    console.log('✅ Quiz created successfully!', newQuiz);

    this.closePopup();
  }



}
