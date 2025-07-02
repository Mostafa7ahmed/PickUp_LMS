import { LoginService } from './../../../Core/Services/login.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from "./components/my-courses/my-courses.component";
import { TodoComponent } from "./components/todo/todo.component";
import { CourseCardComponent } from "./components/course-card/course-card.component";
import { DiscoverCardsComponent } from "./components/discover-cards/discover-cards.component";
import { PhrasesService } from './service/phrases.service';
import { Decode } from '../../../Core/Interface/user';
import { WalletService } from '../../../Core/Services/wallet.service';
import { IWallet } from '../../../Core/Interface/iwallet';
import { CourseService } from '../my-course/core/service/course.service';
import { CourseProgressStatus } from '../my-course/core/interface/icourse-student';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage-student',
  standalone: true,
  imports: [CommonModule, MyCoursesComponent, TodoComponent, DiscoverCardsComponent, TranslateModule],
  templateUrl: './homepage-student.component.html',
  styleUrl: './homepage-student.component.scss'
})
export class HomepageStudentComponent implements OnInit {
  constructor(private phrasesService: PhrasesService, private _LoginService: LoginService) {}
  private walletService = inject(WalletService);
  private courseService = inject(CourseService);
  wallet: IWallet | null = null;
  
  dataUser: Decode = {} as Decode;
  randomMessage = '';

  // Loading states
  isLoadingBalance = false;
  isLoadingCourses = false;

  // Animated number properties
  streakCount = 0;
  activeCoursesCount = 0;
  totalRevenueCount = 0; // Initialize with 0, will be animated
  averageRatingCount = 0;

  // Target values for animations
  private readonly targetStreak = 20;
  private targetActiveCourses = 0; // Start with 0, will be set from real API data
  private targetRevenue = 0; // Start with 0, will be set from real wallet balance
  private readonly targetRating = 4.9;

  ngOnInit(): void {
    this.dataUser = this._LoginService.saveUserAuth();
    this.randomMessage = this.phrasesService.getRandomMessage();
    
    // Get real wallet balance
    this.loadWalletBalance();
    
    // Get real enrolled courses count - NO FALLBACKS
    this.loadEnrolledCoursesCount();
    
    // Generate random variations ONLY for other stats (streak and rating)
    this.generateRandomNumbers();
    
    setTimeout(() => this.animateStreak(), 500);
    setTimeout(() => this.animateRating(), 1100);
    
    // Log data sources after animations complete
    setTimeout(() => this.logDataSources(), 3000);
  }

  // Load real wallet balance from API - NO FALLBACKS
  private loadWalletBalance(): void {
    console.log('🚀 Starting REAL wallet balance load...');
    this.isLoadingBalance = true;
    
    this.walletService.getWallet().subscribe({
      next: (res) => {
        console.log('📊 Real Wallet API Response:', res);
        this.isLoadingBalance = false;
        
        if (res && res.success && res.result) {
          this.wallet = res.result;
          const realBalance = res.result.balance || 0;
          console.log('💰 REAL wallet balance from API:', realBalance);
          
          // Use ONLY the real balance from API
          this.targetRevenue = realBalance;
          
          // Start balance animation with REAL data
          setTimeout(() => {
            console.log('🎬 Starting REAL balance animation with value:', this.targetRevenue);
            this.animateRevenue();
          }, 900);
        } else {
          console.warn('⚠️ Invalid wallet response structure:', res);
          this.isLoadingBalance = false;
          // Show 0 if API response is invalid - NO FAKE DATA
          this.targetRevenue = 0;
          this.totalRevenueCount = 0;
        }
      },
      error: (error) => {
        console.error('❌ Wallet API Error:', error);
        this.isLoadingBalance = false;
        
        // Show 0 if API fails - NO FAKE DATA
        this.targetRevenue = 0;
        this.totalRevenueCount = 0;
        console.log('💔 Wallet API failed - showing $0.00 (real data only)');
      }
    });
  }

  // Load real enrolled courses count from API - NO FALLBACKS
  private loadEnrolledCoursesCount(): void {
    console.log('🚀 Starting REAL enrolled courses count load...');
    this.isLoadingCourses = true;
    
    // Get all enrolled courses (both in progress and completed)
    this.courseService.getCourse(1, 1000).subscribe({
      next: (res) => {
        console.log('📚 Real Courses API Response:', res);
        this.isLoadingCourses = false;
        
        if (res && res.totalCount !== undefined) {
          const realCoursesCount = res.totalCount || 0;
          console.log('📖 REAL enrolled courses count from API:', realCoursesCount);
          
          // Use ONLY the real count from API
          this.targetActiveCourses = realCoursesCount;
          
          // Start courses animation with REAL data
          setTimeout(() => {
            console.log('🎬 Starting REAL courses animation with count:', this.targetActiveCourses);
            this.animateActiveCourses();
          }, 700);
        } else {
          console.warn('⚠️ Invalid courses response structure:', res);
          this.isLoadingCourses = false;
          // Show 0 if API response is invalid - NO FAKE DATA
          this.targetActiveCourses = 0;
          this.activeCoursesCount = 0;
        }
      },
      error: (error) => {
        console.error('❌ Courses API Error:', error);
        this.isLoadingCourses = false;
        
        // Show 0 if API fails - NO FAKE DATA
        this.targetActiveCourses = 0;
        this.activeCoursesCount = 0;
        console.log('💔 API failed - showing 0 courses (real data only)');
      }
    });
  }

