import { ReviewsRatngService } from './Core/service/reviews-ratng.service';
import { Component, Input } from '@angular/core';
import { ReviewsByDate } from './Core/interface/irating';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IPaginationResponse } from '../../Core/Shared/Interface/irespose';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [DatePipe , CommonModule , TranslateModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  reviewsByDates: IPaginationResponse<ReviewsByDate> = {} as  IPaginationResponse<ReviewsByDate>;
  @Input() courseId: number = 0;

  constructor(private reviewsService: ReviewsRatngService) {}

  ngOnInit(): void {
    this.reviewsService.courseRating(this.courseId).subscribe((res) => {
      this.reviewsByDates = res;

    });
  }
  getStarsArray(stars: number): number[] {
    return Array(Math.floor(stars)).fill(0);
  }
}
