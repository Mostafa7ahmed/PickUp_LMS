import { LoginService } from './../../../Core/Services/login.service';
import { Component, OnInit } from '@angular/core';
import { MyCoursesComponent } from "./components/my-courses/my-courses.component";
import { TodoComponent } from "./components/todo/todo.component";
import { CourseCardComponent } from "./components/course-card/course-card.component";
import { DiscoverCardsComponent } from "./components/discover-cards/discover-cards.component";
import { PhrasesService } from './service/phrases.service';
import { Decode } from '../../../Core/Interface/user';

@Component({
  selector: 'app-homepage-student',
  standalone: true,
  imports: [MyCoursesComponent, TodoComponent, DiscoverCardsComponent],
  templateUrl: './homepage-student.component.html',
  styleUrl: './homepage-student.component.scss'
})
export class HomepageStudentComponent implements OnInit {
  constructor(private phrasesService: PhrasesService, private _LoginService: LoginService) {}
  
  dataUser: Decode = {} as Decode;
  randomMessage = '';

  // Animated number properties
  streakCount = 0;
  activeCoursesCount = 0;
  totalRevenueCount = 0;
  averageRatingCount = 0;

  // Target values for animations
  private readonly targetStreak = 20;
  private readonly targetActiveCourses = 2845;
  private readonly targetRevenue = 2845;
  private readonly targetRating = 4.9;

  ngOnInit(): void {
    this.dataUser = this._LoginService.saveUserAuth();
    this.randomMessage = this.phrasesService.getRandomMessage();
    
    // Generate random variations for more dynamic display
    this.generateRandomNumbers();
    
    // Start animations with delays for staggered effect
    setTimeout(() => this.animateStreak(), 500);
    setTimeout(() => this.animateActiveCourses(), 700);
    setTimeout(() => this.animateRevenue(), 900);
    setTimeout(() => this.animateRating(), 1100);
  }

  // Generate random variations to make stats more dynamic
  private generateRandomNumbers(): void {
    // Add random variations to base numbers
    const streakVariation = Math.floor(Math.random() * 10) + 15; // 15-25
    const coursesVariation = Math.floor(Math.random() * 500) + 2500; // 2500-3000
    const revenueVariation = Math.floor(Math.random() * 1000) + 2000; // 2000-3000
    const ratingVariation = (Math.random() * 0.8) + 4.2; // 4.2-5.0
    
    // Update target values with variations
    (this as any).targetStreak = streakVariation;
    (this as any).targetActiveCourses = coursesVariation;
    (this as any).targetRevenue = revenueVariation;
    (this as any).targetRating = Math.round(ratingVariation * 10) / 10;
  }

  // Animate streak counter
  private animateStreak(): void {
    this.animateNumber(
      0, 
      this.targetStreak, 
      1000, 
      (value) => this.streakCount = Math.floor(value)
    );
  }

  // Animate active courses counter
  private animateActiveCourses(): void {
    this.animateNumber(
      0, 
      this.targetActiveCourses, 
      2000, 
      (value) => this.activeCoursesCount = Math.floor(value)
    );
  }

  // Animate revenue counter
  private animateRevenue(): void {
    this.animateNumber(
      0, 
      this.targetRevenue, 
      2200, 
      (value) => this.totalRevenueCount = Math.floor(value)
    );
  }

  // Animate rating counter
  private animateRating(): void {
    this.animateNumber(
      0, 
      this.targetRating, 
      1500, 
      (value) => this.averageRatingCount = Math.round(value * 10) / 10
    );
  }

  // Generic number animation function
  private animateNumber(
    start: number, 
    end: number, 
    duration: number, 
    callback: (value: number) => void
  ): void {
    const startTime = performance.now();
    const difference = end - start;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = start + (difference * easedProgress);
      callback(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  // Utility method to format large numbers with commas
  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  // Generate random fluctuation for more dynamic effect
  generateRandomBonus(): number {
    return Math.floor(Math.random() * 100);
  }

  // Refresh animations with new random numbers
  refreshAnimations(): void {
    // Reset all counters
    this.streakCount = 0;
    this.activeCoursesCount = 0;
    this.totalRevenueCount = 0;
    this.averageRatingCount = 0;
    
    // Generate new random numbers
    this.generateRandomNumbers();
    
    // Restart animations
    setTimeout(() => this.animateStreak(), 100);
    setTimeout(() => this.animateActiveCourses(), 200);
    setTimeout(() => this.animateRevenue(), 300);
    setTimeout(() => this.animateRating(), 400);
  }

  // Add bounce effect to numbers when clicked
  onNumberClick(type: string): void {
    const element = document.querySelector(`.animated-number`);
    if (element) {
      element.classList.add('bounce-effect');
      setTimeout(() => {
        element.classList.remove('bounce-effect');
      }, 600);
    }
  }

  // Get random motivational color for numbers
  getRandomColor(): string {
    const colors = ['#29B865', '#27AE60', '#2ECC71', '#3B82F6', '#8B5CF6', '#FBBF24'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