  private generateRandomNumbers(): void {
    // Generate random variations ONLY for non-API stats (streak and rating)
    const streakVariation = Math.floor(Math.random() * 10) + 15; // 15-25
    const ratingVariation = (Math.random() * 0.8) + 4.2; // 4.2-5.0
    
    // Update ONLY streak and rating - NEVER touch API-driven values
    (this as any).targetStreak = streakVariation;
    (this as any).targetRating = Math.round(ratingVariation * 10) / 10;
    
    // These are NEVER modified - they come from real APIs:
    // - targetActiveCourses (from CourseService API)
    // - targetRevenue (from WalletService API)
    console.log('🎲 Generated random streak:', streakVariation, 'rating:', ratingVariation);
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

  // Animate balance counter (using real wallet data)
  private animateRevenue(): void {
    console.log('💫 Starting balance animation from 0 to:', this.targetRevenue);
    
    // Ensure we have a valid target value
    const target = Math.max(this.targetRevenue || 0, 0);
    
    this.animateNumber(
      0, 
      target, 
      2200, 
      (value) => {
        this.totalRevenueCount = Math.floor(value * 100) / 100; // Keep 2 decimal places during animation
      }
    );
  }

  private animateRating(): void {
    this.animateNumber(
      0, 
      this.targetRating, 
      1500, 
      (value) => this.averageRatingCount = Math.round(value * 10) / 10
    );
  }

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

  // Format balance with currency symbol - enhanced version
  formatBalance(balance: number): string {
    if (!balance && balance !== 0) {
      return '0.00';
    }
    
    // Handle very small numbers
    if (balance < 0.01 && balance > 0) {
      return '0.01';
    }
    
    return balance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Check if wallet has sufficient balance
  hasBalance(): boolean {
    return this.wallet?.balance ? this.wallet.balance > 0 : false;
  }

  // Get specific course counts by progress status
  getInProgressCoursesCount(): void {
    console.log('📚 Getting in-progress courses count...');
    this.courseService.getCourse(1, 1000, 2, 1, CourseProgressStatus.IN_PROGRESS).subscribe({
      next: (res) => {
        const inProgressCount = res.totalCount || 0;
        console.log('📖 In-progress courses:', inProgressCount);
      },
      error: (error) => {
        console.error('❌ Error getting in-progress courses:', error);
      }
    });
  }

  // Get completed courses count
  getCompletedCoursesCount(): void {
    console.log('📚 Getting completed courses count...');
    this.courseService.getCourse(1, 1000, 2, 1, CourseProgressStatus.COMPLETED).subscribe({
      next: (res) => {
        const completedCount = res.totalCount || 0;
        console.log('✅ Completed courses:', completedCount);
      },
      error: (error) => {
        console.error('❌ Error getting completed courses:', error);
      }
    });
  }

  // Check if student has enrolled courses
  hasEnrolledCourses(): boolean {
    return this.activeCoursesCount > 0;
  }

  // Debug method to show data sources
  logDataSources(): void {
    console.log('📊 DATA SOURCES:');
    console.log('🎲 Random: Streak (' + this.streakCount + '), Rating (' + this.averageRatingCount + ')');
    console.log('🌐 Real API: Active Courses (' + this.activeCoursesCount + '), Wallet Balance ($' + this.totalRevenueCount + ')');
  }

  // Generate random fluctuation for more dynamic effect
  generateRandomBonus(): number {
    return Math.floor(Math.random() * 100);
  }

  // Refresh animations with REAL data only
  refreshAnimations(): void {
    console.log('🔄 Refreshing with REAL data only...');
    
    // Reset all counters
    this.streakCount = 0;
    this.activeCoursesCount = 0;
    this.totalRevenueCount = 0;
    this.averageRatingCount = 0;
    
    // Generate new random numbers ONLY for streak and rating
    this.generateRandomNumbers();
    
    // Reload REAL data from APIs
    this.loadWalletBalance();
    this.loadEnrolledCoursesCount();
    
    // Restart animations for non-API data (streak and rating only)
    setTimeout(() => this.animateStreak(), 100);
    setTimeout(() => this.animateRating(), 400);
    
    // Note: Balance and courses animations will start when their respective APIs return real data
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
