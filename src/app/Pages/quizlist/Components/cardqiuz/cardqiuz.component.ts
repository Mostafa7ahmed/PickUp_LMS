import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService, Quiz } from '../../Core/services/quiz.service';
import { Subscription } from 'rxjs';
import { GetallQuizService } from '../../Core/services/getall-quiz.service';
import { IQuiz } from '../../Core/Interface/iquiz';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { DeleteQuizService } from '../../Core/services/delete-quiz.service';
import { DeleteQuizComponent } from "../delete-quiz/delete-quiz.component";

@Component({
  selector: 'app-cardqiuz',
  standalone: true,
  imports: [CommonModule, FormsModule, TopPopComponent, TextHeaderComponent, DeleteQuizComponent],
  templateUrl: './cardqiuz.component.html',
  styleUrl: './cardqiuz.component.scss'
})
export class CardqiuzComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private quizService = inject(GetallQuizService);
    private _deleteQuizService = inject(DeleteQuizService);

  isDeletePopupVisible = false;
  selectedDeleteQuiz: IQuiz | null = null;
  searchTerm = '';
  isLoading:boolean =  false;
  hasData: boolean = false; // Track if we have any data from API

  // Filter properties
  showFilterDialog = false;
  filters = {
    difficulty: [] as number[],
    questionsRange: { min: 0, max: 100 },
    durationRange: { min: 0, max: 180 },
    dateRange: { from: null as Date | null, to: null as Date | null },
    lessons: [] as string[]
  };

  difficultyOptions = [
    { value: 0, label: 'Easy', class: 'difficulty-easy' },
    { value: 1, label: 'Medium', class: 'difficulty-medium' },
    { value: 2, label: 'Hard', class: 'difficulty-hard' }
  ];

  // Delete confirmation dialog
  showDeleteDialog = false;
  quizToDelete: IPaginationResponse<IQuiz>= {} as IPaginationResponse<IQuiz>;
  originalQuizzes: IQuiz[] = []; // Store original data
  filteredQuizzes: IQuiz[] = []; // Store filtered data
  sampleQuizzes: Quiz[] = [];
  private quizSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.LoadQuiz()
  }
  LoadQuiz(){
    this.quizService.getQuizs().subscribe({
      next :(res) =>{
        this.originalQuizzes = res.result || [];
        this.filteredQuizzes = [...this.originalQuizzes];
        this.quizToDelete.result = this.filteredQuizzes;
        this.hasData = this.originalQuizzes.length > 0;
        this.isLoading = true;
        this.applySearchAndFilters();
      },
      error: (error) => {
        console.error('Error loading quizzes:', error);
        this.originalQuizzes = [];
        this.filteredQuizzes = [];
        this.quizToDelete.result = [];
        this.hasData = false;
        this.isLoading = true;
      }
    })
  }

  ngOnDestroy() {
    this.quizSubscription.unsubscribe();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applySearchAndFilters();
  }

  // Handle keyboard shortcuts
  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearSearch();
      (event.target as HTMLInputElement).blur();
    }
  }



  clearSearch() {
    this.searchTerm = '';
    this.applySearchAndFilters();
  }

  clearSearchAndFilters() {
    this.searchTerm = '';
    this.clearAllFilters();
  }

  // Filter methods
  openFilterDialog() {
    this.showFilterDialog = true;
  }

  closeFilterDialog() {
    this.showFilterDialog = false;
  }

  toggleDifficultyFilter(difficulty: number) {
    const index = this.filters.difficulty.indexOf(difficulty);
    if (index > -1) {
      this.filters.difficulty.splice(index, 1);
    } else {
      this.filters.difficulty.push(difficulty);
    }
  }

  isDifficultySelected(difficulty: number): boolean {
    return this.filters.difficulty.includes(difficulty);
  }

  applyFilters() {
    this.closeFilterDialog();
    this.applySearchAndFilters();
  }

  clearAllFilters() {
    this.filters = {
      difficulty: [],
      questionsRange: { min: 0, max: 100 },
      durationRange: { min: 0, max: 180 },
      dateRange: { from: null, to: null },
      lessons: []
    };
    this.applySearchAndFilters();
  }

  private applySearchAndFilters() {
    let filtered = [...this.originalQuizzes];

    // Apply search filter
    if (this.searchTerm && this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(quiz =>
        quiz.name.toLowerCase().includes(searchLower) ||
        quiz.description.toLowerCase().includes(searchLower) ||
        quiz.lessonsNames.some(lesson => lesson.toLowerCase().includes(searchLower))
      );
    }

    // Apply difficulty filter
    if (this.filters.difficulty.length > 0) {
      filtered = filtered.filter(quiz =>
        this.filters.difficulty.includes(quiz.difficulty)
      );
    }

    // Apply questions range filter
    if (this.filters.questionsRange.min > 0 || this.filters.questionsRange.max < 100) {
      filtered = filtered.filter(quiz =>
        quiz.questionsCount >= this.filters.questionsRange.min &&
        quiz.questionsCount <= this.filters.questionsRange.max
      );
    }

    // Apply duration range filter
    if (this.filters.durationRange.min > 0 || this.filters.durationRange.max < 180) {
      filtered = filtered.filter(quiz =>
        quiz.duration >= this.filters.durationRange.min &&
        quiz.duration <= this.filters.durationRange.max
      );
    }

    // Apply date range filter
    if (this.filters.dateRange.from || this.filters.dateRange.to) {
      filtered = filtered.filter(quiz => {
        const quizDate = new Date(quiz.createdOn);
        const fromDate = this.filters.dateRange.from ? new Date(this.filters.dateRange.from) : null;
        const toDate = this.filters.dateRange.to ? new Date(this.filters.dateRange.to) : null;

        if (fromDate && toDate) {
          return quizDate >= fromDate && quizDate <= toDate;
        } else if (fromDate) {
          return quizDate >= fromDate;
        } else if (toDate) {
          return quizDate <= toDate;
        }
        return true;
      });
    }

    this.filteredQuizzes = filtered;
    this.quizToDelete.result = this.filteredQuizzes;
  }

  hasActiveFilters(): boolean {
    return this.filters.difficulty.length > 0 ||
           this.filters.questionsRange.min > 0 ||
           this.filters.questionsRange.max < 100 ||
           this.filters.durationRange.min > 0 ||
           this.filters.durationRange.max < 180 ||
           this.filters.dateRange.from !== null ||
           this.filters.dateRange.to !== null ||
           this.filters.lessons.length > 0;
  }

  getActiveFiltersCount(): number {
    let count = 0;

    if (this.filters.difficulty.length > 0) count++;
    if (this.filters.questionsRange.min > 0 || this.filters.questionsRange.max < 100) count++;
    if (this.filters.durationRange.min > 0 || this.filters.durationRange.max < 180) count++;
    if (this.filters.dateRange.from !== null || this.filters.dateRange.to !== null) count++;
    if (this.filters.lessons.length > 0) count++;

    return count;
  }

  isNotFoundState(): boolean {
    return !this.hasData && !this.searchTerm && !this.hasActiveFilters();
  }

  isNoResultsState(): boolean {
    return this.hasData && (!!this.searchTerm || this.hasActiveFilters()) && this.filteredQuizzes.length === 0;
  }

  isNoQuizzesState(): boolean {
    return this.hasData && !this.searchTerm && !this.hasActiveFilters() && this.filteredQuizzes.length === 0;
  }


  openPopup() {
    this.router.navigate([{ outlets: { dialog: ['addQuiz'] } }]);
  }

  deleteQuiz(quizId: number, event: Event) {
    event.stopPropagation();

    const quiz = this.sampleQuizzes.find(quiz => quiz.id === quizId);
    this.showDeleteDialog = true;
  }


  closeDeletePopup(): void {
    this.isDeletePopupVisible = false;
    this.selectedDeleteQuiz = null;
  }
  deleteQuizFun(): void {
    if (!this.selectedDeleteQuiz?.id) {
      console.error('❌ No task selected for deletion');
      return;
    }
    this._deleteQuizService.deleteQuiz(this.selectedDeleteQuiz.id).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('✅ Instructor task deleted successfully');
          // Remove the deleted quiz from originalQuizzes
          this.originalQuizzes = this.originalQuizzes.filter(q => q.id !== this.selectedDeleteQuiz?.id);
          this.applySearchAndFilters();
          this.closeDeletePopup();
        } else {
          console.error('❌ Failed to delete instructor task:', response.message);
          alert('Failed to delete task: ' + response.message);
        }
      },
      error: (error) => {
        console.error('❌ Error deleting instructor task:', error);
        alert('Error deleting task. Please try again.');
      }
    });
  }

  openDeleteQuizPopup(quiz: IQuiz): void {
    if (!quiz.id) {
      console.error('❌ Cannot delete task: Task ID is missing');
      return;
    }

    this.isDeletePopupVisible = true;
    this.selectedDeleteQuiz = quiz;
  }
  cancelDelete() {
    this.showDeleteDialog = false;
  }

  // Edit quiz
  editQuiz(quizId: number, event: Event) {


  }


  previewQuiz(quizId: number, event: Event) {

    // Open preview modal
    this.router.navigate([{ outlets: { dialog: ['quizPreview', quizId] } }], {
      queryParams: { mode: 'preview' }
    });
  }

  // Start quiz
  startQuiz(quizId: number, event: Event) {
    this.router.navigate([{ outlets: { dialog: ['quizPreview', quizId] } }], {
      queryParams: { mode: 'start' }
    });
  }

  // Convert difficulty number to text
  getDifficultyText(difficulty: number): string {
    switch (difficulty) {
      case 0:
        return 'Easy';
      case 1:
        return 'Medium';
      case 2:
        return 'Hard';
      default:
        return 'Unknown';
    }
  }

  // Get difficulty CSS class
  getDifficultyClass(difficulty: number): string {
    switch (difficulty) {
      case 0:
        return 'difficulty-easy';
      case 1:
        return 'difficulty-medium';
      case 2:
        return 'difficulty-hard';
      default:
        return 'difficulty-unknown';
    }
  }
}
