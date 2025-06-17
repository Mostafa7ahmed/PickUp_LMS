import { Component, inject, OnInit } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardqiuzComponent } from "./Components/cardqiuz/cardqiuz.component";
import { WidgetquizlistComponent } from './Components/widgetquizlist/widgetquizlist.component';
import { QuizApiService } from './Core/services/quiz-api.service';

@Component({
  selector: 'app-quizlist',
  standalone: true,
    imports: [WidgetquizlistComponent, CommonModule, RouterModule, ButtonModule, TranslateModule, FormsModule, TabsModule, MatTooltipModule, CardqiuzComponent],
  
  templateUrl: './quizlist.component.html',
  styleUrls:[ './quizlist.component.scss', "../../Pages/Courses/courses/courses.component.scss" ]
})
export class QuizlistComponent implements OnInit {
  private quizApiService = inject(QuizApiService);

  showInfoCoupon = false;

  // Filter options
  selectedCourseId = 0;

  toggShowInfo() {
    this.showInfoCoupon = !this.showInfoCoupon;
  }

  ngOnInit(): void {
    // Initialize the quiz api service
    console.log('🚀 Initializing Quiz List page');
    
    // Load API data
    this.loadInitialData();
  }

  loadInitialData() {
    // Initial data loading for the widget
    this.quizApiService.getQuizWidget().subscribe(
      response => {
        console.log('📊 Quiz widget data loaded successfully:', response);
      },
      error => {
        console.error('❌ Failed to load quiz widget data:', error);
      }
    );
  }

  // Handle course selection change
  onCourseSelectionChange(courseId: number) {
    this.selectedCourseId = courseId;
    console.log(`📚 Selected course changed to ID: ${courseId}`);
    // You can emit an event or use a shared service to notify child components
  }
}
