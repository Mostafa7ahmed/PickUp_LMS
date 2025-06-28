import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { CommonModule } from '@angular/common';
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { environment } from '../../../../Environments/environment';
import { SplicTextPipe } from '../../../Courses/Core/Pipes/splic-text.pipe';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ListCourseService } from '../../../Courses/Core/service/list-course.service';
import { ILessonList } from '../../../lesson/Core/Interface/ilesson-list';
import { ListLessonService } from '../../../lesson/Core/Services/list-lesson.service';
import { Select } from 'primeng/select';
import { FormArray, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrueFalseComponent } from "../true-false/true-false.component";
import { ShortAnswerComponent } from "../short-answer/short-answer.component";
import { MultipleChoiceComponent } from "../multiple-choice/multiple-choice.component";
import { QuizService } from '../../Core/services/quiz.service';
import { QuizApiService } from '../../Core/services/quiz-api.service';
import {
  ICompleteQuizCreationRequest,
  QuizDurationType,
  IQuizCreationProgress,
  QuizDifficulty
} from  './../../Core/Interface/iquiz';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addquizlist',
  standalone: true,
  imports: [TopPopComponent, CommonModule, FormsModule, TextHeaderComponent,  SplicTextPipe, TrueFalseComponent, ShortAnswerComponent, MultipleChoiceComponent],
  templateUrl: './addquizlist.component.html',
  styleUrl: './addquizlist.component.scss'
})
export class AddquizlistComponent implements OnInit, OnDestroy {
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  private router = inject(Router);
  private quizService = inject(QuizService);
  private quizApiService = inject(QuizApiService);
  private _paginateCoursesService = inject(ListCourseService);
  private _listLessonService = inject(ListLessonService);

  showFirstPopup = true;
  showSecondPopup = false;

  // API integration properties
  isCreatingQuiz = false;
  creationProgress: IQuizCreationProgress = { step: 'quiz' };
  private progressSubscription?: Subscription;
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

  // Lesson selection with checkboxes
  lessons: ILessonList[] = [];
  selectedLessons: ILessonList[] = [];
  isLoadingLessons = false;
  showLessonSelection = false;
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
    this.selectedLessons = []; // Reset selected lessons when course changes

