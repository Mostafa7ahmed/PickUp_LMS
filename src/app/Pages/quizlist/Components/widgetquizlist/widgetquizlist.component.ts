import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { QuizService, Quiz } from '../../Core/services/quiz.service';
import { Subscription } from 'rxjs';
import { GetWidgetsService } from '../../Core/services/get-widgets.service';
import { IWidgetQuiz } from '../../Core/Interface/iwidget-quiz';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';

interface QuizAnalytics {
  totalQuizzes: number;
  publishedQuizzes: number;
  draftQuizzes: number;
  scheduledQuizzes: number;
  totalQuestions: number;
  averageDuration: number;
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}

@Component({
  selector: 'app-widgetquizlist',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './widgetquizlist.component.html',
  styleUrls: ['./widgetquizlist.component.scss' ]
})
export class WidgetquizlistComponent implements OnInit, OnDestroy {
  @Input() showInfo = true;

  private quizService = inject(GetWidgetsService);
  private quizSubscription?: Subscription;
  isLoading :boolean = false

  quizData: IResponseOf<IWidgetQuiz> = {} as IResponseOf<IWidgetQuiz>

  ngOnInit(): void {
    this.quizSubscription = this.quizService.getWidgetsQuiz().subscribe({
      next : (res)=>{
       
        console.log(res)
        this.quizData.result = res.result;
         this.isLoading = true
      }
    })
    
  }
  ngOnDestroy(): void {

    this.quizSubscription?.unsubscribe()
  }
  
}
