import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Interfaces
interface CourseInstructor {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  rating: number;
  totalStudents: number;
  experience: string;
}

interface CourseReview {
  id: number;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: Date;
}

interface CoursePreview {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  introVideoUrl?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  totalRatings: number;
  totalStudents: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  lastUpdated: Date;
  tags: string[];
  whatYouWillLearn: string[];
  requirements: string[];
  instructor: CourseInstructor;
  reviews: CourseReview[];
  isEnrolled: boolean;
  isFree: boolean;
  totalLessons: number;
  certificate: boolean;
}

@Component({
  selector: 'app-course-details-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-details-preview.component.html',
  styleUrls: ['./course-details-preview.component.scss']
})
export class CourseDetailsPreviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  courseId: number = 0;
  course: CoursePreview | null = null;
  isLoading = true;
  showVideo = false;
  safeVideoUrl: SafeResourceUrl | null = null;
  
  // Tab management
  activeTab = 'overview';
  
  // Review management
  showAllReviews = false;
  newReview = {
    rating: 5,
    comment: ''
  };

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    if (this.courseId) {
      this.loadCourseDetails();
    }
  }

  loadCourseDetails(): void {
    // Simulate API call - replace with real service
    setTimeout(() => {
      this.course = this.getMockCourseData();
      this.isLoading = false;
      
      if (this.course?.introVideoUrl) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.introVideoUrl);
      }
    }, 1000);
  }

  getMockCourseData(): CoursePreview {
    return {
      id: this.courseId,
      title: 'Complete Web Development Bootcamp',
      description: 'Master modern web development with this comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and more. Build real projects and launch your career as a web developer.',
      imageUrl: '/assets/Images/Course/Image+Background.png',
      introVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      price: 199,
      originalPrice: 299,
      discount: 33,
      rating: 4.7,
      totalRatings: 2856,
      totalStudents: 12450,
      duration: '42 hours',
      level: 'Beginner',
      language: 'Arabic',
      lastUpdated: new Date('2024-03-01'),
      totalLessons: 156,
      certificate: true,
      isFree: false,
      isEnrolled: false,
      tags: ['Web Development', 'JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
      whatYouWillLearn: [
        'Build responsive websites from scratch',
        'Master JavaScript ES6+ features',
        'Create dynamic web applications with React',
        'Develop backend APIs with Node.js and Express',
        'Work with databases (MongoDB, SQL)',
        'Deploy applications to production',
        'Implement authentication and security',
        'Use modern development tools and workflows'
      ],
      requirements: [
        'Basic computer skills',
        'No prior programming experience needed',
        'Access to a computer with internet connection',
        'Willingness to learn and practice'
      ],
      instructor: {
        id: 1,
        name: 'أحمد محمد',
        bio: 'Senior Full Stack Developer with 8+ years of experience. Former software engineer at Google and Microsoft.',
        avatar: '/assets/Images/CardProfile.png',
        rating: 4.8,
        totalStudents: 25680,
        experience: '8+ years'
      },
      reviews: [
        {
          id: 1,
          studentName: 'سارة أحمد',
          studentAvatar: '/assets/Images/CardProfile.png',
          rating: 5,
          comment: 'كورس ممتاز جداً! شرح واضح ومفصل. استفدت كثيراً من المشاريع العملية.',
          date: new Date('2024-02-15')
        },
        {
          id: 2,
          studentName: 'محمد علي',
          studentAvatar: '/assets/Images/CardProfile.png',
          rating: 4,
          comment: 'المحتوى رائع والمدرب محترف. أنصح به بشدة للمبتدئين.',
          date: new Date('2024-02-10')
        },
        {
          id: 3,
          studentName: 'فاطمة حسن',
          studentAvatar: '/assets/Images/CardProfile.png',
          rating: 5,
          comment: 'أفضل كورس تعلمته في البرمجة. المشاريع العملية مفيدة جداً.',
          date: new Date('2024-02-05')
        }
      ]
    };
  }

  // Methods
  toggleVideo(): void {
    this.showVideo = !this.showVideo;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  enrollInCourse(): void {
    if (this.course) {
      // Navigate to enrollment/payment page
      this.router.navigate(['/Student/course', this.course.id, 'enroll']);
    }
  }

  goToCourse(): void {
    if (this.course) {
      this.router.navigate(['/Student/course', this.course.id]);
    }
  }

  getStars(rating: number): number[] {
    return Array.from({length: 5}, (_, i) => i + 1);
  }

  getDiscountedPrice(): number {
    if (this.course?.originalPrice && this.course.discount) {
      return this.course.originalPrice * (1 - this.course.discount / 100);
    }
    return this.course?.price || 0;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(price);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getVisibleReviews(): CourseReview[] {
    if (!this.course?.reviews) return [];
    return this.showAllReviews ? this.course.reviews : this.course.reviews.slice(0, 3);
  }

  toggleReviews(): void {
    this.showAllReviews = !this.showAllReviews;
  }

  goBack(): void {
    this.router.navigate(['/Student/discover-courses']);
  }

  shareCourse(): void {
    if (navigator.share) {
      navigator.share({
        title: this.course?.title,
        text: this.course?.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الكورس');
    }
  }

  addToWishlist(): void {
    // Implement wishlist functionality
    alert('تم إضافة الكورس للمفضلة');
  }

  reportCourse(): void {
    // Implement report functionality
    alert('تم إرسال البلاغ');
  }

  submitReview(): void {
    if (this.newReview.comment.trim()) {
      // Implement review submission
      alert('تم إرسال التقييم بنجاح');
      this.newReview = { rating: 5, comment: '' };
    }
  }
} 