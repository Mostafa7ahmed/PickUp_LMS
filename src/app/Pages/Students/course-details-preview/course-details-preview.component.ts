import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CourseDetailsService, CourseDetailsApi } from './course-details.service';

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
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './course-details-preview.component.html',
  styleUrls: ['./course-details-preview.component.scss']
})
export class CourseDetailsPreviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private detailsService = inject(CourseDetailsService);

  courseId: number = 0;
  course: CoursePreview | null = null;
  apiData: CourseDetailsApi | null = null;
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
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    const idFromQuery = this.route.snapshot.queryParamMap.get('courseId');
    this.courseId = +(idFromRoute ?? idFromQuery ?? 0);

    if (this.courseId) {
      this.loadCourseDetails();
    } else {
      // Invalid route: redirect to Discover Courses
      this.router.navigate(['/Student/DiscoverCourses']);
    }
  }

  loadCourseDetails(): void {
    this.detailsService.getCourseDetails(this.courseId).subscribe({
      next: (api) => {
        this.apiData = api;
        this.course = this.transformApi(api);
        if (this.course?.introVideoUrl) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.introVideoUrl);
        }
      },
      error: (err) => {
        console.error('Failed to load course details', err);
        this.isLoading = false;
        alert('تعذر تحميل تفاصيل الكورس. الرجاء المحاولة مرة أخرى لاحقًا.');
      },
      complete: () => (this.isLoading = false),
    });
  }

  private transformApi(api: CourseDetailsApi): CoursePreview {
    return {
      id: api.id,
      title: api.description?.slice(0, 60) ?? 'Course',
      description: api.description,
      imageUrl: api.photo,
      introVideoUrl: api.introductionVideo,
      price: 0,
      rating: api.rating,
      totalRatings: api.ratings?.length ?? 0,
      totalStudents: api.enrolledCount,
      duration: '0h',
      level: 'Beginner',
      language: 'Arabic',
      lastUpdated: new Date(api.updatedOn),
      totalLessons: 0,
      certificate: false,
      isFree: true,
      isEnrolled: false,
      tags: [],
      whatYouWillLearn: [],
      requirements: [],
      instructor: {
        id: api.instructor.id,
        name: api.instructor.name,
        bio: api.instructor.bio,
        avatar: api.instructor.photo,
        rating: api.instructor.rating,
        totalStudents: api.enrolledCount,
        experience: ''
      },
      reviews: api.ratings.map(r=>({
        id: r.id,
        studentName: r.student.name,
        studentAvatar: r.student.photo,
        rating: r.value,
        comment: r.note,
        date: new Date(r.createdOn)
      }))
    } as CoursePreview;
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

  openEnrollPopup(): void {
    if (!this.course) return;
    this.router.navigate([{ outlets: { dialog: ['enroll-popup', this.course.id] } }], { relativeTo: this.route });
  }
} 