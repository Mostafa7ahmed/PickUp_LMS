import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReviewsByDate } from '../../../rating/Core/interface/irating';
import { Rating } from '../Core/Interface/ires-course-details-discover';

@Component({
  selector: 'app-reating-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reating-cards.component.html',
  styleUrl: './reating-cards.component.scss'
})
export class ReatingCardsComponent {
   @Input()  reviewsByDates: Rating[] = [];

  getStarsArray(stars: number): number[] {
    return Array(Math.floor(stars)).fill(0);
  }
}
