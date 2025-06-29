import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService, Quiz, QuizQuestion } from '../../Core/services/quiz.service';
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
  private quizService = inject(QuizService);
  private location = inject(Location );

  quiz: Quiz | null = null;
  currentQuestionIndex = 0;
  selectedAnswers: any = {};
  showResults = false;
  score = 0;
  isPreviewMode = true;
  questions: QuizQuestion[] = [];
  autoCloseCountdown = 5;
  private countdownInterval?: any;

  // Fallback sample questions if no real questions available
  fallbackQuestions: QuizQuestion[] = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: [
        'var myVariable = 5;',
        'variable myVariable = 5;',
        'v myVariable = 5;',
        'declare myVariable = 5;'
      ],
      correctAnswer: 0,
      explanation: 'The "var" keyword is used to declare variables in JavaScript.',
      difficulty: 'easy',
      order: 1
    },
    {
      id: 2,
      type: 'true-false',
      question: 'JavaScript is a compiled programming language.',
      correctAnswer: false,
      explanation: 'JavaScript is an interpreted language, not compiled.',
      difficulty: 'medium',
      order: 2
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: 'Which method is used to add an element to the end of an array?',
      options: [
        'push()',
        'pop()',
        'shift()',
        'unshift()'
      ],
      correctAnswer: 0,
      explanation: 'The push() method adds elements to the end of an array.',
      difficulty: 'easy',
      order: 3
    },
    {
      id: 4,
      type: 'short-answer',
      question: 'What does "DOM" stand for?',
      correctAnswer: 'Document Object Model',
      explanation: 'DOM stands for Document Object Model, which represents the structure of HTML documents.',
      difficulty: 'medium',
      order: 4
    },
    {
      id: 5,
      type: 'true-false',
      question: 'CSS stands for Cascading Style Sheets.',
      correctAnswer: true,
      explanation: 'CSS indeed stands for Cascading Style Sheets.',
      difficulty: 'easy',
      order: 5
    }
  ];

  ngOnInit() {
    // Get quiz ID from route params
    const quizId = this.route.snapshot.params['id'];
    if (quizId) {
      this.quiz = this.quizService.getQuizById(parseInt(quizId)) || null;

      if (this.quiz && this.quiz.questions && this.quiz.questions.length > 0) {
        this.questions = this.quiz.questions;
        console.log('✅ Loaded real quiz questions:', this.questions);

        const trueFalseQuestions = this.questions.filter(q => q.type === 'true-false');
        console.log('🔍 True/False questions found:', trueFalseQuestions);
      } else {
        this.questions = this.fallbackQuestions;
        console.log('⚠️ Using fallback questions. Quiz data:', this.quiz);
      }
    } else {
      this.questions = this.fallbackQuestions;
    }

    // Check if it's preview or start mode
    const mode = this.route.snapshot.queryParams['mode'];
    this.isPreviewMode = mode !== 'start';
  }

  ngOnDestroy() {
    this.clearCountdown();
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
      // Calculate score and show results without confirmation
      this.calculateScore();
      this.showResults = true;
    } else {
      // Preview mode - just close the popup
      this.closePopup();
    }
  }

  calculateScore() {
    let correct = 0;
    this.questions.forEach((question: QuizQuestion, index: number) => {
      const userAnswer = this.selectedAnswers[index];
      console.log(`Question ${index + 1}:`, {
        type: question.type,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: userAnswer === question.correctAnswer
      });

      if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
        correct++;
      }
    });
    this.score = Math.round((correct / this.questions.length) * 100);
    console.log(`Final score: ${correct}/${this.questions.length} = ${this.score}%`);

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
  }

  // Helper methods
  getCurrentQuestion() {
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
    if (this.score >= 80) return '#10b981'; // Green
    if (this.score >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  }

  // Helper methods for template
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getCorrectAnswersCount(): number {
    let correct = 0;
    this.questions.forEach((question: QuizQuestion, index: number) => {
      const userAnswer = this.selectedAnswers[index];
      if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  }

  isQuizComplete(): boolean {
    return Object.keys(this.selectedAnswers).length === this.questions.length;
  }


}
