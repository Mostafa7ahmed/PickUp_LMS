import { ReviewsRatngService } from './Core/service/reviews-ratng.service';
import { Component } from '@angular/core';
import { ReviewsByDate } from './Core/interface/irating';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [DatePipe , CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  reviewsByDates: ReviewsByDate[] = [];

  constructor(private reviewsService: ReviewsRatngService) {}

  ngOnInit(): void {
    this.reviewsByDates = this.reviewsService.getReviewsByDate();
  }
  getStarsArray(stars: number): number[] {
    return Array(Math.floor(stars)).fill(0);
  }
}
