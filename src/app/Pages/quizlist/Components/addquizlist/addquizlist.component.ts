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
import { QuizApiV2Service } from '../../Core/services/quiz-api-v2.service';
import { QuizRefreshService } from '../../Core/services/quiz-refresh.service';
import {
  ICompleteQuizCreationRequest,
  QuizDurationType,
  IQuizCreationProgress,
  QuizDifficulty
} from  './../../Core/Interface/iquiz';
import {
  IQuizFormData,
  IQuestionFormData,
  QuizSectionType,
  QuizDurationType as V2QuizDurationType,
  QuizDifficulty as V2QuizDifficulty,
  IQuizCreationProgress as V2QuizCreationProgress
} from '../../Core/Interface/iquiz-api.interface';
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
  private quizApiV2Service = inject(QuizApiV2Service);
  private quizRefreshService = inject(QuizRefreshService);
  private _paginateCoursesService = inject(ListCourseService);
  private _listLessonService = inject(ListLessonService);

  showFirstPopup = true;
  showSecondPopup = false;

  // API integration properties
  isCreatingQuiz = false;
  creationProgress: V2QuizCreationProgress = { step: 'quiz' };
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
      // Only show courses that have at least one lesson
      if (response && response.result) {
        response.result = response.result.filter((course: ListCourse) => course.lessonsCount && course.lessonsCount > 0);
      }
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;
      console.log('Filtered courses with lessons:', response.result);
    });
  }

  public noCoursesWithLessons = false;
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

    // Subscribe to quiz creation progress from V2 service
    this.progressSubscription = this.quizApiV2Service.progress$.subscribe(
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

  // Convert string difficulty to enum (old version)
  private getDifficultyEnum(difficulty: string): QuizDifficulty {
    switch(difficulty.toLowerCase()) {
      case 'easy': return QuizDifficulty.Easy;
      case 'hard': return QuizDifficulty.Hard;
      case 'medium':
      default: return QuizDifficulty.Medium;
    }
  }

  // Convert string difficulty to V2 enum
  private getDifficultyEnumV2(difficulty: string): V2QuizDifficulty {
    switch(difficulty.toLowerCase()) {
      case 'easy': return V2QuizDifficulty.Easy;
      case 'hard': return V2QuizDifficulty.Hard;
      case 'medium':
      default: return V2QuizDifficulty.Medium;
    }
  }

  // Transform form data to V2 format
  private transformToV2Format(): { quizData: IQuizFormData; questions: IQuestionFormData[] } {
    const quizData: IQuizFormData = {
      courseId: this.selectedCourse?.id || 0,
      lessonIds: this.selectedLessons.map(lesson => lesson.id),
      name: this.quizTitle.trim(),
      description: this.quizDescription.trim() || `Quiz for ${this.selectedCourse?.name}`,
      limited: true,
      duration: this.quizDuration,
      durationType: this.selectedDiscountType === 1 ? V2QuizDurationType.Hours : V2QuizDurationType.Minutes,
      difficulty: this.getDifficultyEnumV2(this.quizDifficulty)
    };

    const questions: IQuestionFormData[] = [];

    // Add True/False questions
    this.trueFalseQuestions.controls.forEach((question, index) => {
      const questionData = question.value;
      if (questionData.text && questionData.text.trim()) {
        questions.push({
          type: QuizSectionType.TrueFalse,
          text: questionData.text,
          hint: questionData.hint || '',
          correctAnswer: questionData.trueAndFalse.answer,
          order: index + 1
        });
      }
    });

    // Add Short Answer questions
    this.shortAnswerQuestions.controls.forEach((question, index) => {
      const questionData = question.value;
      if (questionData.text && questionData.text.trim()) {
        questions.push({
          type: QuizSectionType.ShortAnswer,
          text: questionData.text,
          hint: questionData.hint || '',
          correctAnswer: questionData.shortAnswer.answer,
          order: this.trueFalseQuestions.length + index + 1
        });
      }
    });

    // Add Multiple Choice questions
    this.multipleChoiceQuestions.controls.forEach((question, index) => {
      const questionData = question.value;
      if (questionData.text && questionData.text.trim()) {
        const validChoices = questionData.multipleChoise.filter((choice: any) => choice.answer && choice.answer.trim());
        const correctAnswerIndex = validChoices.findIndex((choice: any) => choice.correct);
        
        questions.push({
          type: QuizSectionType.MultipleChoice,
          text: questionData.text,
          hint: questionData.hint || '',
          options: validChoices.map((choice: any) => choice.answer),
          correctAnswer: correctAnswerIndex,
          order: this.trueFalseQuestions.length + this.shortAnswerQuestions.length + index + 1
        });
      }
    });

    return { quizData, questions };
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

  // Method to save all questions and create quiz using V2 API
  saveQuestions() {
    if (!this.selectedCourse) {
      alert('Please select a course');
      return;
    }

    if (!this.quizTitle.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    if (this.selectedLessons.length === 0) {
      alert('Please select at least one lesson');
      return;
    }

    // Transform form data to V2 format
    const { quizData, questions } = this.transformToV2Format();
    console.log('📝 V2 Quiz data:', quizData);
    console.log('📝 V2 Questions:', questions);

    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    // Validate using V2 service validation methods
    const quizErrors = this.quizApiV2Service.validateQuizForm(quizData);
    if (quizErrors.length > 0) {
      alert('Quiz validation errors:\n' + quizErrors.join('\n'));
      return;
    }

    const questionErrors = this.quizApiV2Service.validateQuestions(questions);
    if (questionErrors.length > 0) {
      alert('Question validation errors:\n' + questionErrors.join('\n'));
      return;
    }

    // Start quiz creation process
    this.isCreatingQuiz = true;
    this.quizApiV2Service.resetProgress();

    console.log('🚀 Creating quiz with V2 API');

    // First create the quiz
    this.quizApiV2Service.createQuiz(quizData).subscribe({
      next: (quizResponse) => {
        console.log('✅ Quiz created successfully:', quizResponse);
        
        if (quizResponse.success && quizResponse.result) {
          const quizId = quizResponse.result.id;
          
          // Get the quiz to retrieve section IDs
          this.quizApiV2Service.getQuiz(quizId).subscribe({
            next: (quizDetails) => {
              console.log('📋 Quiz details retrieved:', quizDetails);
              
              if (quizDetails.success && quizDetails.result.quizSections.length >= 3) {
                const sections = quizDetails.result.quizSections;
                const sectionIds = {
                  multipleChoice: sections.find(s => s.type === QuizSectionType.MultipleChoice)?.id || 0,
                  trueFalse: sections.find(s => s.type === QuizSectionType.TrueFalse)?.id || 0,
                  shortAnswer: sections.find(s => s.type === QuizSectionType.ShortAnswer)?.id || 0
                };

                console.log('📂 Section IDs:', sectionIds);

                // Now create questions
                if (questions.length > 0) {
                  this.quizApiV2Service.createQuestionsBulk(
                    quizId,
                    quizData.courseId,
                    sectionIds,
                    questions
                  ).subscribe({
                    next: (questionsResponse) => {
                      this.isCreatingQuiz = false;
                      console.log('✅ Questions created successfully:', questionsResponse);
                      alert('Quiz and questions created successfully!');
                      
                      // Notify refresh service about new quiz
                      if (this.selectedCourse?.id) {
                        this.quizRefreshService.notifyQuizAdded(this.selectedCourse.id, quizId);
                      }
                      
                      this.closePopup();
                    },
                    error: (error) => {
                      this.isCreatingQuiz = false;
                      console.error('❌ Error creating questions:', error);
                      alert('Quiz created but failed to add questions: ' + (error.message || 'Unknown error'));
                    }
                  });
                } else {
                  this.isCreatingQuiz = false;
                  alert('Quiz created successfully (no questions added)!');
                  
                  // Notify refresh service about new quiz
                  if (this.selectedCourse?.id) {
                    this.quizRefreshService.notifyQuizAdded(this.selectedCourse.id, quizId);
                  }
                  
                  this.closePopup();
                }
              } else {
                this.isCreatingQuiz = false;
                console.error('❌ Quiz sections not found or incomplete');
                alert('Quiz created but sections are missing. Please try again.');
              }
            },
            error: (error) => {
              this.isCreatingQuiz = false;
              console.error('❌ Error retrieving quiz details:', error);
              alert('Quiz created but failed to retrieve details: ' + (error.message || 'Unknown error'));
            }
          });
        } else {
          this.isCreatingQuiz = false;
          alert('Failed to create quiz: ' + (quizResponse.message || 'Unknown error'));
        }
      },
      error: (error) => {
        this.isCreatingQuiz = false;
        console.error('❌ Error creating quiz:', error);
        alert('Failed to create quiz: ' + (error.message || 'Unknown error'));
      }
    });
  }

  // ===== NEW API V2 INTEGRATION SUMMARY =====
  // 
  // This component now uses the new quiz API endpoints:
  // 1. POST /quiz/create - Creates the quiz with basic info
  // 2. GET /quiz/get?id={id} - Retrieves quiz with auto-generated sections
  // 3. POST /question/bulk - Creates questions for all three section types
  // 
  // The workflow is:
  // 1. Create quiz (gets quiz ID)
  // 2. Retrieve quiz details (gets section IDs for the 3 auto-created sections)
  // 3. Create questions in bulk (assigns questions to appropriate sections)
  // 
  // Section Types:
  // - MultipleChoice = 0
  // - TrueFalse = 1  
  // - ShortAnswer = 2
  //
  // Question format examples:
  // - MultipleChoice: sends `multipleChoise` array with answer/correct properties
  // - TrueFalse: sends `trueAndFalse` object with answer boolean
  // - ShortAnswer: sends `shortAnswer` object with answer string
  // - Other types are set to null based on question type

}
