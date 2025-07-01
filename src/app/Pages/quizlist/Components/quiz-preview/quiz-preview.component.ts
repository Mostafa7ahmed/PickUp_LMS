import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizApiV2Service } from '../../Core/services/quiz-api-v2.service';
import { QuizDisplayService, QuizDisplayData, QuestionDisplay } from '../../Core/services/quiz-display.service';
import { IGetQuizResponse } from '../../Core/Interface/iquiz-api.interface';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";

@Component({
  selector: 'app-quiz-preview',
  standalone: true,
  imports: [CommonModule, FormsModule, TopPopComponent],
  templateUrl: './quiz-preview.component.html',
  styleUrl: './quiz-preview.component.scss'
})
export class QuizPreviewComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private quizApiService = inject(QuizApiV2Service);
  private quizDisplayService = inject(QuizDisplayService);
  private location = inject(Location);

  quiz: any = null;
  currentQuestionIndex = 0;
  selectedAnswers: any = {};
  showResults = false;
  score = 0;
  isPreviewMode = true;
  questions: QuestionDisplay[] = [];
  autoCloseCountdown = 5;
  private countdownInterval?: any;
  
  // Detailed results
  correctAnswersCount = 0;
  totalQuestions = 0;
  questionResults: { [key: number]: boolean } = {};
  scorePercentage = 0;
  
  // Loading and error states
  isLoading = true;
  error: string | null = null;
  
  // Fallback questions for demonstration (kept as backup)
  fallbackQuestions: QuestionDisplay[] = [
    {
      id: 1,
      text: 'What is Angular?',
      hint: '',
      type: 'multiple-choice',
      order: 1,
      options: ['A JavaScript framework', 'A CSS library', 'A database', 'An operating system'],
      correctAnswer: 0
    },
    {
      id: 2,
      text: 'TypeScript is a superset of JavaScript.',
      hint: '',
      type: 'true-false',
      order: 2,
      options: ['True', 'False'],
      correctAnswer: true
    }
  ];

  ngOnInit() {
    // Get quiz ID from route params
    const quizId = this.route.snapshot.params['id'];
    if (quizId) {
      this.loadQuizFromAPI(parseInt(quizId));
    } else {
      this.error = 'No quiz ID provided';
      this.isLoading = false;
    }

    // Check if it's preview or start mode
    const mode = this.route.snapshot.queryParams['mode'];
    this.isPreviewMode = mode !== 'start';
  }

  ngOnDestroy() {
    this.clearCountdown();
  }

  private loadQuizFromAPI(quizId: number) {
    this.isLoading = true;
    this.error = null;

    this.quizDisplayService.getQuizForDisplay(quizId).subscribe({
      next: (quizData: QuizDisplayData) => {
        console.log('✅ Quiz Display Data:', quizData);
        
        this.quiz = {
          id: quizData.id,
          title: quizData.name,
          description: quizData.description,
          duration: quizData.duration.split(' ')[0], // Extract number part
          difficulty: quizData.difficulty
        };

        // Flatten all questions from all sections
        this.questions = [];
        quizData.sections.forEach(section => {
          this.questions.push(...section.questions);
        });
        
        console.log('🔄 Processed questions:', this.questions);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ API Error:', error);
        this.handleError('Failed to load quiz data');
      }
    });
  }

  private handleError(message: string) {
    this.error = message;
    this.isLoading = false;
    
    // Use fallback data for demonstration
    console.log('⚠️ Using fallback data due to error:', message);
    this.quiz = {
      id: 0,
      title: 'Demo Quiz',
      description: 'This is a demonstration quiz with sample questions.',
      duration: 30,
      difficulty: 'Medium'
    };
    this.questions = this.fallbackQuestions;
  }

  private mapDifficultyToString(difficulty: number): string {
    switch (difficulty) {
      case 0: return 'Easy';
      case 1: return 'Medium';
      case 2: return 'Hard';
      default: return 'Medium';
    }
  }

  // Clear countdown timer
  private clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = undefined;
    }
  }

  closePopup() {
    this.clearCountdown();
    this.location.back();
  }
  

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  // Answer selection
  selectAnswer(answer: any) {
    this.selectedAnswers[this.currentQuestionIndex] = answer;
  }

  selectMultipleChoice(optionIndex: number) {
    this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
  }

  selectTrueFalse(value: boolean) {
    console.log(`✅ True/False selected: ${value} for question ${this.currentQuestionIndex + 1}`);
    console.log('Current question:', this.getCurrentQuestion());
    this.selectedAnswers[this.currentQuestionIndex] = value;
    console.log('Selected answers:', this.selectedAnswers);
  }

  // Quiz completion
  submitQuiz() {
    if (!this.isPreviewMode) {
      this.calculateScore();
      this.showResults = true;
    } else {
      this.closePopup();
    }
  }

  calculateScore() {
    this.correctAnswersCount = 0;
    this.totalQuestions = this.questions.length;
    this.questionResults = {};

    this.questions.forEach((question: QuestionDisplay, index: number) => {
      const userAnswer = this.selectedAnswers[index];
      let isCorrect = false;

      // Handle different question types
      switch (question.type) {
        case 'multiple-choice':
          // Compare selected option index with correct answer index
          isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer;
          break;
          
        case 'true-false':
          // Compare boolean values
          isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer;
          break;
          
        case 'short-answer':
          // Compare text answers (case-insensitive)
          if (userAnswer !== undefined && question.correctAnswer) {
            const userAnswerText = String(userAnswer).trim().toLowerCase();
            const correctAnswerText = String(question.correctAnswer).trim().toLowerCase();
            isCorrect = userAnswerText === correctAnswerText;
          }
          break;
          
        default:
          isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer;
      }

      // Store individual question result
      this.questionResults[index] = isCorrect;
      
      // Count correct answers
      if (isCorrect) {
        this.correctAnswersCount++;
      }

      console.log(`Question ${index + 1} (${question.type}):`, {
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        questionText: question.text.substring(0, 50) + '...'
      });
    });

    // Calculate percentage score
    this.scorePercentage = this.totalQuestions > 0 ? 
      Math.round((this.correctAnswersCount / this.totalQuestions) * 100) : 0;
    
    this.score = this.scorePercentage;

    console.log(`✅ Final Quiz Results:`, {
      correct: this.correctAnswersCount,
      total: this.totalQuestions,
      percentage: this.scorePercentage,
      grade: this.getLetterGrade(this.scorePercentage)
    });

    // Auto-close results with countdown
    this.autoCloseCountdown = 30;
    this.countdownInterval = setInterval(() => {
      this.autoCloseCountdown--;
      if (this.autoCloseCountdown <= 0) {
        this.clearCountdown();
        this.closePopup();
      }
    }, 1000);
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedAnswers = {};
    this.showResults = false;
    this.score = 0;
    this.correctAnswersCount = 0;
    this.totalQuestions = 0;
    this.questionResults = {};
    this.scorePercentage = 0;
  }

  // Helper methods
  getCurrentQuestion(): QuestionDisplay {
    const question = this.questions[this.currentQuestionIndex];
    if (question && question.type === 'true-false') {
      console.log('🔍 Current True/False question:', question);
    }
    return question;
  }

  isAnswered(questionIndex: number): boolean {
    return this.selectedAnswers[questionIndex] !== undefined;
  }

  getProgressPercentage(): number {
    const answeredCount = Object.keys(this.selectedAnswers).length;
    return Math.round((answeredCount / this.questions.length) * 100);
  }

  getQuestionTypeIcon(type: string): string {
    switch (type) {
      case 'multiple-choice': return 'fas fa-list';
      case 'true-false': return 'fas fa-check-circle';
      case 'short-answer': return 'fas fa-edit';
      default: return 'fas fa-question';
    }
  }

  getQuestionTypeName(type: string): string {
    switch (type) {
      case 'multiple-choice': return 'Multiple Choice';
      case 'true-false': return 'True/False';
      case 'short-answer': return 'Short Answer';
      default: return 'Question';
    }
  }

  getScoreColor(): string {
    if (this.score >= 80) return '#28a745'; // Green
    if (this.score >= 60) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  }

  getLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  getScoreMessage(): string {
    const percentage = this.scorePercentage;
    if (percentage >= 90) return 'Excellent! Outstanding performance!';
    if (percentage >= 80) return 'Great job! Well done!';
    if (percentage >= 70) return 'Good work! Keep it up!';
    if (percentage >= 60) return 'Fair performance. You can do better!';
    return 'Needs improvement. Please review the material.';
  }

  isQuestionCorrect(questionIndex: number): boolean {
    return this.questionResults[questionIndex] === true;
  }

  // Helper methods for template
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getCorrectAnswersCount(): number {
    // Use the detailed scoring results if available
    if (this.showResults && this.questionResults) {
      return this.correctAnswersCount;
    }
    
    // Fallback to real-time calculation for progress tracking
    let correct = 0;
    this.questions.forEach((question: QuestionDisplay, index: number) => {
      const userAnswer = this.selectedAnswers[index];
      let isCorrect = false;

      switch (question.type) {
        case 'multiple-choice':
          isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer;
          break;
        case 'true-false':
          isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer;
          break;
        case 'short-answer':
          if (userAnswer !== undefined && question.correctAnswer) {
            const userAnswerText = String(userAnswer).trim().toLowerCase();
            const correctAnswerText = String(question.correctAnswer).trim().toLowerCase();
            isCorrect = userAnswerText === correctAnswerText;
          }
          break;
        default:
          isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer;
      }

      if (isCorrect) {
        correct++;
      }
    });
    return correct;
  }

  isQuizComplete(): boolean {
    return Object.keys(this.selectedAnswers).length === this.questions.length;
  }

  retryLoading() {
    const quizId = this.route.snapshot.params['id'];
    if (quizId) {
      this.loadQuizFromAPI(parseInt(quizId));
    }
  }
}
