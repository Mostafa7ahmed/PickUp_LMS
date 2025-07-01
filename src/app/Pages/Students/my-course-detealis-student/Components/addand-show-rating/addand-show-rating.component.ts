import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Rating } from '../../../discover-course-details/Core/Interface/ires-course-details-discover';
import { environment } from '../../../../../Environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsRatngService, IRatingSubmission, IRatingUpdate } from '../../../../rating/Core/service/reviews-ratng.service';
import { LoginService } from '../../../../../Core/Services/login.service';
import { Decode } from '../../../../../Core/Interface/user';

interface ApiRating {
  id: number;
  value: number;
  note: string;
  creator: {
    id: number;
    name: string;
    photo: string;
  };
}

@Component({
  selector: 'app-addand-show-rating',
  standalone: true,
  imports: [CommonModule , FormsModule , ReactiveFormsModule],
  templateUrl: './addand-show-rating.component.html',
  styleUrl: './addand-show-rating.component.scss'
})
export class AddandShowRatingComponent implements OnChanges {

  @Input() ratings: ApiRating[] = [];
  @Input() courseId: number = 0;
  @Output() ratingSubmitted = new EventEmitter<void>();
  
  reviewsByDates: Rating[] = [];
  baseUrl: string = environment.baseUrlFiles;
  
  isSubmitting: boolean = false;
  submitMessage: string = '';
  currentUser: Decode | null = null;
  
  // User's existing rating data
  userExistingRating: ApiRating | null = null;
  isEditingMode: boolean = false;

  constructor(
    private ratingsService: ReviewsRatngService,
    private loginService: LoginService
  ) {
    // Get current user data
    this.currentUser = this.loginService.saveUserAuth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ratings']) {
      this.mapApiDataToReviews();
      this.checkUserRatingStatus();
    }
  }

  private mapApiDataToReviews(): void {
    if (this.ratings && this.ratings.length > 0) {
      // Map API data to component format
      this.reviewsByDates = this.ratings.map(rating => {
        console.log('Rating creator photo:', rating.creator.photo);
        console.log('Base URL:', this.baseUrl);
        console.log('Full photo URL:', this.baseUrl + rating.creator.photo);
        return {
          id: rating.id,
          value: rating.value,
          note: rating.note,
          createdOn: new Date().toISOString(), // Since API doesn't provide createdOn, use current date
          student: {
            id: rating.creator.id,
            userId: rating.creator.id,
            name: rating.creator.name,
            bio: null,
            photo: rating.creator.photo,
            rating: 0
          }
        };
      });
    } else {
      // No API data - show empty state
      this.reviewsByDates = [];
    }
  }

  private checkUserRatingStatus(): void {
    if (!this.currentUser || !this.ratings) {
      this.hasRated = false;
      this.userExistingRating = null;
      this.isEditingMode = false;
      return;
    }

    // Check if current user's ID exists in the ratings
    const currentUserId = parseInt(this.currentUser.UserId);
    const userRating = this.ratings.find(rating => rating.creator.id === currentUserId);
    
    if (userRating) {
      this.hasRated = true;
      this.userExistingRating = userRating;
      this.isEditingMode = false;
      
      // Don't show auto message, let user decide to edit
      this.submitMessage = '';
      console.log('User has already rated this course:', userRating);
    } else {
      this.hasRated = false;
      this.userExistingRating = null;
      this.isEditingMode = false;
      this.submitMessage = '';
      console.log('User has not rated this course yet');
    }
  }

  getStarsArray(stars: number): number[] {
    return Array(Math.floor(stars)).fill(0);
  }

  newRating: number = 0;
  newNote: string = '';

  setRating(rating: number) {
    if (!this.isSubmitting) {
      this.newRating = rating;
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/Images/user.jpg';
  }

  startEditingRating(): void {
    if (this.userExistingRating) {
      this.isEditingMode = true;
      this.newRating = this.userExistingRating.value;
      this.newNote = this.userExistingRating.note;
      this.submitMessage = '';
    }
  }

  cancelEditingRating(): void {
    this.isEditingMode = false;
    this.newRating = 0;
    this.newNote = '';
    this.submitMessage = '';
  }

  submitRating() {
    if (!this.newRating || !this.newNote || (!this.courseId && !this.userExistingRating)) {
      console.error('Missing required fields for rating submission');
      return;
    }
    
    if (this.isSubmitting) {
      console.log('Submission already in progress');
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    if (this.isEditingMode && this.userExistingRating) {
      // Update existing rating
      const updateData: IRatingUpdate = {
        id: this.userExistingRating.id,
        value: this.newRating,
        note: this.newNote
      };

      this.ratingsService.updateCourseRating(updateData).subscribe({
        next: (response) => {
          if (response.success) {
            this.submitMessage = 'Rating updated successfully! Thank you for your feedback.';
            this.isEditingMode = false;
            this.newRating = 0;
            this.newNote = '';
            
            // Notify parent to refresh course details
            this.ratingSubmitted.emit();
          } else {
            this.submitMessage = 'Failed to update rating. Please try again.';
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error updating rating:', error);
          this.submitMessage = 'Error updating rating. Please try again.';
          this.isSubmitting = false;
        }
      });
    } else {
      // Create new rating
      const ratingData: IRatingSubmission = {
        courseId: this.courseId,
        value: this.newRating,
        note: this.newNote
      };

      this.ratingsService.submitCourseRating(ratingData).subscribe({
        next: (response) => {
          if (response.success) {
            this.submitMessage = 'Rating submitted successfully! Thank you for your feedback.';
            this.hasRated = true;
            this.newRating = 0;
            this.newNote = '';
            
            // Notify parent to refresh course details
            this.ratingSubmitted.emit();
          } else {
            this.submitMessage = 'Failed to submit rating. Please try again.';
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error submitting rating:', error);
          this.submitMessage = 'Error submitting rating. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }

  hasRated: boolean = false;
}