    // Load lessons for selected course
    this.loadLessonsForCourse(course.id);
  }

  // Lesson selection methods with checkboxes
  toggleLessonSelection() {
    this.showLessonSelection = !this.showLessonSelection;
  }

  // Toggle lesson selection (checkbox behavior)
  toggleLessonCheckbox(lesson: ILessonList) {
    const index = this.selectedLessons.findIndex(l => l.id === lesson.id);
    if (index > -1) {
      // Remove lesson if already selected
      this.selectedLessons.splice(index, 1);
    } else {
      // Add lesson if not selected
      this.selectedLessons.push(lesson);
    }
  }

  // Check if lesson is selected
  isLessonSelected(lesson: ILessonList): boolean {
    return this.selectedLessons.some(l => l.id === lesson.id);
  }

  // Remove all selected lessons
  clearSelectedLessons() {
    this.selectedLessons = [];
  }

  // Remove specific lesson from selection
  removeSelectedLesson(lesson: ILessonList) {
    const index = this.selectedLessons.findIndex(l => l.id === lesson.id);
    if (index > -1) {
      this.selectedLessons.splice(index, 1);
    }
  }

  // Load lessons for course using actual API
  loadLessonsForCourse(courseId: number) {
    console.log('Loading lessons for course:', courseId);
    this.isLoadingLessons = true;
    this.lessons = [];

    this._listLessonService.getLessons(courseId).subscribe({
      next: (response) => {
        this.lessons = response.result || [];
        this.isLoadingLessons = false;
        console.log('✅ Lessons loaded:', this.lessons);
      },
      error: (error) => {
        console.error('❌ Error loading lessons:', error);
        this.isLoadingLessons = false;
        this.lessons = [];
      }
    });
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

    // Subscribe to quiz creation progress
    this.progressSubscription = this.quizApiService.progress$.subscribe(
      progress => {
        this.creationProgress = progress;
        console.log('📊 Quiz creation progress:', progress);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
    this.quizApiService.resetProgress();
  }

  // Helper method to get total questions count
  getTotalQuestionsCount(): number {
    return this.trueFalseQuestions.length +
           this.shortAnswerQuestions.length +
           this.multipleChoiceQuestions.length;
  }

  // Helper method to check if quiz can be saved
  canSaveQuiz(): boolean {
    return !this.isCreatingQuiz &&
           this.selectedCourse !== null &&
           this.quizTitle.trim() !== '' &&
           this.getTotalQuestionsCount() > 0;
  }

  // Helper method to get progress percentage
  getProgressPercentage(): number {
    if (!this.creationProgress.totalQuestions || !this.creationProgress.completedQuestions) {
      return 0;
    }
    return Math.round((this.creationProgress.completedQuestions / this.creationProgress.totalQuestions) * 100);
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

  // Convert string difficulty to enum
  private getDifficultyEnum(difficulty: string): QuizDifficulty {
    switch(difficulty.toLowerCase()) {
      case 'easy': return QuizDifficulty.Easy;
      case 'hard': return QuizDifficulty.Hard;
      case 'medium':
      default: return QuizDifficulty.Medium;
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

  // Method to save all questions and create quiz using API
  saveQuestions() {
    if (!this.selectedCourse) {
      alert('Please select a course');
      return;
    }

    if (!this.quizTitle.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    const questions = this.prepareQuestionData();
    console.log('📝 Questions to save:', questions);

    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    // Validate questions
    const invalidQuestions = questions.filter(q => !q.text || q.text.trim() === '');
    if (invalidQuestions.length > 0) {
      alert('Please fill in all question texts');
      return;
    }

    // Validate multiple choice questions
    const mcQuestions = questions.filter(q => q.multipleChoise);
    for (let mcq of mcQuestions) {
      const validChoices = mcq.multipleChoise.filter((choice: any) => choice.answer && choice.answer.trim());
      if (validChoices.length < 2) {
        alert('Multiple choice questions must have at least 2 choices');
        return;
      }

      const hasCorrectAnswer = mcq.multipleChoise.some((choice: any) => choice.correct);
      if (!hasCorrectAnswer) {
        alert('Multiple choice questions must have at least one correct answer');
        return;
      }
    }

    // Start quiz creation process
    this.isCreatingQuiz = true;
    this.quizApiService.resetProgress();

    // Convert form questions to API format
    const apiQuestions = this.quizApiService.convertFormQuestionsToApiFormat(
      questions,
      this.selectedCourse.id
    );

    // Prepare complete quiz creation request
    const quizRequest: ICompleteQuizCreationRequest = {
      courseId: this.selectedCourse.id,
      lessonIds: this.selectedLessons.map(lesson => lesson.id),
      name: this.quizTitle.trim(),
      description: this.quizDescription.trim() || `Quiz for ${this.selectedCourse.name}`,
      limited: true, // Set based on your requirements
      quizDuration: {
        duration: this.quizDuration,
        type: this.selectedDiscountType === 1 ? QuizDurationType.Hours : QuizDurationType.minute
      },
      difficulty: this.getDifficultyEnum(this.quizDifficulty),
      questions: apiQuestions
    };

    console.log('🚀 Creating quiz with API:', quizRequest);

    // Call API to create complete quiz
    this.quizApiService.createCompleteQuiz(quizRequest).subscribe({
      next: (response) => {
        this.isCreatingQuiz = false;
        console.log('✅ Quiz created successfully via API!', response);
        alert('Quiz created successfully!');
        this.closePopup();
      },
      error: (error) => {
        this.isCreatingQuiz = false;
        console.error('❌ Error creating quiz via API:', error);
        alert('Failed to create quiz: ' + (error.message || 'Unknown error'));
      }
    });
  }



}
