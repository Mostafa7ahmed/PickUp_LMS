import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService, Quiz } from '../../Core/services/quiz.service';
import { Subscription } from 'rxjs';
import { GetallQuizService } from '../../Core/services/getall-quiz.service';
import { IQuiz } from '../../Core/Interface/iquiz';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';

@Component({
  selector: 'app-cardqiuz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cardqiuz.component.html',
  styleUrl: './cardqiuz.component.scss'
})
export class CardqiuzComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private quizService = inject(GetallQuizService);

  searchTerm = '';
  isLoading:boolean =  false;

  // Delete confirmation dialog
  showDeleteDialog = false;
  quizToDelete: IPaginationResponse<IQuiz>= {} as IPaginationResponse<IQuiz>;
  sampleQuizzes: Quiz[] = [];
  private quizSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.LoadQuiz()
  }
  LoadQuiz(){
    this.quizService.getQuizs().subscribe({
      next :(res) =>{
        this.quizToDelete.result=res.result
        this.isLoading = true
      }
    })
  }

  ngOnDestroy() {
    this.quizSubscription.unsubscribe();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
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
  }


  openPopup() {
    this.router.navigate([{ outlets: { dialog: ['addQuiz'] } }]);
  }

  deleteQuiz(quizId: number, event: Event) {
    event.stopPropagation();

    const quiz = this.sampleQuizzes.find(quiz => quiz.id === quizId);
    this.showDeleteDialog = true;
  }

  confirmDelete() {
 
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


}
